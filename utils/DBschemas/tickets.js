const mongoose=require('mongoose');

const ticketOptions=new mongoose.Schema({
userEmail:{type:String, required:true},
busNumber:{type:String, required:true},
backgroundColor:{type:String, required:true},
busRoute:{type: String, required:true},
startingStop:{type:String, required:true},
endingBusStop:{type:String, required:true},
ticketPrice:{type:Number, required:true},
discount:{type:Boolean, required:true},
discountedPrice:{type:Number, required:true},
ticketCount:{type:Number, required:true},
currentDate:{type:String, required:true},// the date ticket was generated
dataFeedingDate:{type:String, required:true}
});

const ticketInfo=new mongoose.model('tickets',ticketOptions);;
module.exports=ticketInfo;
