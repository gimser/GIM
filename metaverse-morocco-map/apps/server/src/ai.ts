import type { Request, Response } from 'express';
import { z } from 'zod';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GuideBody = z.object({
  cityId: z.string().optional(),
  interests: z.array(z.string()).default([]),
  message: z.string().optional()
})

function buildSystemPrompt() {
  return `You are the Metaverse Morocco Guide. Provide accurate, concise answers about Morocco's tourism, culture, and eco projects. Prefer on-site, practical tips.`
}

async function callOpenAI(prompt: string) {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) return null
  const client = new OpenAI({ apiKey })
  const completion = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: buildSystemPrompt() },
      { role: 'user', content: prompt }
    ],
    temperature: 0.4,
  })
  return completion.choices[0]?.message?.content ?? null
}

async function callGemini(prompt: string) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) return null
  const genAI = new GoogleGenerativeAI(apiKey)
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function aiGuideHandler(req: Request, res: Response) {
  const parse = GuideBody.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid body' })
  const { cityId, interests, message } = parse.data

  const intent = message || `Suggest highlights for ${cityId ?? 'Morocco'} with interests: ${interests.join(', ')}`
  const prompt = `${buildSystemPrompt()}\nUser: ${intent}`

  const aiAnswer = (await callOpenAI(prompt)) ?? (await callGemini(prompt))
  if (aiAnswer) return res.json({ answer: aiAnswer })

  // Fallback
  return res.json({ answer: 'Explore the medinas, historic sites, and eco-projects like Noor Solar in Ouarzazate.' })
}
