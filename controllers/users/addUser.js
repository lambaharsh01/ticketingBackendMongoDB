const users=require('../../utils/DBschemas/users');
const joi=require('joi');
const { otpMailOptions, mailTransport} =require('../../utils/mailer');

exports.userEmailVerification= async(req, res)=>{
  try{

    const emailValidationSchema = joi.object({
      userEmail: joi.string().email().required().trim(),
      userName: joi.string().required().trim()
    });

    const {error, value} = emailValidationSchema.validate(req.body);

    if(error)
      return res.status(400).json({success:false, code:400, message:error.details[0].message});

    let otp=Math.floor(1000 + Math.random() * 9000);

    let local_mail_option={...otpMailOptions};
    local_mail_option.to=value.userEmail;
    local_mail_option.text=`${otp} is your SignUp OTP`;
    
        let baseJsonData={...value, otp: otp};
        
        await new Promise((resolve, reject)=>{
            mailTransport.sendMail(local_mail_option, (error, info)=>{
                if(error) reject(error);
                resolve(info);
        }); });
    
        let exisitngUser=await users.findOne({userEmail:value.userEmail});

        baseJsonData.timeStamp=new Date().getTime();

        if(exisitngUser){
          delete baseJsonData.userEmail;
          await users.updateOne({userEmail:value.userEmail}, baseJsonData);
        }else{
          await users.create(baseJsonData);
        }

        return res.status(200).json({code:200, message:'OTP has been Successfully Sent'});

  }catch(err){
    console.log(err);
    return res.status(400).json({success:false, code:400, message:'Err: '+err});
  }
}


exports.varifyEmail= async(req,res)=>{
  try{

    let {otp, userEmail}=req.body;
    let matchingOtp=await users.findOne({otp, userEmail});

    if(matchingOtp){

      if(Math.floor(((new Date().getTime()-matchingOtp.timeStamp)/ 1000)/60)>2)
        throw new Error('OTP Time Limit Reached');

      await users.updateOne({userEmail: userEmail}, {otpVarificationStatus:true});
      return res.status(200).json({success:true, code:200, message:'OTP Matched'});
    }else{
      throw new Error('OTP Did Not Matched');
    }

  }catch(err){
    console.log(err);
    return res.status(400).json({success:false, code:400, message:'Err: '+err});
  }
}


exports.addUserDetails= async(req,res)=>{
  try{

    let userEmail=req.params.userEmail;

    let userInfoSchema=joi.object({
      gender:joi.alternatives().try(
            joi.string().valid('Male'),
            joi.string().valid('Female'),
            joi.string().valid('Other')
            ).required(),
      dateOfBirth: joi.number().min(10).max(60).required(),
      district:joi.string().required().trim()
    });

    const {error, value} = userInfoSchema.validate(req.body);

    if(error)
      return res.status(200).json({success:false, code:400, message:error.details[0].message});

    let backendValidation= await users.findOne({otpVarificationStatus:true, userEmail});

    if(!backendValidation)
      return res.status(200).json({success:false, code:409, message:'Can not proceed ahead previous authentication was not completed'});

    await users.updateOne({userEmail}, value);

    return res.status(200).json({success:true, code:200, message:'Process Completed'});

  }catch(err){
    console.log(err);
    return res.status(400).json({success:false, code:400, message:'Err: '+err});
  }
}