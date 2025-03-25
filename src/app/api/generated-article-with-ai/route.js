import { NextResponse } from "next/server";

const { GoogleGenerativeAI } = require("@google/generative-ai");

export async function POST(request) {
  const Gemini_Api_Key = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const { prompt } = await request.json();

  const genAI = new GoogleGenerativeAI(Gemini_Api_Key);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  if (!Gemini_Api_Key) {
    return NextResponse.json({
      message: "error",
      error: "API key not found",
    });
  }

  if (!model) {
    return NextResponse.json({
      message: "error",
      error: "Model not found",
    });
  }

  if (!prompt) {
    return NextResponse.json({
      message: "error",
      error: "Prompt not found",
    });
  }

  if (!genAI) {
    return NextResponse.json({
      message: "error",
      error: "GenAI not found",
    });
  }

  const result = await model.generateContent(prompt);

  const context = result.response.candidates[0].content.parts[0].text;

  return NextResponse.json({
    message: "success",
    context: context,
  });
}
