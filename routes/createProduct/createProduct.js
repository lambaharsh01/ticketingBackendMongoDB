const express=require('express');
const app=express();
const router=express.Router();

const createProductController=require('../../controllers/createProduct/createProduct');

router.get('/getTest', createProductController.getMainPage)


module.exports=router;