import { Medicine, Category, Admin } from './types';

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Pain Relief',
    description: 'Medications for pain management',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Antibiotics',
    description: 'Antimicrobial medications',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Vitamins',
    description: 'Nutritional supplements',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '4',
    name: 'Cold & Flu',
    description: 'Medications for cold and flu symptoms',
    created_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Digestive Health',
    description: 'Medications for digestive issues',
    created_at: '2024-01-01T00:00:00Z'
  }
];

export const mockMedicines: Medicine[] = [
  {
    id: '1',
    name: 'Ibuprofen 200mg',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 12.99,
    brand: 'Advil',
    category_id: '1',
    status: 'available',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Amoxicillin 500mg',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 24.50,
    brand: 'Generic',
    category_id: '2',
    status: 'available',
    created_at: '2024-01-14T09:15:00Z',
    updated_at: '2024-01-14T09:15:00Z'
  },
  {
    id: '3',
    name: 'Vitamin D3 1000 IU',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 18.75,
    brand: 'Nature Made',
    category_id: '3',
    status: 'available',
    created_at: '2024-01-13T14:20:00Z',
    updated_at: '2024-01-13T14:20:00Z'
  },
  {
    id: '4',
    name: 'Acetaminophen 500mg',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 9.99,
    brand: 'Tylenol',
    category_id: '1',
    status: 'available',
    created_at: '2024-01-12T11:45:00Z',
    updated_at: '2024-01-12T11:45:00Z'
  },
  {
    id: '5',
    name: 'Cough Syrup',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 15.25,
    brand: 'Robitussin',
    category_id: '4',
    status: 'hidden',
    created_at: '2024-01-11T16:30:00Z',
    updated_at: '2024-01-20T10:15:00Z'
  },
  {
    id: '6',
    name: 'Antacid Tablets',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 8.50,
    brand: 'Tums',
    category_id: '5',
    status: 'unavailable',
    created_at: '2024-01-10T13:00:00Z',
    updated_at: '2024-01-19T09:30:00Z'
  },
  {
    id: '7',
    name: 'Aspirin 81mg',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 6.99,
    brand: 'Bayer',
    category_id: '1',
    status: 'available',
    created_at: '2024-01-09T08:45:00Z',
    updated_at: '2024-01-09T08:45:00Z'
  },
  {
    id: '8',
    name: 'Multivitamin',
    image_url: 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 22.99,
    brand: 'Centrum',
    category_id: '3',
    status: 'available',
    created_at: '2024-01-08T12:20:00Z',
    updated_at: '2024-01-08T12:20:00Z'
  }
];

export const mockAdmin: Admin = {
  id: '1',
  name: 'Admin User',
  email: 'admin@medstore.com',
  password_hash: 'hashed_password',
  role: 'super_admin',
  created_at: '2024-01-01T00:00:00Z'
};