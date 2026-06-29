const express = require("express")
const validateToken = require("../middleware/validateToken")
const upload = require('../middleware/uploadResume');
const { uploadResume, analyzeResumeController, resumeById } = require("../controller/resume.controller");
const router = express.Router();


router.post(
    "/upload",
    validateToken,
    upload.single("resume"),
    uploadResume
);

router.post('/analyze/:resumeId', validateToken, analyzeResumeController)

router.get('/:resumeId', validateToken, resumeById)



module.exports = router;