const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

async function summarizeText(text) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      model: process.env.SUMMARY_MODEL || "llama-3.1-8b-instant",
      messages: [
        {
          role: "user",
          content: `
You will ALWAYS output EXACTLY 3 bullet points.
RULES:
- No apologies.
- No saying "I cannot access" or "the link does not work".
- No filler like "unfortunately".
- If text is incomplete, use what is available and produce 3 bullets.
- Bullets must start with "•"

Summarize this:
${text}
          `
        }
      ],
      max_tokens: 90,
      temperature: 0.2
    });

    return chatCompletion.choices[0].message.content.trim();

  } catch (err) {
    console.error("Groq Summary Error:", err.message);

    // NEVER allow AI errors to show on screen
    return `• Summary unavailable\n• Try again later\n• Source might be temporarily down`;
  }
}

module.exports = { summarizeText };
