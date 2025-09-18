"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Shield, Users, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Package className="h-16 w-16 text-blue-600 mr-4" />
            <h1 className="text-5xl font-bold text-gray-900">MedStore</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive medicine records management system for healthcare providers
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Medicine Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Medicine Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Add, edit, and manage medicine inventory with bulk operations
              </p>
            </CardContent>
          </Card>

          {/* Secure Operations */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Secure Operations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Soft delete functionality and role-based access control
              </p>
            </CardContent>
          </Card>

          {/* Analytics */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Comprehensive reporting and inventory analytics
              </p>
            </CardContent>
          </Card>

          {/* User Management */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Admin and staff roles with appropriate permissions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Panel Button */}
        <div className="text-center mb-16">
          <Link href="/admin">
            <Button size="lg" className="text-lg px-8 py-4">
              Access Admin Panel
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Key Features Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <FeatureItem
                title="Single & Bulk Medicine Entry"
                description="Add medicines individually or import multiple records at once"
              />
              <FeatureItem
                title="Advanced Filtering & Sorting"
                description="Sort by price, brand, date with comprehensive search"
              />
              <FeatureItem
                title="Status Management"
                description="Available, hidden, unavailable, and soft delete options"
              />
            </div>
            <div className="space-y-4">
              <FeatureItem
                title="Pagination Support"
                description="Efficient data loading with customizable page sizes"
              />
              <FeatureItem
                title="Category Management"
                description="Organize medicines by categories with foreign key relationships"
              />
              <FeatureItem
                title="Real-time Dashboard"
                description="Live statistics and inventory overview"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Feature item component for cleaner reuse
function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2" />
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
