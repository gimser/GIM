export default function AdminPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 border rounded">Users</div>
        <div className="p-4 border rounded">Vendors</div>
        <div className="p-4 border rounded">Food Saved</div>
        <div className="p-4 border rounded">Revenue</div>
      </div>
    </main>
  );
}
