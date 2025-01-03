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
  {
    id: 2,
    name: "Custom Checkbox",
    description: "Custom checkbox with custom colors and disabled state, accessible in forced colors mode as well.",
    date: "2025-01-02",
    category: "Basic",
    component: "project2",
    image: "https://abhicdn.netlify.app/images/frontend-365-project2.png",
    resources: [
      "https://moderncss.dev/pure-css-custom-checkbox-style/",
      "https://css-tricks.com/almanac/properties/b/box-shadow/",
      "https://www.youtube.com/watch?v=-JNRQ5HjNeI",
      "https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow",
      "https://www.youtube.com/watch?v=yYGLEy7CiT0",
      "https://polypane.app/blog/forced-colors-explained-a-practical-guide/"
    ],
    features: [
      "Custom Checkbox with better look",
      "Good for accessibility and forced colors mode",
      "Changes state on enter key press",
      "Disabled state with cursor not allowed",
      "Custom color for label and checked checkbox",
    ],
    tags: [],
    technologies: [
      "React",
      "Styled Components",
    ],
  },
  {
    id: 3,
    name: "Toggle Switch",
    description: "Custom toggle switch with custom colors and disabled state, accessible in forced colors mode as well.",
    date: "2025-01-03",
    category: "Basic",
    component: "project3",
    image: "https://abhicdn.netlify.app/images/frontend-365-project3.png",
    resources: [
      "https://moderncss.dev/pure-css-custom-radio-button-style/",
      "https://css-tricks.com/the-checkbox-showdown/"
    ],
    features: [
      "Toggle switch with custom colors and disabled state, accessible in forced colors mode as well.",
      "Changes state on enter key press",
      "Disabled state with cursor not allowed",
      "Custom color for label and checked toggle switch",
      "Text for checked and unchecked state",
    ],
    tags: [],
    technologies: [
      "React",
      "Styled Components",
    ],
  }
  // Add more projects here as you create them
];

