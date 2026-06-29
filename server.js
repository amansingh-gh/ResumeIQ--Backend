require("dotenv").config();

const app = require("./src/app")
const connectDB = require('./src/db/db')
const userController = require("./src/controller/user.controller")

connectDB();

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send("Home page")
})

module.exports = app;