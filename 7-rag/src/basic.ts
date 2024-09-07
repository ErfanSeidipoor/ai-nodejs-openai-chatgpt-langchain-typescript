import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { Document } from "@langchain/core/documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-3.5-turbo",
  temperature: 0.8,
  maxTokens: 700,
  verbose: true,
});

const myData = [
  "My Name is John",
  "My name is Bob",
  "My favorite food is pizza.",
  "My favorite food is pasta.",
  "I like to play soccer.",
];

const question = "what are my favorite foods?";

async function main() {
  const vectorstore = new MemoryVectorStore(
    new OpenAIEmbeddings({
      // apiKey: process.env.OPENAI_API_KEY!,
      // model: "gpt-3.5-turbo",
      // verbose: true,
    })
  );

  await vectorstore.addDocuments(
    myData.map((content) => new Document({ pageContent: content }))
  );

  const retriever = vectorstore.asRetriever({
    k: 2,
  });

  const results = await retriever.invoke(question);
  const resultItems = results.map((item) => item.pageContent);
  console.log({ results, resultItems });

  const template = ChatPromptTemplate.fromMessages([
    {
      role: "system",
      content:
        "Answer the users question based on the following context: {context}",
    },
    {
      role: "user",
      content: "{input}",
    },
  ]);

  const chain = template.pipe(model);

  const response = await chain.invoke({
    input: resultItems,
    context: question,
  });

  console.log({ content: response.content });
}

main();
