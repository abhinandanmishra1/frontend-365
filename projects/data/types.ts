export interface Project {
  id: number; // Changed to string for month-based identification
  name: string;
  description: string;
  date: string;
  category?: "Basic" | "Intermediate" | "Advanced" | string;
  image: string;
  resources: string[];
  features: string[];
  tags: string[];
  technologies: string[];
  component: string;
  month: string; // New field to specify the month
  year: number; // New field to specify the year
}
