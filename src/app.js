const express = require('express')
const authRoute = require('./routes/user.routes')
const cookieParser = require('cookie-parser')
const resumeRoute = require('./routes/resume.route');
const validateToken = require('./middleware/validateToken');
const chatRoute = require('./routes/chat.route')
const cors = require('cors')

const app = express();

app.use(cors());

app.use(express.json())
app.use(cookieParser());

app.use("/api/auth", authRoute)
app.use('/api/auth/resume', resumeRoute)
app.use('/api/auth/chat', chatRoute)

module.exports = app;