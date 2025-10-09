"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface MedicineTableProps {
  onAddMedicine?: () => void;
  onEditMedicine?: (medicine: any) => void;
}

export function MedicineTable({ onAddMedicine, onEditMedicine }: MedicineTableProps) {
  const [medicines, setMedicines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/medicine");
        const medicinesData = await res.json();
        setMedicines(medicinesData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Medicine Inventory</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead>Tablets</TableHead>
                <TableHead>Price Per Tab</TableHead>
                <TableHead>Price Per Strip</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading medicines...
                  </TableCell>
                </TableRow>
              ) : medicines.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    No medicines found
                  </TableCell>
                </TableRow>
              ) : (
                medicines.map((medicine: any) => (
                  <TableRow key={medicine.id}>
                    <TableCell>{medicine.id}</TableCell>
                    <TableCell>{medicine.name}</TableCell>
                    <TableCell>{medicine.brand}</TableCell>
                    <TableCell>{medicine.tablets}</TableCell>
                    <TableCell>${medicine.pricePerTab.toFixed(2)}</TableCell>
                    <TableCell>${medicine.pricePerStrip.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" onClick={() => onEditMedicine?.(medicine)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}