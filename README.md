# 🚀 ResumeIQ--AI – Backend

> AI-powered Resume Analyzer Backend built with Node.js, Express.js, MongoDB, and Groq LLM.

GenResume AI Backend is a scalable RESTful API that powers an intelligent resume analysis platform. It enables secure resume uploads, AI-driven ATS analysis, contextual resume chat, email verification, authentication, and cloud-based resume management.

---

## ✨ Features

- 📄 Resume Upload (PDF)
- 🤖 AI Resume Analysis using Groq (Llama 3.3)
- 💬 Resume-specific AI Chat Assistant
- 📊 ATS Score Generation
- ☁️ Cloudinary Resume Storage
- 🔐 JWT Authentication
- 📧 Email Verification (Nodemailer)
- 👤 User Authentication & Authorization
- 📂 Resume Management
- 🛡️ Protected Routes
- ⚡ RESTful API Architecture

---

## 🛠️ Tech Stack

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### AI

- Groq API
- Llama 3.3
- Prompt Engineering

### Authentication

- JWT
- bcrypt

### File Handling

- Multer
- PDF Parser
- Cloudinary

### Email

- Nodemailer

### API Testing

- Swagger (OpenAPI)
- Postman

---

## 📁 Project Structure

```text
src
│
├── config
├── controller
├── db
├── middleware
├── model
├── routes
├── service
├── uploads
├── utils
└── server.js
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/amansingh-gh/ResumeIQ--Backend.git
```

Go to the project

```bash
cd ResumeIQ--Backend
```

Install dependencies

```bash
npm install
```

Create a `.env`

```env
PORT=

MONGO_URI=

JWT_SECRET=

GROQ_API_KEY=

EMAIL_USER=
EMAIL_PASS=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Run the server

```bash
npm run dev
```

---

## 🔑 API Modules

### Authentication

- Register User
- Login User
- Verify Email
- JWT Authentication

### Resume

- Upload Resume
- Get Resume
- Resume Preview
- Cloudinary Storage

### AI

- Analyze Resume
- Generate ATS Score
- Resume Chat Assistant

---

## 🤖 AI Workflow

```text
User Uploads Resume
        │
        ▼
     Multer Upload
        │
        ▼
 Cloudinary Storage
        │
        ▼
PDF Text Extraction
        │
        ▼
 Groq Llama 3.3
        │
        ▼
 AI Analysis + ATS Score
        │
        ▼
 MongoDB
        │
        ▼
 Resume Chat Assistant
```

---

## 🔒 Security

- JWT Authentication
- Password Hashing using bcrypt
- Protected API Routes
- Environment Variables
- Secure Cloudinary Storage
- File Validation
- PDF File Size Validation

---

## 📸 Screenshots

> Add screenshots of your Swagger documentation, Resume Upload API, AI Analysis, and Chat Assistant here.

---

## 🚀 Future Improvements

- Google OAuth Login
- Resume Editor
- AI Resume Builder
- Interview Preparation Module
- Multi-language Resume Support
- Resume Version History

---

## 👨‍💻 Author

**Aman Kumar Singh**

- GitHub: https://github.com/amansingh-gh
- LinkedIn: https://www.linkedin.com/in/amansingh-gh
- Portfolio: https://your-portfolio-url.vercel.app

---

## ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.