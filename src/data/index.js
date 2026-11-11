export * from './activitiesData.js';
export * from './projectsData.js';
export * from './eventsData.js';
export * from './achievementsData.js';
export * from './publicationsData.js';
export * from './teamData.js';
export * from './galleryData.js';

// Backwards-compatible aliases if needed:
import { activities } from './activitiesData.js';
import { projects } from './projectsData.js';
import { events } from './eventsData.js';
import { galleryItems } from './galleryData.js';

export const gallery = galleryItems.map(item => ({
  image: item.image,
  title: item.title,
  plate: item.plate,
  category: item.category,
}));
