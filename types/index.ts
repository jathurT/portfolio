// ---- prototype data shapes (claude-design) ----

export interface Socials {
  github: string;
  linkedin: string;
  leetcode: string;
  medium: string;
}

export interface Person {
  name: string;
  fullName: string;
  title: string;
  location: string;
  statement: string;
  bio: string[];
  email: string;
  socials: Socials;
  intern: string;
  timezone: string;
}

export interface Fact {
  v: string;
  l: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  dates: string;
  summary: string;
  stack: string[];
}

export type ProjectMockKind =
  | "sms"
  | "dental"
  | "ml"
  | "hotel"
  | "cloud"
  | "blockchain"
  | "pillpin";

export interface FeaturedProject {
  year: string;
  title: string;
  desc: string;
  stack: string[];
  live: string | null;
  github: string | null;
  demo?: string | null;
  mock: ProjectMockKind;
}

export interface ArchiveItem {
  year: string;
  title: string;
  stack: string[];
  github?: string;
}

export interface SkillCat {
  cat: string;
  items: [string, string][];
}

export type RecTint =
  | "violet"
  | "emerald"
  | "amber"
  | "sky"
  | "coral"
  | "rose";

export interface Rec {
  name: string;
  role: string;
  company: string;
  relationship: string;
  initials: string;
  tint: RecTint;
  date: string;
  pull: string;
  quote: string;
  featured?: boolean;
}

export interface WritingItem {
  date: string;
  title: string;
  read: string;
}

// ---- re-added sections (existing JSON data) ----

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  credentialId: string;
  credentialUrl: string;
  skills: string[];
  description: string;
}

export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  rank: string;
  description: string;
  totalParticipants?: string;
  globalRank?: string;
  icon: string;
  color: string;
  category: string;
}

// ---- contact form (EmailJS) ----

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// ---- full portfolio data contract ----

export interface PortfolioData {
  person: Person;
  facts: Fact[];
  experience: ExperienceItem[];
  featured: FeaturedProject[];
  archive: ArchiveItem[];
  skills: SkillCat[];
  recommendations: Rec[];
  writing: WritingItem[];
  achievements: Achievement[];
  certifications: Certification[];
}
