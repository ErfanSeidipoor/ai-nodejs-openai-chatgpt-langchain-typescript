import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-3.5-turbo",
  temperature: 0.8,
  maxTokens: 700,
  verbose: true,
});

const question = "what are langchain libraries?";

async function main() {
  // create a loader
  const loader = new CheerioWebBaseLoader(
    "https://js.langchain.com/v0.2/docs/introduction"
  );

  const docs = await loader.load();

  console.log({ loader, docs });

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 400,
    chunkOverlap: 20,
  });

  const splittedDocs = await splitter.splitDocuments(docs);

  console.log({ splittedDocs });

  const vectorstore = new MemoryVectorStore(new OpenAIEmbeddings());

  await vectorstore.addDocuments(splittedDocs);

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
