export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Talent extends User {
  role: string;
  skills: string[];
  matchScore: number;
  availability: 'Full-time' | 'Contract' | 'Part-time';
  experience: string;
  avatar: string;
  projectsCount: number;
  rating: number;
  hourlyRate: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  userId: number;
  techStack: string[];
  imageUrl: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  avatar: string;
}
