import type { Request, Response } from 'express';
import { z } from 'zod';

const GuideBody = z.object({
  cityId: z.string().optional(),
  interests: z.array(z.string()).default([])
})

export async function aiGuideHandler(req: Request, res: Response) {
  const parse = GuideBody.safeParse(req.body)
  if (!parse.success) return res.status(400).json({ error: 'Invalid body' })
  const { cityId, interests } = parse.data

  // Placeholder AI response: deterministic recommendations
  const suggestions = [
    cityId === 'marrakech' ? {
      title: 'Medina walking tour',
      description: 'Explore souks, palaces, and Jemaa el-Fnaa with a local guide.'
    } : undefined,
    cityId === 'agadir' ? {
      title: 'Solar innovation visit',
      description: 'Discover regional solar projects and eco initiatives.'
    } : undefined,
  ].filter(Boolean)

  const ecoTips = interests.includes('eco')
    ? ['Bring a reusable bottle', 'Prefer trains between cities']
    : []

  res.json({ suggestions, ecoTips })
}
