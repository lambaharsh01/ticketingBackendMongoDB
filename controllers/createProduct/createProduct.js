const connection=require('../../utils/connection');

exports.getMainPage = async(req, res)=>{

  setTimeout(()=>{res.status(200).send('200');}, 8000)
    

}