const palettes = [
  { main: '#EFD319', hover: '#FACC15', onAccent: '#080501' }, // Amarillo
  { main: '#19EFB5', hover: '#15C999', onAccent: '#080501' }, // Verde Menta
  { main: '#FF0055', hover: '#D6004C', onAccent: '#ffffff' }, // Magenta
  { main: '#811DBC', hover: '#6A169E', onAccent: '#ffffff' }  // Púrpura
];

export function injectGlobalStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById('zutra-global-styles')) return;

  const randomPalette = palettes[Math.floor(Math.random() * palettes.length)];
  const root = document.documentElement;
  root.style.setProperty('--zutra-accent', randomPalette.main);
  root.style.setProperty('--zutra-accent-hover', randomPalette.hover);
  root.style.setProperty('--zutra-on-accent', randomPalette.onAccent);

  const style = document.createElement('style');
  style.id = 'zutra-global-styles';
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800;12..96,900&family=Outfit:wght@400;500;600;700&display=swap');
    
    :root {
      --font-family-base: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif !important;
      --font-family-heading: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif !important;
      --font-family-monospace: 'JetBrains Mono', ui-monospace, monospace !important;
    }

    [data-ui="ThemeProvider"] {
      --font-family-base: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif !important;
      --font-family-heading: 'Bricolage Grotesque', ui-sans-serif, system-ui, sans-serif !important;
    }

    [data-ui="ThemeProvider"],
body {
  background-color: #080501 !important;
}


    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--card-border-color, #444);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: var(--zutra-accent, #555);
    }

    [data-ui="Button"][data-tone="primary"] {
      background-color: var(--zutra-accent) !important;
      color: var(--zutra-on-accent) !important;
    }
    [data-ui="Button"][data-tone="primary"]:hover {
      background-color: var(--zutra-accent-hover) !important;
    }
    
    [data-ui="Switch"][data-checked="true"] {
      background-color: var(--zutra-accent) !important;
    }
    [data-ui="Checkbox"][data-checked="true"] {
      background-color: var(--zutra-accent) !important;
      border-color: var(--zutra-accent) !important;
      color: var(--zutra-on-accent) !important;
    }

    *:focus-visible {
      box-shadow: 0 0 0 1px var(--card-bg-color), 0 0 0 3px var(--zutra-accent) !important;
    }
  `;
  document.head.appendChild(style);
}
