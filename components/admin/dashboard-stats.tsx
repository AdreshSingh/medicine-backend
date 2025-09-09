"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MedicineService } from '@/lib/medicine-service';
import { 
  Package, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  Users
} from 'lucide-react';

export function DashboardStats() {
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    hidden: 0,
    unavailable: 0,
    totalValue: 0,
    categories: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [medicinesResponse, categories] = await Promise.all([
        MedicineService.getMedicines({ limit: 1000 }), // Get all medicines
        MedicineService.getCategories()
      ]);

      const medicines = medicinesResponse.data;
      const available = medicines.filter(m => m.status === 'available').length;
      const hidden = medicines.filter(m => m.status === 'hidden').length;
      const unavailable = medicines.filter(m => m.status === 'unavailable').length;
      const totalValue = medicines
        .filter(m => m.status === 'available')
        .reduce((sum, m) => sum + m.price, 0);

      setStats({
        total: medicines.length,
        available,
        hidden,
        unavailable,
        totalValue,
        categories: categories.length
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Medicines',
      value: stats.total,
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Available',
      value: stats.available,
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Hidden',
      value: stats.hidden,
      icon: EyeOff,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'Unavailable',
      value: stats.unavailable,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Total Value',
      value: `$${stats.totalValue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Categories',
      value: stats.categories,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}