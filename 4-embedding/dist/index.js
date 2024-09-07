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
const openai = new openai_1.default({
    apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const chatCompletion = yield openai.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a funny assistant.",
                },
                {
                    role: "user",
                    content: "Tell me a joke",
                },
            ],
            model: "gpt-3.5-turbo",
            temperature: 0.4,
            n: 1,
        });
        console.log(chatCompletion);
    });
}
main();
