const express=require('express');
const router=express.Router();

const ticketController=require('../controllers/tickets/addTicket');

router.post('/insertTicketTransactions', ticketController.insertTicketTransactions);


module.exports=router;