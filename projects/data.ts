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
      "https://www.joshwcomeau.com/animation/css-transitions/",
    ],
    image: "https://abhicdn.netlify.app/images/frontend-365-project1.png",
    tags: ["animation", "button", "interaction"],
    component: "animated-button",
  },
  {
    id: 2,
    name: "Custom Checkbox",
    description:
      "Custom checkbox with custom colors and disabled state, accessible in forced colors mode as well.",
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
      "https://polypane.app/blog/forced-colors-explained-a-practical-guide/",
    ],
    features: [
      "Custom Checkbox with better look",
      "Good for accessibility and forced colors mode",
      "Changes state on enter key press",
      "Disabled state with cursor not allowed",
      "Custom color for label and checked checkbox",
    ],
    tags: [],
    technologies: ["React", "Styled Components"],
  },
  {
    id: 3,
    name: "Toggle Switch",
    description:
      "Custom toggle switch with custom colors and disabled state, accessible in forced colors mode as well.",
    date: "2025-01-03",
    category: "Basic",
    component: "project3",
    image: "https://abhicdn.netlify.app/images/frontend-365-project3.png",
    resources: [],
    features: [
      "Toggle switch with custom colors and disabled state, accessible in forced colors mode as well.",
      "Changes state on enter key press",
      "Disabled state with cursor not allowed",
      "Custom color for label and checked toggle switch",
      "Text for checked and unchecked state",
    ],
    tags: [],
    technologies: ["React", "Styled Components"],
  },
  {
    id: 4,
    name: "Accordion Menu",
    description: "Accordion menu with multiple open and single open features",
    date: "2025-01-04",
    category: "Basic",
    component: "project4",
    image: "https://abhicdn.netlify.app/images/frontend-365-project4.png",
    resources: ["https://elfsight.com/accordion-faq-widget/examples/"],
    features: [
      "Accordion menu with multiple open and single open features",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 5,
    name: "Responsive Navbar",
    description: "Dynamic Responsive navbar with sticky ability",
    date: "2025-01-05",
    category: "Basic",
    component: "project5",
    image: "https://abhicdn.netlify.app/images/frontend-365-project5.png",
    resources: [
      "https://flowbite.com/docs/components/navbar/",
    ],
    features: [
      "Responsive navbar with sticky ability",
      "It's a dynamic component and can be used in any project",
      "Compatible with both dark and light modes",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 6,
    name: "Modal",
    description: "Modal with close button and overlay",
    date: "2025-01-06",
    category: "Basic",
    component: "project6",
    image: "https://abhicdn.netlify.app/images/frontend-365-project6.png",
    resources: [
      "https://flowbite.com/docs/components/modal/",
    ],
    features: [
      "Modal with close button and overlay",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 7,
    name: "Tooltip",
    description: "Tooltip with custom colors and content features",
    date: "2025-01-07",
    category: "Basic",
    component: "project7",
    image: "https://abhicdn.netlify.app/images/frontend-365-project7.png",
    resources: [
      "https://uiverse.io/tooltips",
    ],
    features: [
      "Tooltip of different types like info, success, warning and error",
      "Can add custom content in the tooltip",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 8,
    name: "Progress Bar",
    description: "Progress bar with different colors for different progress level",
    date: "2025-01-08",
    category: "Basic",
    component: "project8",
    image: "https://abhicdn.netlify.app/images/frontend-365-project8.png",
    resources: [
      "https://flowbite.com/docs/components/progress/",
    ],
    features: [
      "Progress bar with different colors for different progress level",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 9,
    name: "Tabs Component",
    description: "Tabs component like shadcnui",
    date: "2025-01-09",
    category: "Basic",
    component: "project9",
    image: "https://abhicdn.netlify.app/images/frontend-365-project9.png",
    resources: [
      "https://ui.shadcn.com/docs/components/tabs",
    ],
    features: [
      "Tabs component like shadcnui",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 10,
    name: "Tabs Component 2 ",
    description: "Tabs component like shadcnui using React context",
    date: "2025-01-10",
    category: "Basic",
    component: "project10",
    image: "https://abhicdn.netlify.app/images/frontend-365-project10.png",
    resources: [
      "https://ui.shadcn.com/docs/components/tabs",
    ],
    features: [
      "Tabs component like shadcnui developed using React context concept",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },{
    id: 11,
    name: "Stars Component",
    description: "Star rating component allows full and half star rating both",
    date: "2025-01-11",
    category: "Basic",
    component: "project11",
    image: "https://abhicdn.netlify.app/images/frontend-365-project11.png",
    resources: [
      "No resources available",
    ],
    features: [
      "Star rating component allows full and half star rating",
      "Developed using React and TailwindCSS",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
];
