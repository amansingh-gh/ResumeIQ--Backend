const cloudinary = require("../config/cloudinary");

const uploadResumeToCloudinary = async (filePath) => {

    const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "raw",
        folder: "resume-ai",
    });

    return result;
};

module.exports = uploadResumeToCloudinary;