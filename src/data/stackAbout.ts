import { getTechIcon } from "./techIcons";

export const stackAbout: string[] = [
  // Core Frameworks
  "Astro",
  "WordPress",

  // Frontend & Styling
  "Tailwind CSS",
  "TypeScript",
  "JavaScript",

  // Backend & CMS
  "PHP Custom",
  "Node.js",
  "Contentful",

  // E-commerce & Payments
  "WooCommerce",
  "Webpay Plus",
  "Cal.com API",

  // Marketing & Automation
  "Brevo CRM",
  "Google Tag Manager",
  "Google Analytics",

  // Design & Collaboration
  "Figma",
  "Notion",
  "Slack",
  "Linear",

  // Deployment & Hosting
  "Vercel",
  "AWS",
  "GitHub Actions",
  "Docker",
];

export const getStackIcon = (techName: string): string => {
  return getTechIcon(techName);
};
