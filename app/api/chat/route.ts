import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    
    // 1. Safety check: Did Next.js actually find your API key?
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is missing. Next.js cannot find it.");
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    
    const prompt = `You are VIVEK, an educational AI Mentor. Answer this teacher's query concisely. Query: ${message}`;
    const result = await model.generateContent(prompt);
    
    return NextResponse.json({ response: result.response.text() });
  } catch (error: any) {
    // 2. This prints the EXACT error in your VS Code terminal
    console.error("🔥 AI ROUTE ERROR:", error.message || error);
    
    return NextResponse.json(
      { response: `AI Connection Failed: ${error.message}` }, 
      { status: 500 }
    );
  }
}