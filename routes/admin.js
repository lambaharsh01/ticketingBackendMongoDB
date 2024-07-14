const express = require("express");
const router = express.Router();

const adminControlers = require("../controllers/admin");

const jwtAuth = require("../utils/jwtAwth");

router.post("/validateAuth", adminControlers.validateAuth);
router.get("/getAllPermsisions", jwtAuth, adminControlers.getAllPermsisions);
router.put("/updatePermission", jwtAuth, adminControlers.updatePermission);

module.exports = router;
