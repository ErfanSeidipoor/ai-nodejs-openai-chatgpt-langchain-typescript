import { HfInference, } from "@huggingface/inference"

const inference = new HfInference(
  process.env.HF_TOKEN,
)

async function answerQuestion() {
  const output = await inference.questionAnswering({
    inputs:{
      context: "The quick brown fox jumps over the lazy dog",
      // question: "what color is the fox?"
      // question: "Is the dog lazy?" 
      question: "What is the meaning of the life ?"
    }
  })
  console.log(output)
}

answerQuestion()