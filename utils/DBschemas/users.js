const mongoose=require('mongoose');

const userOptions=new mongoose.Schema({
userEmail:{type:String, required:true},
userName:{type:String, required:true},
gender:{type:String},
dateOfBirth:{type: String},
district:{type:String},
otp:{type:Number},
timeStamp:{type: Number}, // otpTimeStamp
otpVarificationStatus:{type:Boolean, default:false},
clearence:{type:Boolean, default:false},
validUntil:{type:String},// date in yyyy:mm:dd hh:mm:ss
ticketUploadInterval:{type:Number}
});

const userInfo=new mongoose.model('users',userOptions);;
module.exports=userInfo;
