import OpenAI from "openai";
import { encoding_for_model } from "tiktoken";

const context: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
  {
    role: "system",
    content: "You are a helpful chatbot",
  },
];

const encoder = encoding_for_model("gpt-3.5-turbo");
const max_TOKENS = 200;
process.stdin.addListener("data", async (input) => {
  const command = input.toString();

  const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
  });

  context.push({
    role: "user",
    content: command,
  });

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 200,
    messages: context,
  });

  if (response.usage && response.usage.total_tokens > max_TOKENS) {
    deleteOlderMessages();
  }

  const { message } = response.choices[0];

  context.push(message);
  console.log(JSON.stringify(context, undefined, 2));
});

function deleteOlderMessages() {
  let contextLength = getContextLength();
  while (contextLength > max_TOKENS) {
    for (let index = 0; index < context.length; index++) {
      const message = context[index];
      if (message.role !== "system") {
        context.splice(index, 1);
        contextLength = getContextLength();
        console.log("new context length:", contextLength);
        break;
      }
    }
  }
}

function getContextLength() {
  let length = 0;
  context.forEach((message) => {
    if (typeof message.content === "string") {
      length += encoder.encode(message.content).length;
    } else if (Array.isArray(message.content)) {
      message.content.forEach((content) => {
        if (content.type === "text") {
          length += encoder.encode(content.text).length;
        }
      });
    }
  });
  return length;
}
