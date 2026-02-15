
import { User, UserRole } from '../types';

const MOCK_USERS: User[] = [
  { 
    id: '1', 
    email: 'nurse@hayattriage.ma', 
    name: 'Fatima El Mansouri',
    role: 'nurse',
    hospital: 'CHU Ibn Rochd (Casablanca)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima'
  },
  { 
    id: '2', 
    email: 'doctor@hayattriage.ma', 
    name: 'Dr. Youssef Bennani',
    role: 'doctor',
    specialty: 'Cardiology',
    hospital: 'CHU Ibn Rochd (Casablanca)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Youssef'
  },
  { 
    id: '3', 
    email: 'admin@hayattriage.ma', 
    name: 'Ahmed Alami',
    role: 'admin',
    hospital: 'CHU Ibn Rochd (Casablanca)',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed'
  },
  { 
    id: '4', 
    email: 'manager@hayattriage.ma', 
    name: 'Nadia Idrissi',
    role: 'manager',
    hospital: 'Ministry of Health',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nadia'
  }
];

export const mockLogin = (email: string, password: string): { success: boolean; user?: User; token?: string; error?: string } => {
  // Simple check for demo
  const user = MOCK_USERS.find(u => u.email === email);
  if (user && password === 'Password123!') {
    const token = btoa(JSON.stringify({ id: user.id, exp: Date.now() + 8 * 60 * 60 * 1000 }));
    return { success: true, user, token };
  }
  return { success: false, error: 'Invalid email or password' };
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('hayat_user');
  return userJson ? JSON.parse(userJson) : null;
};

export const logout = () => {
  localStorage.removeItem('hayat_user');
  localStorage.removeItem('hayat_token');
};
