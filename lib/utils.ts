import { projects, type Project } from "@/projects/data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getProject(
  projectId: string,
  month: string,
  year: number
): Promise<Project> {
  const project = projects.find(
    (p) => p.id === parseInt(projectId) && p.month === month && p.year === year
  );
  if (!project) {
    return Promise.reject(`Project with id ${projectId} not found`);
  }
  return Promise.resolve({
    ...project,
  });
}
