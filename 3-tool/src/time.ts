import { black, green } from 'console-log-colors';
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources";


const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

function getTimeOfDay() {
  return "5:45"
}

const tools:Array<ChatCompletionTool> = [
  {
    type: "function",
    function: {
      name: "getTimeOfDay",
      description: "Get the current time of day",
    },
  }
]

const messages: Array<ChatCompletionMessageParam> = [
  {
    role: "system",
    content: "You are a helpful assistant?",
  },
  {
    role: "user",
    content: "What time is it?",
  },
]

const  openaiChatCompletions = async ()=> {

  console.log(green.bgWhite(JSON.stringify(messages, undefined, 3)));
  
  const response = await openai.chat.completions.create({
    messages,
    model: "gpt-3.5-turbo",
    temperature: 0.4,
    n: 1,
    tools,
    tool_choice: "auto", // the engine will decide which tool to use
  });


  console.log(black.bgWhite(JSON.stringify(response.choices, undefined, 3)));
  
  return response
}

async function main() {

  let choice: ChatCompletion.Choice;
  let response:OpenAI.Chat.Completions.ChatCompletion;
  
  do {
    response = await openaiChatCompletions();
    choice = response.choices[0];

    if(choice && choice.finish_reason === "tool_calls" && choice.message.tool_calls) {
    const [toolCall] = choice.message.tool_calls
    
    if(toolCall) {
      const functionName = toolCall.function.name
      // const functionArguments = toolCall.function.arguments
      if(functionName==="getTimeOfDay") {
        const functionResponse = getTimeOfDay()

        messages.push(choice.message)
        messages.push({
          role:"tool",
          tool_call_id: toolCall.id,
          content: functionResponse
        })
      }
    }
  }  
  } while (choice.finish_reason === "tool_calls")
}

main();
