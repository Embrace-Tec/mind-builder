export interface Teacher {
  id: number;
  name: string;
  email: string;
  role: string; // or you can use enum if you have Role defined
}

export interface TeacherRegistration {
  name: string;
  email: string;
  password: string;
}

export interface TeacherUpdate {
  id: number;
  name: string;
  email: string;
}
