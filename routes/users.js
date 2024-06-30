const express=require('express');
const router=express.Router();

const createProductController=require('../controllers/users/addUser');

router.post('/userEmailVerification', createProductController.userEmailVerification);
router.post('/varifyEmail', createProductController.varifyEmail);
router.post('/addUserDetails/:userEmail', createProductController.addUserDetails);


module.exports=router;