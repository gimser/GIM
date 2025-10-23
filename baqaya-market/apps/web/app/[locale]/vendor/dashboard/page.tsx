"use client";
export default function VendorDashboard() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-semibold">Vendor Dashboard</h1>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-sm">Active offers</div>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm">Orders today</div>
          <div className="text-2xl font-bold">12</div>
        </div>
        <div className="rounded-lg border p-4">
          <div className="text-sm">EcoPoints awarded</div>
          <div className="text-2xl font-bold">250</div>
        </div>
      </div>
    </main>
  );
}
