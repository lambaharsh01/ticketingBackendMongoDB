const tickets=require('../../utils/DBschemas/tickets');

const { ticketInfoSchema}=require('../../utils/joiSchemas');


exports.insertTicketTransactions= async(req, res)=>{
  try{


   let {ticketArray, userEmail}=req.body;

    let noiceClearing=ticketArray.map(element=>{
    element.userEmail=userEmail;
    element.dataFeedingDate=JSON.stringify(new Date()).replaceAll('"','');

    let {value, error}=ticketInfoSchema.validate(element);

    if(error){
        return false;
    }else{
        return value;
        // return [value.userEmail, value.busNumber, value.backgroundColor, value.busRoute, value.startingStop, value.endingBusStop, value.ticketPrice, value.discount, value.discountedPrice, value.ticketCount, value.currentDate, value.dataFeedingDate];
    }
});

let noiceCleared= noiceClearing.filter(Boolean);

if(noiceCleared.length)
   await tickets.insertMany(noiceCleared);

        return res.status(200).json({code:200, message:'OTP has been Successfully Sent'});

  }catch(err){
    console.log(err);
    return res.status(400).json({success:false, code:400, message:'Err: '+err});
  }
}

