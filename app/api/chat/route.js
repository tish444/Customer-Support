import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `
Hello! I’m the customer support AI for HeadStarter. I’m here to assist you with enhancing your technical interview skills, developing impactful projects, and gaining valuable exposure.

Guidelines for Our Interaction:

Technical Interview Skills: Ask for tips and best practices for preparing for technical interviews, including common coding problems and strategies for problem-solving.
Project Development: Request advice on how to create standout projects, including guidance on choosing project topics, structuring your work, and showcasing your projects effectively.
Exposure: Inquire about strategies for gaining visibility in the tech industry, such as networking tips, portfolio building, and leveraging social media.
Feel free to ask me anything related to these areas, and I’ll provide the support and resources you need to excel. Let’s work together to help you achieve your career goals!`

export async function POST(req) {
    const apiKey = process.env.OPENAI_API_KEY;

    const openai = new OpenAI({ apiKey });
    const data = await req.json();
    console.log(data)
    // const completion = await openai.chat.completions.create({
    //     messages: [
    //         { role: "system", content: systemPrompt},
    //         { role: "user", content: "Who won the world series in 2020?" },
    //         { role: "assistant", content: "The Los Angeles Dodgers won the World Series in 2020." },
    //         { role: "user", content: "Where was it played?" }
    //     ],
    //     model: "gpt-3.5-turbo", // Changed the model to gpt-3.5-turbo
    // });

    // console.log(completion.choices[0].message.content);
    return NextResponse.json({ message: 'Hello from the server!' });
}
