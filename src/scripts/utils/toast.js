/**
 * Sistema de notificaciones Toast para Zutra
 */

export const toast = {
    containerId: 'toaster-container',

    getContainer() {
        let container = document.getElementById(this.containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = this.containerId;
            container.className = 'toaster-container';
            document.body.appendChild(container);
        }
        return container;
    },

    show({ title, message, type = 'success', duration = 5000 }) {
        const container = this.getContainer();
        const toastEl = document.createElement('div');
        toastEl.className = `toast toast--${type}`;

        const icons = {
            success: 'ph-duotone ph-check-circle',
            error: 'ph-duotone ph-warning-circle',
            info: 'ph-duotone ph-info',
            warning: 'ph-duotone ph-warning'
        };

        toastEl.innerHTML = `
      <i class="${icons[type]} toast__icon"></i>
      <div class="toast__content">
        ${title ? `<span class="toast__title">${title}</span>` : ''}
        <p class="toast__message">${message}</p>
      </div>
    `;

        container.appendChild(toastEl);

        // Trigger animation
        requestAnimationFrame(() => {
            toastEl.classList.add('toast--active');
        });

        // Auto remove
        const timeout = setTimeout(() => {
            this.remove(toastEl);
        }, duration);

        // Click to remove
        toastEl.addEventListener('click', () => {
            clearTimeout(timeout);
            this.remove(toastEl);
        });
    },

    remove(toastEl) {
        toastEl.classList.remove('toast--active');
        toastEl.classList.add('toast--removing');
        toastEl.addEventListener('transitionend', () => {
            toastEl.remove();
        }, { once: true });
    },

    // Shortcuts
    success(message, title = '¡Éxito!') { this.show({ message, title, type: 'success' }); },
    error(message, title = 'Error') { this.show({ message, title, type: 'error' }); },
    info(message, title = 'Información') { this.show({ message, title, type: 'info' }); },
    warning(message, title = 'Aviso') { this.show({ message, title, type: 'warning' }); }
};

// Hacerlo disponible globalmente para scripts inline si es necesario
if (typeof window !== 'undefined') {
    window.zToast = toast;
}
