import { black, blue, green, yellowBright } from "console-log-colors";
import OpenAI from "openai";
import {
  ChatCompletion,
  ChatCompletionMessageParam,
  ChatCompletionTool,
} from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

type getFlightsProps = { departure: string; destination: string };

function getFlights(input: getFlightsProps) {
  const { departure, destination } = input;

  console.log(
    yellowBright.bg0.bold(
      `Tool:getFlights >>>  Departure: ${departure} , Destination: ${destination}`
    )
  );

  if (departure === "LAX" && destination === "JFK") {
    return "There are 5 flights from LAX to JFK today with numbers: 123, 456, 789, 101, 112";
  } else {
    return (
      "There are no flights from " + departure + " to " + destination + " today"
    );
  }
}

type MakeReservationProps = { flightNumber: string };
function makeReservation(input: MakeReservationProps) {
  const { flightNumber } = input;

  console.log(
    yellowBright.bg0.bold(
      `Tool:makeReservation >>>  Flight Number: ${flightNumber}`
    )
  );

  if (["123", "456"].includes(flightNumber)) {
    return (
      "Your reservation for flight " + flightNumber + " has been confirmed"
    );
  }

  return "the Flight number of " + flightNumber + " is not available";
}

const tools: Array<ChatCompletionTool> = [
  {
    type: "function",
    function: {
      name: "getFlights",
      description:
        "Get the flights from one location (departure) to another (destination)",
      parameters: {
        type: "object",
        properties: {
          departure: {
            type: "string",
            description: "The location of the departure",
          },
          destination: {
            type: "string",
            description: "The location of the destination",
          },
        },
        required: ["departure", "destination"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "makeReservation",
      description: "Make a reservation for a flight with a given flight number",
      parameters: {
        type: "object",
        properties: {
          flightNumber: {
            type: "string",
            description: "The number of the flight to make a reservation for",
          },
        },
        required: ["flightNumber"],
      },
    },
  },
];

const messages: Array<ChatCompletionMessageParam> = [
  {
    role: "system",
    content:
      "You are a helpful flight assistant to reserve a flight for users?",
  },
];

const openaiChatCompletions = async () => {
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

  return response;
};

async function main() {
  let choice: ChatCompletion.Choice;
  let response: OpenAI.Chat.Completions.ChatCompletion;

  do {
    response = await openaiChatCompletions();
    choice = response.choices[0];
    messages.push(choice.message);

    if (
      choice &&
      choice.finish_reason === "tool_calls" &&
      choice.message.tool_calls
    ) {
      const [toolCall] = choice.message.tool_calls;

      if (toolCall) {
        const functionName = toolCall.function.name;
        const functionArguments = JSON.parse(toolCall.function.arguments);
        let functionResponse = "";
        if (functionName === "getFlights") {
          functionResponse = getFlights(functionArguments as getFlightsProps);
        } else if (functionName === "makeReservation") {
          functionResponse = makeReservation(
            functionArguments as MakeReservationProps
          );
        }

        messages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: functionResponse,
        });
      }
    }
  } while (choice.finish_reason === "tool_calls");
}

// main();

process.stdin.addListener("data", async (input) => {
  const command = input.toString().trim();

  messages.push({
    role: "user",
    content: command,
  });

  main();
});
