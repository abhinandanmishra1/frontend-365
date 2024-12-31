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
    date: "2024-03-20",
    category: "Basic",
    features: ["animation", "button", "interaction"],
    technologies: ["React", "TailwindCSS", "JavaScript"],
    image: "/placeholder.svg?height=200&width=300&text=Project+1",
    tags: ["animation", "button", "interaction"],
    component: "animated-button",
  },
  // Add more projects here as you create them
];

