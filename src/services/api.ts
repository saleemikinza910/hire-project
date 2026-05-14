import axios from 'axios';
import { Talent, Project, User } from '../types';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});

const SKILLS_POOL = [
  'React', 'Node.js', 'TypeScript', 'Tailwind CSS', 'UI/UX Design', 
  'Cloud Architecture', 'Machine Learning', 'Python', 'AWS', 'Docker',
  'PostgreSQL', 'GraphQL', 'Next.js', 'Solidity'
];

const ROLES_POOL = [
  'Senior Frontend Engineer', 'Backend Specialist', 'Full Stack Developer',
  'AI Research Scientist', 'UI Designer', 'DevOps Architect', 'Mobile App Expert'
];

export const talentService = {
  getTalents: async (): Promise<Talent[]> => {
    const { data: users } = await api.get<User[]>('/users');
    return users.map((user) => ({
      ...user,
      role: ROLES_POOL[user.id % ROLES_POOL.length],
      skills: Array.from({ length: 4 }, (_, i) => SKILLS_POOL[(user.id * (i + 1)) % SKILLS_POOL.length]),
      matchScore: 60 + Math.floor(Math.random() * 38), // 60-98%
      availability: user.id % 2 === 0 ? 'Full-time' : 'Contract',
      experience: `${(user.id % 10) + 2} years`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      projectsCount: (user.id % 15) + 5,
      rating: 4 + (user.id % 10) / 10,
      hourlyRate: 40 + (user.id % 20) * 10,
    }));
  },

  getTalentById: async (id: number): Promise<Talent> => {
    const { data: user } = await api.get<User>(`/users/${id}`);
    return {
      ...user,
      role: ROLES_POOL[user.id % ROLES_POOL.length],
      skills: Array.from({ length: 5 }, (_, i) => SKILLS_POOL[(user.id * (i + 1)) % SKILLS_POOL.length]),
      matchScore: 60 + Math.floor(Math.random() * 38),
      availability: user.id % 2 === 0 ? 'Full-time' : 'Contract',
      experience: `${(user.id % 10) + 2} years`,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
      projectsCount: (user.id % 15) + 5,
      rating: 4 + (user.id % 10) / 10,
      hourlyRate: 40 + (user.id % 20) * 10,
    };
  },

  getProjectsByUserId: async (userId: number): Promise<Project[]> => {
    const { data: posts } = await api.get(`/posts?userId=${userId}`);
    return posts.map((post: any) => ({
      id: post.id,
      title: post.title.split(' ').slice(0, 3).join(' '),
      description: post.body,
      userId: post.userId,
      techStack: [SKILLS_POOL[post.id % SKILLS_POOL.length], SKILLS_POOL[(post.id + 1) % SKILLS_POOL.length]],
      imageUrl: `https://picsum.photos/seed/${post.id}/600/400`,
      difficulty: post.id % 3 === 0 ? 'Advanced' : post.id % 2 === 0 ? 'Intermediate' : 'Beginner',
    }));
  }
};
