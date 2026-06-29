const asyncHandler = require("express-async-handler");
const Resume = require("../model/resume.model");
const { chatWithResume } = require("../service/ai.service");

const chatResume = asyncHandler(async (req, res) => {

    const { resumeId } = req.params;
    const { question } = req.body;

    if (!question || !question.trim()) {
        return res.status(400).json({
            success: false,
            message: "Question is required."
        });
    }

    const resume = await Resume.findById(resumeId);

    if (!resume) {
        return res.status(404).json({
            success: false,
            message: "Resume not found."
        });
    }

    const answer = await chatWithResume(
        resume.extractedText,
        question
    );

    res.status(200).json({
        success: true,
        answer,
    });

});

module.exports = chatResume;