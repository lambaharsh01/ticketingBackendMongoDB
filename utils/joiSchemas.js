const joi=require('joi');

const changeCurrencyToNumber=(value)=>{
      const convertIntoNumber = value.replace('₹', '');
      if(isNaN(convertIntoNumber)) 
      throw new Error('value is not a number');
      return parseFloat(convertIntoNumber);
}

const changeTimeFormat=(value)=>{
  let date = new Date(value);
  let year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0');
  let day = date.getDate().toString().padStart(2, '0');
  let hours = date.getHours().toString().padStart(2, '0');
  let minutes = date.getMinutes().toString().padStart(2, '0');
  let seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; 
}

exports.ticketInfoSchema =joi.object({
      userEmail:joi.string().email().required(),
      busNumber:joi.string().min(2).max(10).required(),// min(7)
      backgroundColor:joi.string().min(2).required(),// min(4)
      busRoute:joi.string().min(2).required(),  //min(4)
      startingStop:joi.string().min(4).required(),
      endingBusStop:joi.string().min(4).required(),
      ticketPrice:joi.string().custom(changeCurrencyToNumber).required(),
      discount:joi.boolean().required(),
      discountedPrice:joi.string().custom(changeCurrencyToNumber).required(),
      ticketCount:joi.number().required(),
      currentDate:joi.string().isoDate().custom(changeTimeFormat).required(),
      dataFeedingDate:joi.string().isoDate().custom(changeTimeFormat).required()
  });


  exports.userInfoSchema=joi.object({
    gender:joi.string().required(),
    dateOfBirth: joi.string().required(),
    district:joi.string().required().trim()
  });

  exports.emailValidationSchema = joi.object({
    userEmail: joi.string().email().required().trim(),
    userName: joi.string().required().trim()
  });