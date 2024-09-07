# Generative AI for Node.js: OpenAI, LangChain - TypeScript

This repository contains 9 simple projects based on the Udemy course ["Generative AI for Node.js: OpenAI, LangChain - TypeScript"](https://www.udemy.com/course/ai-nodejs-openai-chatgpt-langchain-typescript/).

Each project demonstrates specific features and functionalities using OpenAI's GPT models and LangChain in Node.js with TypeScript.

## Projects Overview

1. **Basic** - `basic/src/index.ts`
   - Simple chatbot using OpenAI's API to generate a chat completion with GPT-3.5.
   - The assistant is given a personality as a funny assistant, and the user asks it to tell a joke.

2. **Chat** - `chat/src/index.ts`
   - A chatbot that maintains context across interactions.
   - The chat continues with the user, and older messages are deleted to respect token limits.

3. **Tool - Flight, Order, Time** - `tool/src`
   - Demonstrates the use of OpenAI's function calling capabilities, such as retrieving order status or checking the time.
   - Tools: `flight.ts`, `order.ts`, and `time.ts` showcase different function integration with OpenAI.

4. **Embedding** - `embedding/src`
   - Uses OpenAI's embedding API to generate embeddings for text and compute similarities.
   - `index.ts` generates embeddings for a list of words, and `similar.ts` compares new text to find similarities.

5. **Vector DB** - `vectordb/src/index.ts`
   - Demonstrates how to store and query embeddings using a vector database (ChromaDB).
   - This example stores personal information and queries it to provide a response using OpenAI's model.

6. **LangChain** - `langchain/src`
   - Demonstrates the usage of LangChain to create pipelines for model responses.
   - Examples include simple text input/output, output parsing, and prompt templates.

7. **RAG (Retrieval-Augmented Generation)** - `rag/src`
   - Uses vector store for retrieval-augmented generation.
   - The model answers questions based on provided context.

8. **Hugging Face** - `huggingface/src`
   - Integrates Hugging Face APIs to generate images from text and perform feature extraction.
   - Demonstrates text-to-image and text-to-embedding features.

9. **Transformers** - `transformers/src`
   - Uses Hugging Face's transformers to generate text and extract features.
   - Examples include text generation and feature extraction using Hugging Face models.

## How to Use

### Prerequisites

- Node.js v14+ 
- TypeScript
- API keys for OpenAI and Hugging Face

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```bash
    cd <project-directory>
    npm install
    ```

3. Set up environment variables:

    Create a `.env` file in the root directory and add your API keys:

    ```bash
    OPENAI_API_KEY=your-openai-api-key
    HF_TOKEN=your-huggingface-api-token
    ```

### Running the Projects

Each project can be run individually. For example, to run the **basic** project:

```bash
cd <project-directory>
npm run <file-name>
