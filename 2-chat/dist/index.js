"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const tiktoken_1 = require("tiktoken");
const context = [
    {
        role: "system",
        content: "You are a helpful chatbot",
    },
];
const encoder = (0, tiktoken_1.encoding_for_model)("gpt-3.5-turbo");
const max_TOKENS = 200;
process.stdin.addListener("data", (input) => __awaiter(void 0, void 0, void 0, function* () {
    const command = input.toString();
    const openai = new openai_1.default({
        apiKey: process.env["OPENAI_API_KEY"],
    });
    context.push({
        role: "user",
        content: command,
    });
    const response = yield openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        max_tokens: 200,
        messages: context,
    });
    if (response.usage && response.usage.total_tokens > max_TOKENS) {
        deleteOlderMessages();
    }
    const { message } = response.choices[0];
    context.push(message);
    console.log(JSON.stringify(context, undefined, 2));
}));
function deleteOlderMessages() {
    let contextLength = getContextLength();
    while (contextLength > max_TOKENS) {
        for (let index = 0; index < context.length; index++) {
            const message = context[index];
            if (message.role !== "system") {
                context.splice(index, 1);
                contextLength = getContextLength();
                console.log("new context length:", contextLength);
                break;
            }
        }
    }
}
function getContextLength() {
    let length = 0;
    context.forEach((message) => {
        if (typeof message.content === "string") {
            length += encoder.encode(message.content).length;
        }
        else if (Array.isArray(message.content)) {
            message.content.forEach((content) => {
                if (content.type === "text") {
                    length += encoder.encode(content.text).length;
                }
            });
        }
    });
    return length;
}
