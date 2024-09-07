import { pipeline } from "@xenova/transformers"


async function generateText() {
    const generator = await pipeline("text2text-generation","Xenova/LaMini-Flan-T5-783M")
    let result = await generator("give me a list of food that is suitable for my food diet", {
        max_new_tokens: 2000,
        temperature: 0.7,
        repetition_penalty: 2.0
    })


    console.log(result)
}




generateText()


