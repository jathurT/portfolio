export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  images: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
  startDate: string;
  endDate: string;
}

export interface Skill {
  name: string;
  proficiency: number;
  icon: string;
  yearsOfExperience: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  type: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
  error?: string;
}

export interface Recommendation {
  id: string;
  name: string;
  position: string;
  company: string;
  relationship: string;
  image: string;
  linkedinUrl: string;
  date: string;
  recommendation: string;
  featured: boolean;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  image: string;
  description: string;
}
