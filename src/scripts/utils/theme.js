// src/scripts/utils/theme.js

const updateFavicon = (color) => {
  const faviconLink = document.getElementById('dynamic-favicon');
  if (!faviconLink) return;

  const svgTemplate = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.79 93.73">
      <defs><style>.cls-1{fill:${color};}.cls-2{fill:#fff8e0;}</style></defs>
      <g>
        <path class="cls-1" d="M74.68,42.11l-24.86,19.05c-.57.44-.9.89-.9,1.23s.1.44,1,.44h49.93c.64-4.63.93-9.92.93-15.97C100.79,7.58,88.36,0,50.4,0S0,7.58,0,46.86s12.43,46.87,50.4,46.87c23.86,0,37.64-3.01,44.58-14.99H29.78c-5.6,0-9.75-4.37-9.75-11.42,0-5.82,2.02-8.86,5.48-11.54l25.65-19.59c.56-.45.89-.79.89-1.01,0-.34-.34-.56-1.11-.56h-20.12c-4.78,0-8.66-3.88-8.66-8.66v-6.57h46.92c6.5,0,10.98,3.81,10.98,10.87,0,6.61-2.7,9.74-5.38,11.86Z"/>
        <path class="cls-2" d="M99.86,62.83c-.89,6.55-2.48,11.76-4.89,15.91H29.78c-5.6,0-9.75-4.37-9.75-11.42,0-5.82,2.02-8.86,5.48-11.54l25.65-19.59c.56-.45.89-.79.89-1.01,0-.34-.34-.56-1.11-.56h-20.12c-4.78,0-8.66-3.88-8.66-8.66v-6.57h46.92c6.5,0,10.98,3.81,10.98,10.87,0,6.61-2.7,9.74-5.38,11.86l-24.86,19.05c-.57.44-.9.89-.9,1.23s.1.44,1,.44h49.93Z"/>
      </g>
    </svg>`;

  const encodedSvg = encodeURIComponent(svgTemplate.trim());
  faviconLink.href = `data:image/svg+xml,${encodedSvg}`;
};

export function setRandomTheme() {
  const palettes = [
    { main: '#EFD319', hover: '#FACC15', onAccent: '#080501' }, // Amarillo
    { main: '#19EFB5', hover: '#15C999', onAccent: '#080501' }, // Verde Menta
    { main: '#FF0055', hover: '#D6004C', onAccent: '#ffffff' }, // Magenta
    { main: '#811DBC', hover: '#6A169E', onAccent: '#ffffff' }  // Púrpura
  ];

  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];

  const root = document.documentElement;
  // Seteamos variables base para que el CSS pueda manipularlas según el tema
  root.style.setProperty('--accent-main', randomPalette.main);
  root.style.setProperty('--accent-hover', randomPalette.hover);
  root.style.setProperty('--color-on-accent', randomPalette.onAccent);
  updateFavicon(randomPalette.main);
}