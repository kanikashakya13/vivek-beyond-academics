import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    
    const prompt = `You are VIVEK, an educational AI Mentor. Answer this teacher's query concisely and focus on holistic student growth, focus, confidence, and resilience (not traditional grades). Query: ${message}`;
    
    const result = await model.generateContent(prompt);
    return NextResponse.json({ response: result.response.text() });
  } catch (error) {
    return NextResponse.json({ response: "AI Error. Please check your API key." }, { status: 500 });
  }
}