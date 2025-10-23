import { notFound } from 'next/navigation';

export default async function OfferPage({ params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) return notFound();

  // Placeholder UI
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Offer #{id}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-100 aspect-video rounded" />
        <div className="space-y-2">
          <p>Description here…</p>
          <p>
            <span className="line-through mr-2">120 DH</span>
            <span className="text-green-600 font-bold">60 DH</span>
          </p>
          <button className="px-4 py-2 bg-brand text-white rounded">Buy</button>
        </div>
      </div>
    </main>
  );
}
