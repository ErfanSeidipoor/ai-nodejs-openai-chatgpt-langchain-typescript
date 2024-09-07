import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

async function main() {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a funny assistant.",
      },
      {
        role: "user",
        content: "Tell me a joke",
      },
    ],
    model: "gpt-3.5-turbo",
    temperature: 0.4,
    n: 1,
  });

  console.log(chatCompletion);
}

main();
