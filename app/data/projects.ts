export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  images: string[];
  links: {
    label: string;
    url: string;
  }[];
}

/**
 * Sample project data — replace with your real projects.
 * Images use placeholder URLs; swap them for actual screenshots.
 */
export const SAMPLE_PROJECTS: Project[] = [
  {
    id: "interlink",
    name: "Interlink",
    tagline: "1st Place — Student Experience Track (400+ participants)",
    description:
      "Social platform that helps students find their people on campus. Enter your schedule, interests, hobbies, major, and classes — then get matched with compatible students in real time using semantic matching that understands what you actually mean, not just keyword overlap.",
    tags: ["React", "Express.js", "PostgreSQL", "Redis", "Gemini API"],
    images: [
      "https://placehold.co/640x360/1e2130/c9cbe4?text=Interlink+1&font=source-sans-pro",
      "https://placehold.co/640x360/1e2130/c9cbe4?text=Interlink+2&font=source-sans-pro",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/Bismithblde" },
    ],
  },
  {
    id: "flash",
    name: "Flash",
    tagline: "Live Lecture Quiz Generator",
    description:
      "Classroom tool that listens to a lecture in real time and turns it into instant quizzes. Teachers start a session before class, and all voice data is processed and stored on the fly. With one tap, a timed quiz is generated from what was just taught — weighted toward the most recent material — keeping students engaged and accountable.",
    tags: ["FastAPI", "Next.js", "Gemini API", "Supabase", "SQLite", "WebSockets"],
    images: [
      "https://placehold.co/640x360/1e2130/c9cbe4?text=Flash+1&font=source-sans-pro",
      "https://placehold.co/640x360/1e2130/c9cbe4?text=Flash+2&font=source-sans-pro",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/Bismithblde" },
    ],
  },
  {
    id: "profolio",
    name: "Profolio",
    tagline: "3D Portfolio Site",
    description:
      "Interactive portfolio built with Three.js CSS3DRenderer and GSAP. Navigate between full-screen pages in 3D space with smooth camera animations. Sharp text rendering across Chrome, Firefox, and Edge.",
    tags: ["Next.js", "Three.js", "GSAP", "TypeScript"],
    images: [
      "https://placehold.co/640x360/1e2130/c9cbe4?text=Profolio+1&font=source-sans-pro",
      "https://placehold.co/640x360/1e2130/c9cbe4?text=Profolio+2&font=source-sans-pro",
    ],
    links: [
      { label: "GitHub", url: "https://github.com/Bismithblde/profolio" },
    ],
  },
];
