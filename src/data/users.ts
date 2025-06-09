import { User } from '../types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: '2',
    name: 'Contributor User',
    email: 'contributor@example.com',
    role: 'contributor',
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: '3',
    name: 'Viewer User',
    email: 'viewer@example.com',
    role: 'viewer',
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
];