import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import Stripe from 'stripe';
import { z } from 'zod';
import { aiGuideHandler } from './ai.js';

const app = express();
app.use(cors());
app.use(express.json());

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey, { apiVersion: '2024-06-20' }) : null;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

const CheckoutBody = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      priceId: z.string().optional(),
      price: z.number().optional(),
      quantity: z.number().min(1).default(1)
    })
  ),
  successUrl: z.string().url(),
  cancelUrl: z.string().url()
});

app.post('/api/checkout', async (req, res) => {
  if (!stripe) return res.status(400).json({ error: 'Stripe not configured' });
  const parse = CheckoutBody.safeParse(req.body);
  if (!parse.success) return res.status(400).json({ error: 'Invalid body' });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: parse.data.items.map((i) =>
      i.priceId
        ? { price: i.priceId, quantity: i.quantity }
        : {
            price_data: {
              currency: 'usd',
              product_data: { name: i.name },
              unit_amount: Math.round((i.price ?? 0) * 100)
            },
            quantity: i.quantity
          }
    ),
    success_url: parse.data.successUrl,
    cancel_url: parse.data.cancelUrl
  });

  res.json({ id: session.id, url: session.url });
});

app.post('/api/guide', aiGuideHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 5174;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
