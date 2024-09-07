import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

async function fromTemplate() {
  const prompt = ChatPromptTemplate.fromTemplate(
    "write a short description from the following product: {productName}"
  );

  console.log({ prompt: JSON.stringify(prompt, undefined, 2) });

  const wholePrompt = await prompt.format({
    productName: "a new iPhone",
  });

  console.log({ wholePrompt });

  // creating a chain: connecting the model with the prompt

  const chain = prompt.pipe(model);

  const response = await chain.invoke({ productName: "a new iPhone" });

  console.log({ responseContent: response.content });
}
// fromTemplate();

async function fromMessage() {
  const prompt = ChatPromptTemplate.fromMessages([
    {
      role: "assistant",
      content: "write a short description from the following a product",
    },
    {
      role: "human",
      content: "{productName}",
    },
  ]);

  const chain = prompt.pipe(model);
  const response = await chain.invoke({ productName: "a new iPhone" });

  console.log({ responseContent: response.content });
}

fromMessage();
