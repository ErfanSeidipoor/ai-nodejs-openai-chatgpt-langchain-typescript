import { pipeline } from "@xenova/transformers"


async function embedder() {
    const embedder = await pipeline("feature-extraction","Xenova/all-MiniLM-L6-v2")

    const result = await embedder("First local embedding", {
        pooling: "mean",
        normalize: true
    })

    console.log(result)
}




embedder()


