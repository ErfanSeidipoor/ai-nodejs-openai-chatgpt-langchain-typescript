import { black, blue, green, yellowBright } from 'console-log-colors';
import OpenAI from "openai";
import { ChatCompletion, ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources";


const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

type getOrderStatusProps = {orderId: string}
function getOrderStatus(input: getOrderStatusProps) {
  console.log(yellowBright.bg0.bold("Getting the status of orderId: " + input.orderId))
  return "COMPLETED"
}

const tools:Array<ChatCompletionTool> = [
  {
    type: "function",
    function: {
      name: "getTimeOfDay",
      description: "Get the current time of day",
    },
  },
  {
    type: "function",
    function: {
      name: "getOrderStatus",
      description: "Return the status of an order",
      parameters: {
        type: "object",
        properties: {
          orderId: {
            type: "string",
            description: "The Id of the order to get the status of",
          },
        },
        required: ['orderId'],
      },
    },
  },
]

const messages: Array<ChatCompletionMessageParam> = [
  {
    role: "system",
    content: "You are a helpful assistant?",
  },
  {
    role: "user",
    content: "What the status of the order with Id of 123?",
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
      const functionArguments = JSON.parse(toolCall.function.arguments)
      if(functionName==="getOrderStatus") {
        const functionResponse = getOrderStatus(functionArguments as getOrderStatusProps)
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
