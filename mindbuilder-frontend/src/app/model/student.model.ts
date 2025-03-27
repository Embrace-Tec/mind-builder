export interface Student {
  id: number;
  name: string;
  email: string;
  parent?: Parent;
  studentRank: number;
  totalMarks: number;
}

export interface Parent {
  id: number;
  name: string;
  email: string;
  // Add any additional fields that might come from the backend
  // For example:
  phone?: string;
  address?: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  parentId?: number;
}

export interface ParentDTO {
  id: number;
  name: string;
  email: string;
  phone_number?: string;  // Example if backend uses snake_case
  home_address?: string;  // Example if backend uses different field names
}
