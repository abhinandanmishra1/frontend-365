export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  category: string;
  image: string;
  features: string[];
  tags: string[];
  technologies: string[];
  component: string; // path to the component
}

// Initialize projects without code snippets first
export const projects: Project[] = [
  {
    id: 1,
    name: "Animated Button",
    description: "A beautiful button component with hover animations",
    date: "2024-12-31",
    category: "Basic",
    features: ["animation", "button", "interaction"],
    technologies: ["React", "TailwindCSS", "JavaScript"],
    image: "https://abhicdn.netlify.app/images/frontend-365-project1.png",
    tags: ["animation", "button", "interaction"],
    component: "animated-button",
  },
  // Add more projects here as you create them
];

