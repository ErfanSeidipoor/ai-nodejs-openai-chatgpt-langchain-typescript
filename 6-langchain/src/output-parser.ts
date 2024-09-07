import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import {
  StringOutputParser,
  CommaSeparatedListOutputParser,
  StructuredOutputParser,
} from "@langchain/core/output_parsers";

const model = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.7,
});

async function stringParser() {
  const prompt = ChatPromptTemplate.fromTemplate(
    "write a short description from the following product: {productName}"
  );

  console.log({ prompt: JSON.stringify(prompt, undefined, 2) });

  const wholePrompt = await prompt.format({
    productName: "a new iPhone",
  });

  console.log({ wholePrompt });

  // creating a chain: connecting the model with the prompt

  const parser = new StringOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  const response = await chain.invoke({ productName: "a new iPhone" });

  console.log({ response });
}

// stringParser();

async function commaSeparatedListOutputParser1() {
  const prompt = ChatPromptTemplate.fromTemplate(
    "write a short description from the following product: {productName}"
  );

  console.log({ prompt: JSON.stringify(prompt, undefined, 2) });

  const wholePrompt = await prompt.format({
    productName: "a new iPhone",
  });

  console.log({ wholePrompt });

  // creating a chain: connecting the model with the prompt

  const parser = new CommaSeparatedListOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  const response = await chain.invoke({ productName: "a new iPhone" });

  console.log({ response });
}

// commaSeparatedListOutputParser1();

async function commaSeparatedListOutputParser2() {
  const prompt = ChatPromptTemplate.fromTemplate(
    "Provide the first 5 ingredients, separated by commas, for: {word}"
  );

  const parser = new CommaSeparatedListOutputParser();
  const chain = prompt.pipe(model).pipe(parser);

  const response = await chain.invoke({ word: "pizza" });

  console.log({ response });
}

// commaSeparatedListOutputParser2();

async function structuredOutputParser() {
  const prompt = ChatPromptTemplate.fromTemplate(`
    Extract information from the following phrase.
    Formatting instructions: {formatInstructions}
    Phrase: {phrase}
  `);

  const outputParser = StructuredOutputParser.fromNamesAndDescriptions({
    name: "Name of the person",
    likes: "What the person likes",
  });

  console.log({ outputParser: outputParser.getFormatInstructions() });

  const chain = prompt.pipe(model).pipe(outputParser);

  const response = await chain.invoke({
    formatInstructions: outputParser.getFormatInstructions(),
    phrase: "John likes to play basketball and read books.",
  });

  console.log({ response });
}

structuredOutputParser();
