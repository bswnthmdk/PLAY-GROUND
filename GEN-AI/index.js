import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0,
    messages: [
      {
        role: "system",
        content:
          "Behave as a helpful assistant. Answer the user's question in a concise manner.",
      },
      {
        role: "user",
        content: "What is the date of today?",
      },
    ],
  });
}

async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  //   console.log(chatCompletion);

  console.log(chatCompletion.choices[0].message.content || "");
}
main();
