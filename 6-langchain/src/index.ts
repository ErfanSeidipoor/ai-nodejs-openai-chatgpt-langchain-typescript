import { ChatOpenAI, OpenAI } from "@langchain/openai";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-3.5-turbo",
  temperature: 0.8,
  maxTokens: 700,
  verbose: true,
});

async function main() {
  /* -------------------------------- option 1 -------------------------------- */
  const response = await model.invoke("Hello, how are you?");
  console.log({ response1: response });
  /* -------------------------------- option 2 -------------------------------- */
  // const batch = ["Hello, how are you?", "Give me 4 books to read"];
  // const responses = await model.batch(batch);
  // console.log({ responses });
  // for (let index = 0; index < responses.length; index++) {
  //   console.log("question:\n", batch[index]);
  //   console.log("response:\n", responses[index].content);
  // }
  /* -------------------------------- option 3 -------------------------------- */
  // const response = await model.stream("Hello, how are you?");
  // console.log("Response:", { response });
  // for await (const chunk of response) {
  //   console.log(chunk.content);
  // }
}

main();
