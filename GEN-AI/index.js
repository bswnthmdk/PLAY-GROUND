import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    model: "openai/gpt-oss-120b",
    temperature: 0,

    tools: [
      {
        type: "function", // type of tool, can be "function" or "api"
        function: {
          name: "webSearch",
          // more precise descriptions help the model understand the tool's purpose
          description:
            "Search the web for latest information and realtime data",
          // parameters are passed into the tool(function or api) as a query
          parameters: {
            type: "object",
            // properties are the actual query parameters that the tool accepts
            properties: {
              location: {
                type: "string",
                description: "City and state, e.g. San Francisco, CA",
              },
              unit: {
                type: "string",
                enum: ["celsius", "fahrenheit"],
              },
            },
            required: ["location"],
          },
        },
      },
    ],
    tool_choice: "auto", // "auto" -> the model will decide when to use the tool, "manual" -> the model will not use the tool unless explicitly instructed; "define" -> same as "manual" but the model will not use the tool unless explicitly instructed
    messages: [
      {
        role: "system",
        content:
          "Behave as a helpful assistant. Answer the user's question in a concise manner.",
      },
      {
        role: "user",
        content: "What is the current temperature in Kokata?",
      },
    ],
  });
}

async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  // console.log(chatCompletion);
  // console.log(chatCompletion.choices[0].message.content || "");
  const message = chatCompletion.choices?.[0]?.message;

  console.log("raw assistant message:", JSON.stringify(message, null, 2));

  if (message?.function_call) {
    console.log("LLM chose tool:", message.function_call.name);
    console.log(
      "function_call:",
      JSON.stringify(message.function_call, null, 2),
    );

    if (message.function_call.name === "webSearch") {
      const params = JSON.parse(message.function_call.arguments || "{}");
      console.log("parsed tool params:", params);
      const toolResult = webSearch({ params });
      console.log("webSearch result:", toolResult);
    }
  } else {
    console.log("assistant text:", message?.content || "(empty)");
  }
}
main();

function webSearch({ params }) {
  return "webSearch function is called";
}
