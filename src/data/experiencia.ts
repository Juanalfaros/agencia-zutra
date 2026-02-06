import type { ImageMetadata } from 'astro';

// White Version (for Dark Mode)
import austromaqWhite from "../assets/img/logos/austromaq-white.svg";
import hummoWhite from "../assets/img/logos/hummo-white.svg";
import flipeameWhite from "../assets/img/logos/flipeame-white.svg";
import mfWhite from "../assets/img/logos/mf-white.svg";

// Black Version (for Light Mode)
import austromaqBlack from "../assets/img/logos/austromaq-black.svg";
import hummoBlack from "../assets/img/logos/hummo-black.svg";
import flipeameBlack from "../assets/img/logos/flipeame-black.svg";
import mfBlack from "../assets/img/logos/mf-black.svg";

export interface Logo {
    darkSrc: ImageMetadata;  // Version for Dark Theme (White logo)
    lightSrc: ImageMetadata; // Version for Light Theme (Black logo)
    alt: string;
}

export const experienceLogos: Logo[] = [
    { darkSrc: austromaqWhite, lightSrc: austromaqBlack, alt: "Austromaq" },
    { darkSrc: hummoWhite, lightSrc: hummoBlack, alt: "Hummo" },
    { darkSrc: flipeameWhite, lightSrc: flipeameBlack, alt: "Flipeame" },
    { darkSrc: mfWhite, lightSrc: mfBlack, alt: "MF" },
];
