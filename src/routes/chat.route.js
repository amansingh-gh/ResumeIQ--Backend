const express = require("express")
const validateToken = require("../middleware/validateToken");
const chatResume = require("../controller/chat.controller");
const router = express.Router();

router.post('/:resumeId', validateToken, chatResume)

module.exports = router;