// Classe do Modal
class Modal {
    constructor() {
        this.createModal();
        this.bindEvents();
        this.activeModal = null;
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title"></h2>
                    <button class="modal-close" aria-label="Fechar">×</button>
                </div>
                <div class="modal-content"></div>
            </div>
        `;
        document.body.appendChild(modal);
        
        this.modal = modal;
        this.overlay = modal.querySelector('.modal-overlay');
        this.container = modal.querySelector('.modal-container');
        this.closeBtn = modal.querySelector('.modal-close');
        this.title = modal.querySelector('.modal-title');
        this.content = modal.querySelector('.modal-content');
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', () => this.close());
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.activeModal) {
                this.close();
            }
        });

        // Prevenir scroll do body quando modal estiver aberto
        this.modal.addEventListener('wheel', (e) => {
            if (!this.container.contains(e.target)) {
                e.preventDefault();
            }
        });
    }

    open(id) {
        const data = modalData[id];
        if (!data) return;

        this.activeModal = id;
        this.title.textContent = data.title;
        this.content.innerHTML = data.content;
        
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Reset scroll position
        this.container.scrollTop = 0;

        // Animação de entrada
        requestAnimationFrame(() => {
            this.container.style.opacity = '1';
            this.container.style.transform = 'translateY(0)';
        });
    }

    close() {
        if (!this.activeModal) return;

        this.container.style.opacity = '0';
        this.container.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            this.activeModal = null;
        }, 200);
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    const modal = new Modal();

    // Adiciona listeners aos botões de informação
    document.querySelectorAll('[data-modal]').forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.dataset.modal;
            modal.open(modalId);
        });
    });

    // Observer para animações de entrada
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        },
        { threshold: 0.1 }
    );

    // Observa elementos para animação
    document.querySelectorAll('.care-card, .step, .stat-box').forEach(el => {
        observer.observe(el);
    });
});

// Sistema de Analytics (opcional)
const trackModalOpen = (modalId) => {
    if (window.gtag) {
        gtag('event', 'modal_open', {
            'modal_id': modalId
        });
    }
};