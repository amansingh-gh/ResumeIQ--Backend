const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        originalFileName: {
            type: String,
            required: true,
        },

        filePath: {
            type: String,
            required: true,
        },

        fileSize: Number,

        mimeType: String,

        cloudinaryUrl: {
            type: String,
            required: true,
        },

        cloudinaryPublicId: {
            type: String,
            required: true,
        },

        extractedText: {
            type: String,
            default: "",
        },
        analysis: {
            atsScore: Number,

            summary: String,

            keywordMatch: {
                hardSkills: Number,
                softSkills: Number,
            },

            strengths: [String],

            improvements: [String],

            missingKeywords: [String],

            sectionScores: {
                summary: Number,
                skills: Number,
                experience: Number,
                education: Number,
                projects: Number,
            },

            recruiterFeedback: String,

            suggestedJobRoles: [String],

            actionVerbsUsed: [String],

            weakActionVerbs: [String],
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Resume", resumeSchema);
