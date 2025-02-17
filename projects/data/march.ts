import { Project } from "./types";

export const marchProjects: Project[] = [
  {
    id: 1,
    month: "march",
    year: 2025,
    name: "Heatmap Tooltip",
    description: "Interactive heatmap with detailed tooltips",
    date: "2025-03-29",
    category: "Advanced",
    component: "project60",
    image: "https://abhicdn.netlify.app/images/frontend-365-project60.png",
    resources: [
      "https://www.npmjs.com/package/react-tooltip",
      "https://d3js.org/",
    ],
    features: [
      "Data visualization",
      "Interactive tooltips",
      "Color gradient mapping",
      "Responsive layout",
    ],
    tags: ["Visualization", "Heatmap"],
    technologies: ["React", "TailwindCSS", "D3.js"],
  },
  {
    id: 2,
    month: "march",
    year: 2025,
    name: "Customizable Widget",
    description: "Configurable widget component using ShadcnUI Card",
    date: "2025-03-30",
    category: "Intermediate",
    component: "project61",
    image: "https://abhicdn.netlify.app/images/frontend-365-project61.png",
    resources: [
      "https://ui.shadcn.com/docs/components/card",
      "https://www.radix-ui.com/",
    ],
    features: [
      "Customizable layout",
      "Theme switching",
      "Content configuration",
      "Responsive design",
    ],
    tags: ["Widget", "Card"],
    technologies: ["React", "TailwindCSS", "ShadcnUI"],
  },
];
