import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once centrally
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
export default gsap;
