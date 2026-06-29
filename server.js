require("dotenv").config();

const app = require("./src/app")
const connectDB = require('./src/db/db')

connectDB();

const PORT = process.env.PORT || 5000

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Resume AI Backend is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})


module.exports = app;