"use client";

import { useState, useEffect } from 'react';
import { Medicine, Category } from '@/lib/types';
import { MedicineService } from '@/lib/medicine-service';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { X, Upload, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface MedicineFormProps {
  medicine?: Medicine;
  onClose: () => void;
  onSuccess: () => void;
}

interface BulkMedicineData {
  name: string;
  brand: string;
  price: string;
  category_id: string;
  image_url: string;
  status: Medicine['status'];
}

export function MedicineForm({ medicine, onClose, onSuccess }: MedicineFormProps) {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState('single');
  
  // Single medicine form
  const [formData, setFormData] = useState({
    name: medicine?.name || '',
    brand: medicine?.brand || '',
    price: medicine?.price?.toString() || '',
    category_id: medicine?.category_id || '',
    image_url: medicine?.image_url || '',
    status: medicine?.status || 'available' as Medicine['status']
  });

  // Bulk medicine form
  const [bulkMedicines, setBulkMedicines] = useState<BulkMedicineData[]>([
    { name: '', brand: '', price: '', category_id: '', image_url: '', status: 'available' }
  ]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await MedicineService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      toast.error('Failed to load categories');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const medicineData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      if (medicine) {
        await MedicineService.updateMedicine(medicine.id, medicineData);
        toast.success('Medicine updated successfully');
      } else {
        await MedicineService.createMedicine(medicineData);
        toast.success('Medicine created successfully');
      }
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to save medicine');
    } finally {
      setLoading(false);
    }
  };

  const handleBulkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const validMedicines = bulkMedicines.filter(m => 
        m.name && m.brand && m.price && m.category_id
      );

      if (validMedicines.length === 0) {
        toast.error('Please fill in at least one complete medicine entry');
        return;
      }

      const medicinesData = validMedicines.map(m => ({
        ...m,
        price: parseFloat(m.price),
        image_url: m.image_url || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400'
      }));

      await MedicineService.createMedicinesBulk(medicinesData);
      toast.success(`${validMedicines.length} medicines created successfully`);
      
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to create medicines');
    } finally {
      setLoading(false);
    }
  };

  const addBulkMedicine = () => {
    setBulkMedicines([...bulkMedicines, { 
      name: '', brand: '', price: '', category_id: '', image_url: '', status: 'available' 
    }]);
  };

  const removeBulkMedicine = (index: number) => {
    setBulkMedicines(bulkMedicines.filter((_, i) => i !== index));
  };

  const updateBulkMedicine = (index: number, field: string, value: string) => {
    const updated = [...bulkMedicines];
    updated[index] = { ...updated[index], [field]: value };
    setBulkMedicines(updated);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {medicine ? 'Edit Medicine' : 'Add Medicine'}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single Medicine</TabsTrigger>
              <TabsTrigger value="bulk" disabled={!!medicine}>Bulk Insert</TabsTrigger>
            </TabsList>

            <TabsContent value="single">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Medicine Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter medicine name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand *</Label>
                    <Input
                      id="brand"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      placeholder="Enter brand name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="price">Price *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(category => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value) => setFormData({ ...formData, status: value as Medicine['status'] })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="hidden">Hidden</SelectItem>
                        <SelectItem value="unavailable">Unavailable</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="image_url">Image URL</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.image_url && (
                      <div className="mt-2">
                        <img
                          src={formData.image_url}
                          alt="Preview"
                          className="w-24 h-24 object-cover rounded-md border"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Saving...' : medicine ? 'Update Medicine' : 'Create Medicine'}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="bulk">
              <form onSubmit={handleBulkSubmit} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Bulk Medicine Insert</h3>
                  <Button type="button" onClick={addBulkMedicine} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Row
                  </Button>
                </div>

                <div className="space-y-4">
                  {bulkMedicines.map((medicine, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="outline">Medicine #{index + 1}</Badge>
                        {bulkMedicines.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeBulkMedicine(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          placeholder="Medicine name"
                          value={medicine.name}
                          onChange={(e) => updateBulkMedicine(index, 'name', e.target.value)}
                        />
                        <Input
                          placeholder="Brand"
                          value={medicine.brand}
                          onChange={(e) => updateBulkMedicine(index, 'brand', e.target.value)}
                        />
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="Price"
                          value={medicine.price}
                          onChange={(e) => updateBulkMedicine(index, 'price', e.target.value)}
                        />
                        <Select
                          value={medicine.category_id}
                          onValueChange={(value) => updateBulkMedicine(index, 'category_id', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={medicine.status}
                          onValueChange={(value) => updateBulkMedicine(index, 'status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="available">Available</SelectItem>
                            <SelectItem value="hidden">Hidden</SelectItem>
                            <SelectItem value="unavailable">Unavailable</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Image URL (optional)"
                          value={medicine.image_url}
                          onChange={(e) => updateBulkMedicine(index, 'image_url', e.target.value)}
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : `Create ${bulkMedicines.length} Medicines`}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}