import { readFileSync, writeFileSync } from "fs";
import OpenAI from "openai";
import { join } from "path";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export function loadJSONData<T>(fileName: string): T {
  const path = join(__dirname, fileName);
  const rawData = readFileSync(path);
  return JSON.parse(rawData.toString());
}

export function saveDataToJsonFile(data: any, fileName: string) {
  const dataString = JSON.stringify(data);
  const dataBuffer = Buffer.from(dataString);
  const path = join(__dirname, fileName);
  writeFileSync(path, dataBuffer);
  console.log(`saved data to ${fileName}`);
}

export const generateEmbedding = async (input: string | string[]) => {
  const response = await openai.embeddings.create({
    input: input,
    model: "text-embedding-3-small",
  });
  return response;
};

export type DataWithEmbeddings = {
  input: string;
  embedding: number[];
};

const main = async () => {
  const data = loadJSONData<string[]>("data.json");

  const response = await generateEmbedding(data);

  const dataWithEmbeddings: DataWithEmbeddings[] = data.map((input, index) => ({
    input,
    embedding: response.data[index].embedding,
  }));

  saveDataToJsonFile(dataWithEmbeddings, "dataWithEmbeddings.json");
};

main();

// generateEmbedding(["cat", "dog"]);
