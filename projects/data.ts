export interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  category: string;
  image: string;
  resources: string[];
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
    description: "Beautiful animated button components with hover animations",
    date: "2025-01-01",
    category: "Basic",
    features: ["animation", "button", "interaction"],
    technologies: ["React", "TailwindCSS", "JavaScript"],
    resources: [
      "https://prismic.io/blog/css-button-animations",
      "https://www.joshwcomeau.com/animation/css-transitions/"
    ],
    image: "https://abhicdn.netlify.app/images/frontend-365-project1.png",
    tags: ["animation", "button", "interaction"],
    component: "animated-button",
  },
  // Add more projects here as you create them
];

