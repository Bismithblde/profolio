import { CardPosition } from "@/app/components/three";

export interface PageConfig {
  id: string;
  position: CardPosition;
  navButton?: {
    targetPageId: string;
    buttonId: string;
  };
}

/**
 * Centralized page registry for 3D portfolio
 * Add new pages here with their positions and navigation config
 */
export const PAGE_CONFIGS: PageConfig[] = [
  {
    id: "landing",
    position: { x: 0, y: 0, z: 0 },
    navButton: {
      targetPageId: "projects",
      buttonId: "btn-to-page2",
    },
  },
  {
    id: "projects",
    position: { x: -6000, y: 0, z: -2000 },
    navButton: {
      targetPageId: "landing",
      buttonId: "btn-to-page1",
    },
  },
];

/**
 * Get page config by ID
 */
export const getPageConfig = (id: string): PageConfig | undefined => {
  return PAGE_CONFIGS.find((page) => page.id === id);
};

/**
 * Get page index by ID
 */
export const getPageIndex = (id: string): number => {
  return PAGE_CONFIGS.findIndex((page) => page.id === id);
};
