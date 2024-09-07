import { HfInference } from "@huggingface/inference"

const inference = new HfInference(
  process.env.HF_TOKEN,
)

async function translate() {
  const output = await inference.translation({
    inputs: "How is the weather in paris ?",
    model: "t5-base"
  })
  console.log(output)
}

// translate()



async function translate2() {
    const output = await inference.translation({
      inputs: "How is the weather in paris ?",
      model: "facebook/nllb-200-distilled-600M",
      //@ts-ignore
      parameters: {
        src_lang: "eng-Latn",
        tgt_lang: "spa-Latn"
      }
    })
    console.log(output)
}

translate2()