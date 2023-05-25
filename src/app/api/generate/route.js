import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export function GET(req) {
  return new Response("OpenAI!");
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

if (!configuration.apiKey) {
  throw new Error("OPENAI_API_KEY no es definida");
}

const openai = new OpenAIApi(configuration);

export async function POST(req) {
  const body = await req.json();

  if (!body.prompt || body.prompt.length === 0) {
    return NextResponse.error(new Error("El prompt es requerido"), {
      status: 400,
    });
  }

  try {
    const response = await openai.createCompletion({
      prompt: `Dame un chiste de programadores teniendo en cuenta este tema: ${body.prompt}`,
      model: "text-davinci-003",
      temperature: 0.7,
      max_tokens: 60,
    });
    console.log(response.data.choices);
    return NextResponse.json(response.data.choices[0].text);
  } catch (error) {
    return NextResponse.error(error, {
      status: 500,
    });
  }
  // return NextResponse.json({ message: "hello world" });
}
