const asyncHandler = require("express-async-handler");
const Resume = require("../model/resume.model");
const { chatWithResume } = require("../service/ai.service");
const userSessions = require("../utils/sessionStore");

const MAX_HISTORY = 20;

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

    // Unique session key
    const sessionKey = `${req.user.id}_${resumeId}`;

    // Agar session exist nahi karta to create karo
    if (!userSessions.has(sessionKey)) {

        userSessions.set(sessionKey, {
            resumeText: resume.extractedText,
            history: [],
            lastActive: Date.now()
        });

    }

    const session = userSessions.get(sessionKey);

    const answer = await chatWithResume({
        resumeText: session.resumeText,
        question,
        history: session.history
    });

    session.history.push({
        role: "user",
        content: question
    });

    session.history.push({
        role: "assistant",
        content: answer
    });

    session.lastActive = Date.now();

    while (session.history.length > MAX_HISTORY) {
        session.history.shift();
    }

    res.status(200).json({
        success: true,
        answer,
    });

});

module.exports = chatResume;