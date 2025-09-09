export interface Medicine {
  id: string;
  name: string;
  image_url: string;
  price: number;
  brand: string;
  category_id: string;
  status: 'available' | 'hidden' | 'unavailable' | 'deleted';
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'super_admin' | 'staff';
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface MedicineFilters {
  category_id?: string;
  status?: Medicine['status'];
  brand?: string;
  search?: string;
  sort_by?: 'price' | 'brand' | 'created_at' | 'name';
  sort_order?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}