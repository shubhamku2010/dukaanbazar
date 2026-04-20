import type {
  Order as BackendOrder,
  Product as BackendProduct,
  Shop as BackendShop,
  Category,
  OrderStatus,
} from "./backend";
import type { ExternalBlob } from "./backend";

// Re-export backend types with frontend-friendly aliases
export type { Category, OrderStatus, ExternalBlob };
export type {
  BackendShop as Shop,
  BackendProduct as Product,
  BackendOrder as Order,
};

// Input types for forms
export interface ShopFormData {
  name: string;
  description: string;
  whatsappNumber: string;
  phone: string;
  location: string;
}

export interface ProductFormData {
  name: string;
  description: string;
  price: string; // string for form handling, converted to bigint
  stock: string;
  category: Category;
  imageFile?: File;
}

// UI-level types
export interface CategoryMeta {
  key: Category;
  label: string;
  emoji: string;
}
