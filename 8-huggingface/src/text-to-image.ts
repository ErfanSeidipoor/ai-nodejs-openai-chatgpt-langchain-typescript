import { HfInference } from "@huggingface/inference"
import {writeFile} from "fs"

const inference = new HfInference(
  process.env.HF_TOKEN,
)

async function image() {
  const result = await inference.textToImage({
    inputs: "typescript and js developer",
    model: "black-forest-labs/FLUX.1-dev",
    parameters: {
      // negative_prompt: "blurry"
    }
  });

  const buffer = Buffer.from(await result.arrayBuffer())
  writeFile("image.png", buffer, ()=>{
    console.log("image saved")
  })
}

image()