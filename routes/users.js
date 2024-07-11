const express=require('express');
const router=express.Router();

const createUserController=require('../controllers/users/addUser');

router.post('/userEmailVerification', createUserController.userEmailVerification);
router.post('/varifyEmail', createUserController.varifyEmail);
router.put('/addUserDetails/:userEmail', createUserController.addUserDetails);
router.get('/getAdminAuthenticationDate/:userEmail', createUserController.getAdminAuthenticationDate);

module.exports=router;