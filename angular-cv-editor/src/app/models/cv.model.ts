export type LayoutKey = 'sidebar' | 'band' | 'centered' | 'minimal' | 'duo';
export type SchemeKey =
  | 'forest' | 'linen' | 'ink' | 'sky' | 'cherry' | 'terracotta' | 'sage';

/** A resolved, fully-editable colour theme. Every layout reads only these tokens. */
export interface Theme {
  page: string;
  ink: string;
  sub: string;
  muted: string;
  heading: string;
  accent: string;
  panel: string;
  panelInk: string;
  panelSub: string;
  panelLabel: string;
  soft: string;
  softInk: string;
  chip: string;
  chipInk: string;
  trackOnPanel: string;
  fillOnPanel: string;
  trackOnPage: string;
  fillOnPage: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  desc: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  details: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1..5
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface CvData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  photo: string | null;
  summary: string;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  interests: string; // comma separated
  links: LinkItem[];
}

export interface Cv {
  id: string;
  name: string;
  profile: string;
  layout: LayoutKey;
  theme: Theme;
  showPhoto: boolean;
  data: CvData;
}

/** Raw profile data (no ids — ids are assigned by the store at creation). */
export type RawData = Omit<CvData, 'experiences' | 'education' | 'skills' | 'languages' | 'links'> & {
  experiences: Omit<Experience, 'id'>[];
  education: Omit<Education, 'id'>[];
  skills: Omit<Skill, 'id'>[];
  languages: Omit<Language, 'id'>[];
  links: Omit<LinkItem, 'id'>[];
};
