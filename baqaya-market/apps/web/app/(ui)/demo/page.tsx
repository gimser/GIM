import { Button, Card, CardContent, CardHeader } from '@baqaya/ui';

export default function DemoUIPage() {
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Shared UI Demo</h1>
      <div className="space-x-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
      </div>
      <Card>
        <CardHeader>Card Header</CardHeader>
        <CardContent>Some content</CardContent>
      </Card>
    </main>
  );
}
