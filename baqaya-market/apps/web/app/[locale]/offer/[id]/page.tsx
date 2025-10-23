import { notFound } from 'next/navigation';

async function getOffer(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/offers/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export default async function OfferPage({ params }: { params: { id: string } }) {
  const data = await getOffer(params.id);
  if (!data) return notFound();
  return (
    <main className="mx-auto max-w-3xl px-4 py-6">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <div className="mt-2 text-muted-foreground">{data.description}</div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-sm">Prix original</div>
          <div className="text-lg line-through">{data.original_price} MAD</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm">Prix réduit</div>
          <div className="text-2xl font-bold text-emerald-700">{data.discounted_price} MAD</div>
        </div>
      </div>
    </main>
  );
}
