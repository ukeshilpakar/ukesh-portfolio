document.addEventListener("DOMContentLoaded", function() {

    /* --- Theme Toggler Logic --- */
    const htmlElement = document.documentElement;
    const themeToggles = [
        { btn: document.getElementById('theme-toggle'), icon: document.getElementById('theme-icon') },
        { btn: document.getElementById('theme-toggle-mobile'), icon: document.getElementById('theme-icon-mobile') }
    ];
    
    // Check local storage or system preference
    const currentTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let isDark = currentTheme === 'dark' || (!currentTheme && systemPrefersDark);

    function applyTheme() {
        if (isDark) {
            htmlElement.classList.add('dark');
            htmlElement.classList.remove('light');
            themeToggles.forEach(t => {
                if(t.icon) {
                    t.icon.classList.remove('ph-moon');
                    t.icon.classList.add('ph-sun');
                }
            });
        } else {
            htmlElement.classList.add('light');
            htmlElement.classList.remove('dark');
            themeToggles.forEach(t => {
                if(t.icon) {
                    t.icon.classList.remove('ph-sun');
                    t.icon.classList.add('ph-moon');
                }
            });
        }
    }

    // Initialize Theme
    applyTheme();

    // Add click listeners to both desktop and mobile buttons
    themeToggles.forEach(t => {
        if (t.btn) {
            t.btn.addEventListener('click', () => {
                isDark = !isDark;
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
                applyTheme();
            });
        }
    });


    /* --- Terminal Decryption Loader --- */
    const loader = document.getElementById('loader');
    const loaderText = document.getElementById('loader-text');
    const mainContent = document.querySelector('.fade-in-section');

    const targetText = "Ukesh Shilpakar";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\";
    let iteration = 0;
    
    // Start animation slightly after load
    setTimeout(() => {
        const interval = setInterval(() => {
            loaderText.innerText = targetText.split("").map((letter, index) => {
                if(index < iteration) {
                    return targetText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            }).join("");
            
            if(iteration >= targetText.length) { 
                clearInterval(interval);
                
                // Pause on the resolved text, then fade out
                setTimeout(() => {
                    loader.style.opacity = '0';
                    document.body.classList.add('loaded');
                    
                    if(mainContent) {
                        mainContent.classList.add('visible');
                    }

                    setTimeout(() => {
                        loader.style.display = 'none';
                    }, 700);

                }, 800);
            }
            
            iteration += 1 / 3; // Controls speed of resolution
        }, 30);
    }, 200);

    /* --- Modal Logic --- */
    const modalBackdrop = document.getElementById('modal-backdrop');
    const projectBtns = document.querySelectorAll('.project-btn');
    const modalCloseBtns = document.querySelectorAll('.modal-close');
    let activeModal = null;

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (!modal) return;
        
        activeModal = modal;
        // Show backdrop
        modalBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        modalBackdrop.classList.add('opacity-100', 'pointer-events-auto');
        
        // Show modal
        modal.classList.remove('opacity-0', 'pointer-events-none', 'scale-95');
        modal.classList.add('opacity-100', 'pointer-events-auto', 'scale-100');
        
        // Lock body scroll
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        if (!activeModal) return;
        
        // Hide backdrop
        modalBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
        modalBackdrop.classList.add('opacity-0', 'pointer-events-none');
        
        // Hide modal
        activeModal.classList.remove('opacity-100', 'pointer-events-auto', 'scale-100');
        activeModal.classList.add('opacity-0', 'pointer-events-none', 'scale-95');
        
        activeModal = null;
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    projectBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    modalBackdrop.addEventListener('click', closeModal);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

});
