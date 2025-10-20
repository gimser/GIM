
import React, { useMemo } from 'react';
import { Product, ProductStatus } from '../../types';
import Card from '../Card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AlertIcon, CheckCircleIcon, ClockIcon } from '../icons';

const StoreHeatmap: React.FC<{ products: Product[] }> = ({ products }) => {
    const locations = useMemo(() => {
        const locs = new Map<string, { soon: number, expired: number }>();
        products.forEach(p => {
            if (!locs.has(p.location)) {
                locs.set(p.location, { soon: 0, expired: 0 });
            }
            const current = locs.get(p.location)!;
            if (p.status === ProductStatus.Soon) {
                current.soon++;
            } else if (p.status === ProductStatus.Expired) {
                current.expired++;
            }
        });
        return Array.from(locs.entries()).sort();
    }, [products]);

    const getBgColor = (soon: number, expired: number) => {
        if (expired > 0) return 'bg-red-800 hover:bg-red-700';
        if (expired > 0 || soon > 5) return 'bg-red-900 hover:bg-red-800';
        if (soon > 2) return 'bg-orange-800 hover:bg-orange-700';
        if (soon > 0) return 'bg-yellow-800 hover:bg-yellow-700';
        return 'bg-green-800 hover:bg-green-700';
    };

    return (
        <Card title="Store Zones Risk Heatmap">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {locations.map(([name, counts]) => (
                    <div key={name} className={`p-3 rounded-lg text-center transition-colors ${getBgColor(counts.soon, counts.expired)}`}>
                        <p className="font-bold text-white">{name}</p>
                        <div className="text-xs text-gray-300 mt-1">
                            {counts.expired > 0 && <span className="mr-2">Expired: {counts.expired}</span>}
                            {counts.soon > 0 && <span>Soon: {counts.soon}</span>}
                             {counts.expired === 0 && counts.soon === 0 && <span>OK</span>}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const ExpiringSoonAlerts: React.FC<{ products: Product[], alertDays: number }> = ({ products, alertDays }) => {
    if (products.length === 0) {
        return (
            <Card title={`Alerts: Expiring within ${alertDays} days`} className="h-full">
                <div className="flex flex-col items-center justify-center h-full text-center p-4">
                    <CheckCircleIcon />
                    <p className="mt-2 text-lg font-semibold text-status-green">All Clear!</p>
                    <p className="text-gray-400">No products are expiring in the selected timeframe.</p>
                </div>
            </Card>
        );
    }

    return (
        <Card title={`Alerts: Expiring within ${alertDays} days`} icon={<AlertIcon />}>
            <div className="max-h-[250px] overflow-y-auto pr-2">
                <ul className="space-y-3">
                    {products.map(product => {
                         const today = new Date();
                         today.setHours(0, 0, 0, 0);
                         const expiration = new Date(product.expirationDate);
                         expiration.setHours(0, 0, 0, 0);
                         const diffTime = expiration.getTime() - today.getTime();
                         const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                         const daysText = daysLeft < 0 ? 'Expired' : daysLeft === 0 ? 'Today' : daysLeft === 1 ? '1 day' : `${daysLeft} days`;

                        return (
                            <li key={product.id} className="flex items-center justify-between p-3 bg-supeco-light-gray rounded-lg">
                                <div>
                                    <p className="font-bold text-white">{product.name}</p>
                                    <p className="text-sm text-gray-400">{product.location} - Qty: {product.quantity}</p>
                                </div>
                                <span className="text-sm font-bold text-status-orange bg-orange-900/50 px-3 py-1 rounded-full">
                                    {daysText}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </Card>
    )
}

interface DashboardViewProps {
    products: Product[];
    expiringProducts: Product[];
    alertDays: number;
}

const DashboardView: React.FC<DashboardViewProps> = ({ products, expiringProducts, alertDays }) => {
  const stats = useMemo(() => {
    return products.reduce((acc, product) => {
      acc.total++;
      if (product.status === ProductStatus.Expired) acc.expired++;
      else if (product.status === ProductStatus.Soon) acc.soon++;
      else acc.fresh++;
      return acc;
    }, { total: 0, expired: 0, soon: 0, fresh: 0 });
  }, [products]);

  const pieData = [
    { name: 'Fresh', value: stats.fresh, color: '#4CAF50' },
    { name: 'Expiring Soon', value: stats.soon, color: '#FB8C00' },
    { name: 'Expired', value: stats.expired, color: '#E53935' },
  ];

  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card title="Total Products" icon={<CheckCircleIcon />}><p className="text-4xl font-bold text-white">{stats.total}</p></Card>
            <Card title="Fresh Stock" icon={<CheckCircleIcon />}><p className="text-4xl font-bold text-status-green">{stats.fresh}</p></Card>
            <Card title="Expiring Soon" icon={<ClockIcon />}><p className="text-4xl font-bold text-status-orange">{stats.soon}</p></Card>
            <Card title="Expired Products" icon={<AlertIcon />}><p className="text-4xl font-bold text-status-red">{stats.expired}</p></Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card title="Product Status Overview" className="lg:col-span-2">
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                            {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#333', border: 'none' }} itemStyle={{ color: '#fff' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>
            <div className="lg:col-span-3">
                <ExpiringSoonAlerts products={expiringProducts} alertDays={alertDays} />
            </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
            <StoreHeatmap products={products} />
        </div>
    </div>
  );
};

export default DashboardView;
