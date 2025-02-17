import { februaryProjects } from "./february";
import { januaryProjects } from "./january";

export interface Project {
  id: number; // Changed to string for month-based identification
  name: string;
  description: string;
  date: string;
  category: "Basic" | "Intermediate" | "Advanced";
  image: string;
  resources: string[];
  features: string[];
  tags: string[];
  technologies: string[];
  component: string;
  month: string; // New field to specify the month
  year: number; // New field to specify the year
}

// Initialize projects without code snippets first
export const projects: Project[] = [...januaryProjects, ...februaryProjects];

export const getProjectsByMonthAndYear = (year: number, month: string) => {
  console.log(projects);
  return projects.filter(
    (project) =>
      project.year === year &&
      project.month.toLowerCase() === month.toLowerCase()
  );
};

// Get unique years and months
export const getUniqueMonthsAndYears = () => {
  const uniqueYears = [2025];
  const uniqueMonths = ["january", "february"];
  return { years: uniqueYears, months: uniqueMonths };
};
