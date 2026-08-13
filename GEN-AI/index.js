import "dotenv/config";
import Groq from "groq-sdk";
import { tavily } from "@tavily/core";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

async function firstGroqCall(model, temperature, systemMessage, userMessage) {
  return groq.chat.completions.create({
    model: model,
    temperature: temperature,
    tools: [
      // array because I can define multiple tools
      {
        type: "function", // type of tool, can be "function" or "api"
        function: {
          name: "tavilyWebSearch",
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

async function tavilyWebSearch(params) {
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
  const firstGroqResponse = await firstGroqCall(
    model,
    temperature,
    systemMessage,
    userMessage,
  );

  const responseMessage = firstGroqResponse.choices?.[0]?.message;

  while (true) {
    if (responseMessage?.tool_calls?.length) {
      for (const tool_call of responseMessage.tool_calls) {
        const functionName = tool_call.function.name;
        const functionArgs = JSON.parse(tool_call.function.arguments || "{}");

        if (functionName === "tavilyWebSearch") {
          // 2. Execute the tool
          const tavilyWebSearchResult = await tavilyWebSearch(functionArgs);

          responseMessage.push({
            role: "tool",
            tool_call_id: tool_call.id,
            content: JSON.stringify(tavilyWebSearchResult),
          });
        }
      }

      responseMessage = await groq.chat.completions.create({
        model: model,
        temperature: temperature,

        messages: [
          // Original conversation
          systemMessage,
          userMessage,

          // LLM's previous tool call
          responseMessage,
        ],
      });
    } else {
      console.log("Final Response:", responseMessage?.content || "(empty)");
      break;
    }
  }
}

main();
