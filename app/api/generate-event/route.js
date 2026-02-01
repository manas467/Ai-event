import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      messages: [
        {
          role: "system",
          content: `
You are an event planning assistant.

Return ONLY valid JSON.
Do NOT use markdown.
Do NOT add explanations.
All string values must be single-line (no line breaks).

JSON format:
{
  "title": "Event title",
  "description": "2-3 sentence single paragraph description",
  "category": "MUST be exactly ONE of: tech, music, sports, art, food, business, health, education, gaming, networking, outdoor, community",
  "suggestedCapacity": 50,
  "suggestedTicketType": "free"
}
          `.trim(),
        },
        {
          role: "user",
          content: `User idea: ${prompt}`,
        },
      ],
    });

    const text = completion.choices[0].message.content.trim();

    console.log("RAW GROQ RESPONSE:", text);

    const eventData = JSON.parse(text);

    return NextResponse.json(eventData);
  } catch (error) {
    console.error("Error generating event:", error);
    return NextResponse.json(
      { error: "Failed to generate event" },
      { status: 500 }
    );
  }
}
