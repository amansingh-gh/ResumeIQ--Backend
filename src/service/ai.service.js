const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

const analyzeResume = async (resumeText) => {

    const prompt = `You are an expert ATS recruiter and resume reviewer.

Your task is to analyze extracted resume text and return an ATS evaluation.

IMPORTANT RULES:

1. Determine whether the provided text is actually a resume/CV.
2. A valid resume typically contains multiple sections such as:

   * Name
   * Contact information
   * Skills
   * Experience
   * Education
   * Projects
   * Certifications
   * Professional Summary
3. If the input is not a resume (for example: invoice, article, random text, certificate, image OCR noise, assignment, book, email, advertisement, or insufficient content), DO NOT attempt to analyze it.
4. In that case, return EXACTLY the JSON structure below with all numeric values set to 0, all strings empty, and all arrays empty.
5. Never hallucinate or invent information that does not exist in the resume.
6. Base every score only on the provided text.
7. ATS score must be an integer between 0 and 100.
8. Return ONLY valid JSON.
9. Do NOT return Markdown, explanations, comments, or additional text.
10. Resume Section Scores, Keyword Match give the score in the scale of 0 - 100

If the input is NOT a resume, return:

{
"atsScore": 0,
"summary": "",
"keywordMatch": {
"hardSkills": 0,
"softSkills": 0
},
"strengths": [],
"improvements": [],
"missingKeywords": [],
"sectionScores": {
"summary": 0,
"skills": 0,
"experience": 0,
"education": 0,
"projects": 0
},
"recruiterFeedback": "",
"suggestedJobRoles": [],
"actionVerbsUsed": [],
"weakActionVerbs": []
}

Otherwise, analyze the resume and return the same JSON structure populated with accurate information:

{
"atsScore": 0,
"summary": "",
"keywordMatch": {
"hardSkills": 0,
"softSkills": 0
},
"strengths": [],
"improvements": [],
"missingKeywords": [],
"sectionScores": {
"summary": 0,
"skills": 0,
"experience": 0,
"education": 0,
"projects": 0
},
"recruiterFeedback": "",
"suggestedJobRoles": [],
"actionVerbsUsed": [],
"weakActionVerbs": []
}


Resume:

${resumeText}
`;

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.3,
    });

    return response.choices[0].message.content;
};


const chatWithResume = async ({ resumeText, question, history = [] }) => {

    const systemPrompt = `
You are ResumeAI, an expert AI resume reviewer, ATS specialist, and career coach.

You have access to the user's uploaded resume.

Your responsibilities are:

1. Answer questions about the resume accurately.
2. Explain resume content when asked.
3. Suggest resume improvements.
4. Provide career guidance related to the user's resume.
5. Recommend better wording, stronger achievements, missing skills, and ATS improvements.

RESPONSE RULES

1. If the answer exists in the resume:
   - Answer using the resume information.
   - Be concise and professional.
   - Do not invent information.

2. If the answer is NOT found in the resume:
   - Clearly state that the information is not available in the resume.
   - Then provide general career advice if it helps answer the user's question.
   - Never pretend the resume contains information that it doesn't.

3. Formatting Rules:
   - NEVER use Markdown.
   - NEVER use **bold**
   - NEVER use *italics*
   - NEVER use headings with ####
   - NEVER use code blocks.
   - Never use tables.

4. When listing items:
   - Use numbered lists whenever the order matters.
   - Use bullet points (•) when order doesn't matter.
   - Leave one blank line between major sections.

5. Keep responses clean and readable.

6. For resume improvement questions:
   - Explain WHY the improvement matters.
   - Give practical examples whenever possible.

7. For ATS questions:
   - Focus on measurable achievements.
   - Missing keywords.
   - Strong action verbs.
   - Resume readability.

8. Keep the tone friendly, professional, and encouraging.
`;

    const messages = [
        {
            role: "system",
            content: systemPrompt,
        },

        {
            role: "system",
            content: `This is the user's uploaded resume. Use it as the primary source of truth.

Resume:
${resumeText}`,
        },

        ...history,

        {
            role: "user",
            content: question,
        },
    ];

    const response = await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages,
        temperature: 0.3,
    });

    return response.choices[0].message.content;
};


module.exports = { analyzeResume, chatWithResume };