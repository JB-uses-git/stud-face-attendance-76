export type UserRole = 'teacher' | 'student' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  // Role-specific fields
  employeeId?: string; // for teachers and admin
  rollNumber?: string; // for students
  course?: string; // for students
  department?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Mock users for demonstration
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'teacher@college.edu',
    name: 'Dr. Sarah Johnson',
    role: 'teacher',
    employeeId: 'EMP001',
    department: 'Computer Science',
  },
  {
    id: '2',
    email: 'student@college.edu',
    name: 'Alex Kumar',
    role: 'student',
    rollNumber: 'CS2021001',
    course: 'B.Tech Computer Science',
    department: 'Computer Science',
  },
  {
    id: '3',
    email: 'admin@college.edu',
    name: 'Prof. Michael Chen',
    role: 'admin',
    employeeId: 'ADM001',
    department: 'Administration',
  },
];