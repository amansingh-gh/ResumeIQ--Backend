const asyncHandler = require("express-async-handler");
const extractTextFromPDF = require("../service/pdfParser");
const resumeSchema = require('../model/resume.model');
const { analyzeResume } = require("../service/ai.service");
const uploadResumeToCloudinary = require("../service/cloudinary.service");

const uploadResume = asyncHandler(async (req, res) => {

    if (!req.file) {
        res.status(400);
        throw new Error("Resume file is required");
    }
    let uploadResult;
    try {
         uploadResult = await uploadResumeToCloudinary(req.file.path);
    } catch (err) {
        console.error("Cloudinary Error:", err);
        throw err;
    }


    const extractedText = await extractTextFromPDF(
        req.file.path
    );

    const resume = await resumeSchema.create({
        userId: req.user.id,
        originalFileName: req.file.originalname,
        filePath: req.file.path,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,

        cloudinaryUrl: uploadResult.secure_url,
        cloudinaryPublicId: uploadResult.public_id,

        extractedText
    });

    res.status(201).json({
        success: true,
        resumeId: resume._id,
        message: "Resume uploaded successfully",
        extractedText,
    });
});


const analyzeResumeController = asyncHandler(async (req, res) => {

    const resume = await resumeSchema.findOne({
        _id: req.params.resumeId,
        userId: req.user.id
    });

    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }

    // console.log("Resume ID:", resume._id);
    // console.log("User ID:", resume.userId);


    if (!resume) {
        res.status(404);
        throw new Error("Resume not found");
    }

    const aiResponse = await analyzeResume(
        resume.extractedText
    );


    const cleanedResponse = aiResponse
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();


    let analysis;

    try {
        analysis = JSON.parse(cleanedResponse);
    } catch (error) {
        res.status(500);
        throw new Error("AI returned invalid JSON");
    }

    resume.analysis = analysis;

    await resume.save();

    res.status(200).json({
        success: true,
        analysis
    });
});

const resumeById = asyncHandler(async (req, res) => {
    const resume = await resumeSchema.findOne({
        _id: req.params.resumeId,
        userId: req.user.id
    })

    if (!resume) {
        res.status(400)
        throw new Error("Resume not found")
    }

    res.status(200).json(resume)
})

module.exports = {
    uploadResume,
    analyzeResumeController,
    resumeById
};