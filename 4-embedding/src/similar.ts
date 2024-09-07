import {
  DataWithEmbeddings,
  generateEmbedding,
  loadJSONData,
  saveDataToJsonFile,
} from ".";

function dotProduct(input1: number[], input2: number[]) {
  return input1.reduce((acc, curr, index) => acc + curr * input2[index], 0);
}

function cosineSimilarity(input1: number[], input2: number[]) {
  const dotProd = dotProduct(input1, input2);
  const magnitude1 = Math.sqrt(dotProduct(input1, input1));
  const magnitude2 = Math.sqrt(dotProduct(input2, input2));

  if (magnitude1 === 0 || magnitude2 === 0) {
    return 0;
  }

  return dotProd / (magnitude1 * magnitude2);
}

const main = async (input: string) => {
  const dataWithEmbeddings = loadJSONData<DataWithEmbeddings[]>(
    "dataWithEmbeddings.json"
  );

  const embedding_of_input = (await generateEmbedding(input)).data[0].embedding;

  const similarities: { input: string; similarity: number }[] = [];

  for (const item of dataWithEmbeddings) {
    const similarity = dotProduct(item.embedding, embedding_of_input);
    similarities.push({ input: item.input, similarity });
  }

  const sortedSimilarity = similarities.sort(
    (item1, item2) => item2.similarity - item1.similarity
  );

  saveDataToJsonFile(sortedSimilarity, "sortedSimilarity.json");
};

main("Cat");
