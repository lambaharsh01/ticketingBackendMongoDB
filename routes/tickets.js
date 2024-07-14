const express = require("express");
const router = express.Router();

const ticketController = require("../controllers/addTicket");

router.post(
  "/insertTicketTransactions",
  ticketController.insertTicketTransactions
);

module.exports = router;
