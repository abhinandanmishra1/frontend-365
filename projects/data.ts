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
    resources: ["https://flowbite.com/docs/components/navbar/"],
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
    resources: ["https://flowbite.com/docs/components/modal/"],
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
    resources: ["https://uiverse.io/tooltips"],
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
    description:
      "Progress bar with different colors for different progress level",
    date: "2025-01-08",
    category: "Basic",
    component: "project8",
    image: "https://abhicdn.netlify.app/images/frontend-365-project8.png",
    resources: ["https://flowbite.com/docs/components/progress/"],
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
    resources: ["https://ui.shadcn.com/docs/components/tabs"],
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
    resources: ["https://ui.shadcn.com/docs/components/tabs"],
    features: [
      "Tabs component like shadcnui developed using React context concept",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 11,
    name: "Stars Component",
    description: "Star rating component allows full and half star rating both",
    date: "2025-01-11",
    category: "Basic",
    component: "project11",
    image: "https://abhicdn.netlify.app/images/frontend-365-project11.png",
    resources: ["No resources available"],
    features: [
      "Star rating component allows full and half star rating",
      "Developed using React and TailwindCSS",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 12,
    name: "Image carousel",
    description: "Image carousel with autoplay and custom duration",
    date: "2025-01-12",
    category: "Basic",
    component: "project12",
    image: "https://abhicdn.netlify.app/images/frontend-365-project12.png",
    resources: ["https://flowbite.com/docs/components/carousel/"],
    features: [
      "Image carousel with autoplay and custom duration",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 13,
    name: "Accessible Dropdown Component",
    description:
      "A fully accessible, animated dropdown menu component with keyboard navigation, ARIA support, and mobile responsiveness",
    date: "2025-01-13",
    category: "UI Components",
    component: "project13",
    image: "https://abhicdn.netlify.app/images/frontend-365-project13.png",
    resources: [
      "https://www.youtube.com/watch?v=S-VeYcOCFZw",
      "https://developer.mozilla.org/en-US/docs/Web/Accessibility",
      "https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/",
      "https://tailwindcss.com/docs/transition-property",
    ],
    features: [
      "Click outside detection to close dropdown",
      "Keyboard navigation with Escape/Enter key support",
      "ARIA attributes for accessibility",
      "Smooth animations and transitions",
      "Disabled state support for menu items",
      "Mobile-responsive design",
      "Modular component architecture",
      "Focus management for keyboard users",
    ],
    tags: [
      "accessibility",
      "animation",
      "ui-component",
      "keyboard-navigation",
      "mobile-friendly",
      "typescript",
    ],
    technologies: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    id: 14,
    name: "Search Suggestions",
    description: "Search suggestions with debounce and close on outside click",
    date: "2025-01-14",
    category: "UI Components",
    component: "project14",
    image: "https://abhicdn.netlify.app/images/frontend-365-project14.png",
    resources: ["https://serpapi.com/google-autocomplete-api"],
    features: [
      "Click outside detection to close dropdown",
      "Using google autocomplete API for fetching suggesstions",
      "Navigating through suggestions with arrow keys",
      "Debounce search input for performance",
    ],
    tags: ["accessibility"],
    technologies: ["React", "TypeScript", "TailwindCSS"],
  },
  {
    id: 15,
    name: "Light/Dark Mode Toggle",
    description: "Toggle between light and dark mode",
    date: "2025-01-15",
    category: "UI Components",
    component: "project15",
    image: "https://abhicdn.netlify.app/images/frontend-365-project15.png",
    resources: ["https://flowbite.com/docs/components/toggle/"],
    features: [
      "Toggle between light and dark mode",
      "Dynamic component, responsive and accessible",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 16,
    name: "Animated Loader",
    description: "Animated loader with customizable animation",
    date: "2025-01-16",
    category: "UI Components",
    component: "project16",
    image: "https://abhicdn.netlify.app/images/frontend-365-project16.png",
    resources: ["https://uiverse.io/loaders/"],
    features: ["Animated loader with multiple animation"],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 17,
    name: "Responsive Card",
    description: "Responsive card component with header, content and footer",
    date: "2025-01-17",
    category: "UI Components",
    component: "project17",
    image: "https://abhicdn.netlify.app/images/frontend-365-project17.png",
    resources: ["https://ui.shadcn.com/docs/components/card"],
    features: ["Responsive card with header, content and footer"],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 18,
    name: "Stepper Component",
    description: "Stepper component with dynamic steps and active step",
    date: "2025-01-18",
    category: "UI Components",
    component: "project18",
    image: "https://abhicdn.netlify.app/images/frontend-365-project18.png",
    resources: ["https://ui.shadcn.com/docs/components/stepper"],
    features: ["Stepper component with dynamic steps and active step"],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 19,
    name: "Skeleton Loader",
    description: "Skeleton loader for loading state of the component",
    date: "2025-01-19",
    category: "UI Components",
    component: "project19",
    image: "https://abhicdn.netlify.app/images/frontend-365-project19.png",
    resources: ["https://uiverse.io/loaders/"],
    features: ["Skeleton loader for loading state of the component"],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 20,
    name: "Sticky Header",
    description: "Sticky header component with dynamic content",
    date: "2025-01-20",
    category: "UI Components",
    component: "project20",
    image: "https://abhicdn.netlify.app/images/frontend-365-project20.png",
    resources: ["https://ui.shadcn.com/docs/components/header"],
    features: ["Sticky header component with dynamic content"],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 21,
    name: "Password Stength Checker",
    description: "Password strength checker with dynamic feedback",
    date: "2025-01-21",
    category: "UI Components",
    component: "project21",
    image: "https://abhicdn.netlify.app/images/frontend-365-project21.png",
    resources: ["https://ui.shadcn.com/docs/components/password-input"],
    features: ["Password strength checker with dynamic feedback"],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 22,
    name: "Circular Progress Bar",
    description: "Circular progress bar with dynamic animation",
    date: "2025-01-22",
    category: "UI Components",
    component: "project22",
    image: "https://abhicdn.netlify.app/images/frontend-365-project22.png",
    resources: ["https://www.30secondsofcode.org/css/s/circular-progress-bar/"],
    features: ["Circular progress bar with dynamic animation"],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 23,
    name: "Custom Range Slider",
    description:
      "Custom range slider that can have dynamic minimum and maximum range values",
    date: "2025-01-23",
    category: "UI Components",
    component: "project23",
    image: "https://abhicdn.netlify.app/images/frontend-365-project23.png",
    resources: [
      "https://overreacted.io/"
    ],
    features: [
      "Custom range slider that can have dynamic minimum and maximum range values",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 24,
    name: "Alert Component",
    description: "Alert component with different types of variants and types",
    date: "2025-01-24",
    category: "UI Components",
    component: "project24",
    image: "https://abhicdn.netlify.app/images/frontend-365-project24.png",
    resources: ["https://mui.com/material-ui/react-alert/"],
    features: [
      "Different types of alerts like success, error, warning and info",
      "Alerts can be dismissible or non-dismissible",
      "Custom icon and color for the alert",
      "Different variants like filled and outlined",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  },
  {
    id: 25,
    name: "Toast Message",
    description: "Toast message component with different types of variants and types",
    date: "2025-01-25",
    category: "UI Components",
    component: "project25",
    image: "https://abhicdn.netlify.app/images/frontend-365-project25.png",
    resources: [
      "https://blog.logrocket.com/how-to-create-custom-toast-component-react/",
      "https://github.com/c99rahul/react-toast"
    ],
    features: [
      "Different types of toast messages like success, error, warning and info",
      "Toast messages can be dismissible or non-dismissible",
      "Custom icon and color for the toast message",
      "Different variants like filled and outlined",
    ],
    tags: [],
    technologies: ["React", "TailwindCSS"],
  }
];
