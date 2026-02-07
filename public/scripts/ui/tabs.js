// src/scripts/ui/tabs.js

export function initTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  if (tabButtons.length === 0) return;

  function activateTab(targetId) {
    tabButtons.forEach(button => {
      const isActive = button.dataset.target === targetId;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', isActive);
    });

    tabPanels.forEach(panel => {
      const isActive = panel.id === targetId;
      panel.classList.toggle('hidden', !isActive);
      panel.classList.toggle('active', isActive);
    });
  }

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      activateTab(button.dataset.target);
    });
  });
}