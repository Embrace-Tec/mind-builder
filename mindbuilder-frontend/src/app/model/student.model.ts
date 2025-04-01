
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
  phone_number?: string;
  home_address?: string;
}
