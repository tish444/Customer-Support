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
    
    if (!apiKey) {
        return NextResponse.json({ error: "API key is not set" }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey });
    
    try {
        const data = await req.json();

        if (!data.messages || !Array.isArray(data.messages)) {
            return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
        }

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...data.messages
            ],
            model: "gpt-3.5-turbo", // Ensure this model is available in your OpenAI plan
        });

        return NextResponse.json({ message: completion.choices[0].message.content }, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Failed to get response from OpenAI" }, { status: 500 });
    }
}
