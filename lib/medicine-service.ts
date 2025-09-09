import { Medicine, Category, MedicineFilters, PaginatedResponse } from './types';
import { mockMedicines, mockCategories } from './mock-data';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class MedicineService {
  private static medicines: Medicine[] = [...mockMedicines];
  private static categories: Category[] = [...mockCategories];

  static async getMedicines(filters: MedicineFilters = {}): Promise<PaginatedResponse<Medicine>> {
    await delay(300);
    
    let filteredMedicines = [...this.medicines];

    // Apply filters
    if (filters.category_id) {
      filteredMedicines = filteredMedicines.filter(m => m.category_id === filters.category_id);
    }

    if (filters.status) {
      filteredMedicines = filteredMedicines.filter(m => m.status === filters.status);
    } else {
      // By default, exclude deleted medicines
      filteredMedicines = filteredMedicines.filter(m => m.status !== 'deleted');
    }

    if (filters.brand) {
      filteredMedicines = filteredMedicines.filter(m => 
        m.brand.toLowerCase().includes(filters.brand!.toLowerCase())
      );
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredMedicines = filteredMedicines.filter(m => 
        m.name.toLowerCase().includes(searchTerm) ||
        m.brand.toLowerCase().includes(searchTerm)
      );
    }

    // Apply sorting
    if (filters.sort_by) {
      filteredMedicines.sort((a, b) => {
        let aValue: any = a[filters.sort_by!];
        let bValue: any = b[filters.sort_by!];

        if (filters.sort_by === 'price') {
          aValue = Number(aValue);
          bValue = Number(bValue);
        } else if (filters.sort_by === 'created_at') {
          aValue = new Date(aValue);
          bValue = new Date(bValue);
        } else {
          aValue = String(aValue).toLowerCase();
          bValue = String(bValue).toLowerCase();
        }

        if (aValue < bValue) return filters.sort_order === 'desc' ? 1 : -1;
        if (aValue > bValue) return filters.sort_order === 'desc' ? -1 : 1;
        return 0;
      });
    }

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 20;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedMedicines = filteredMedicines.slice(startIndex, endIndex);

    // Add category information
    const medicinesWithCategories = paginatedMedicines.map(medicine => ({
      ...medicine,
      category: this.categories.find(c => c.id === medicine.category_id)
    }));

    return {
      data: medicinesWithCategories,
      pagination: {
        page,
        limit,
        total: filteredMedicines.length,
        totalPages: Math.ceil(filteredMedicines.length / limit)
      }
    };
  }

  static async getMedicineById(id: string): Promise<Medicine | null> {
    await delay(200);
    const medicine = this.medicines.find(m => m.id === id && m.status !== 'deleted');
    if (medicine) {
      return {
        ...medicine,
        category: this.categories.find(c => c.id === medicine.category_id)
      };
    }
    return null;
  }

  static async createMedicine(medicineData: Omit<Medicine, 'id' | 'created_at' | 'updated_at'>): Promise<Medicine> {
    await delay(300);
    const newMedicine: Medicine = {
      ...medicineData,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    this.medicines.push(newMedicine);
    return newMedicine;
  }

  static async createMedicinesBulk(medicinesData: Omit<Medicine, 'id' | 'created_at' | 'updated_at'>[]): Promise<Medicine[]> {
    await delay(500);
    const newMedicines = medicinesData.map(data => ({
      ...data,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }));
    this.medicines.push(...newMedicines);
    return newMedicines;
  }

  static async updateMedicine(id: string, updates: Partial<Medicine>): Promise<Medicine | null> {
    await delay(300);
    const index = this.medicines.findIndex(m => m.id === id);
    if (index !== -1) {
      this.medicines[index] = {
        ...this.medicines[index],
        ...updates,
        updated_at: new Date().toISOString()
      };
      return this.medicines[index];
    }
    return null;
  }

  static async softDeleteMedicine(id: string): Promise<boolean> {
    await delay(300);
    const medicine = this.medicines.find(m => m.id === id);
    if (medicine) {
      medicine.status = 'deleted';
      medicine.updated_at = new Date().toISOString();
      return true;
    }
    return false;
  }

  static async updateMedicineStatus(id: string, status: Medicine['status']): Promise<boolean> {
    await delay(300);
    const medicine = this.medicines.find(m => m.id === id);
    if (medicine) {
      medicine.status = status;
      medicine.updated_at = new Date().toISOString();
      return true;
    }
    return false;
  }

  static async getCategories(): Promise<Category[]> {
    await delay(200);
    return [...this.categories];
  }

  static async createCategory(categoryData: Omit<Category, 'id' | 'created_at'>): Promise<Category> {
    await delay(300);
    const newCategory: Category = {
      ...categoryData,
      id: Date.now().toString(),
      created_at: new Date().toISOString()
    };
    this.categories.push(newCategory);
    return newCategory;
  }
}