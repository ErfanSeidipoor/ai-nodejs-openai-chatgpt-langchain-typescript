import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Chroma } from "@langchain/community/vectorstores/chroma";

const model = new ChatOpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
  model: "gpt-3.5-turbo",
  temperature: 0.8,
  maxTokens: 700,
  verbose: true,
});

const question = "What themes does GOne with Wind explore?";

async function main() {
  // create a loader
  const loader = new PDFLoader("./books.pdf");

  const docs = await loader.load();

  // console.log({ loader, docs });

  const splitter = new RecursiveCharacterTextSplitter({
    separators: [".\n"],
  });

  const splittedDocs = await splitter.splitDocuments(docs);

  // console.log({ splittedDocs });

  const vectorstore = await Chroma.fromDocuments(
    splittedDocs,
    new OpenAIEmbeddings(),
    {
      collectionName: "books",
      url: "http://localhost:8000",
    }
  );

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
