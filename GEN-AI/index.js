import "dotenv/config";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

async function getGroqChatCompletion(
  model,
  temperature,
  systemMessage,
  userMessage,
) {
  return groq.chat.completions.create({
    model: model,
    temperature: temperature,
    tools: [
      // array because I can define multiple tools
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
              query: {
                type: "string",
                description: "The search query",
              },
            },
            required: ["query"],
          },
        },
      },
    ],

    tool_choice: "auto", // "auto" -> the model will decide when to use the tool, "manual" -> the model will not use the tool unless explicitly instructed; "define" -> same as "manual" but the model will not use the tool unless explicitly instructed

    messages: [systemMessage, userMessage],
  });
}

async function webSearch(params) {
  const response = await tvly.search(params.query);
  const finalResult = response.results
    .map((result) => result.content)
    .join("\n\n");
  return finalResult;
}

async function main() {
  const model = "openai/gpt-oss-120b";
  const temperature = 0;

  const systemMessage = {
    role: "system",
    content: "Behave as a helpful assistant. Answer concisely.",
  };

  const userMessage = {
    role: "user",
    content: "What is the current weather and temperature in Kolkata?",
  };

  // 1. Get the initial response from the LLM
  const chatCompletion = await getGroqChatCompletion(
    model,
    temperature,
    systemMessage,
    userMessage,
  );

  const message = chatCompletion.choices?.[0]?.message;

  if (message?.tool_calls?.length) {
    const toolCall = message.tool_calls[0];

    const functionName = toolCall.function.name;
    const functionArgs = toolCall.function.arguments;

    if (functionName === "webSearch") {
      const params = JSON.parse(functionArgs || "{}");

      // 2. Execute the tool
      const toolResult = await webSearch(params);

      // 2. Send tool result back to LLM
      const finalResponse = await groq.chat.completions.create({
        model: model,
        temperature: temperature,

        messages: [
          // Original conversation
          systemMessage,
          userMessage,

          // LLM's previous tool call
          message,

          // Tool's response
          {
            role: "tool",
            tool_call_id: toolCall.id,
            content: JSON.stringify(toolResult),
          },
        ],
      });

      // 3. Get final simple answer
      console.log("Final answer:", finalResponse.choices[0].message.content);
    }
  } else {
    console.log("assistant text:", message?.content || "(empty)");
  }
}

main();
