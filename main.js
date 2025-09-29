
    // Current year
    document.getElementById('y').textContent = new Date().getFullYear();

    // Back to top button
    const toTop = document.createElement('button');
    toTop.textContent = '↑ Top';
    toTop.className = 'btn to-top';
    document.body.appendChild(toTop);
    window.addEventListener('scroll', () => {
        if (window.scrollY > 600) toTop.classList.add('show'); else toTop.classList.remove('show');
    });
    toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Smooth anchor scrolling with header offset
    const headerEl = document.querySelector('header');
    const headerH = () => (headerEl ? headerEl.offsetHeight : 0);
    document.querySelectorAll('nav a[href^="#"]').forEach(a => {
        a.addEventListener('click', (e) => {
            const hash = a.getAttribute('href');
            if (!hash || hash.length < 2) return;
            const target = document.querySelector(hash);
            if (!target) return;
            e.preventDefault();
            const y = target.getBoundingClientRect().top + window.scrollY - headerH() - 8;
            window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
            history.pushState(null, '', hash);
        });
    });

    // Nav active highlighting while scrolling
    const navMap = Array.from(document.querySelectorAll('nav a[href^="#"]'))
        .reduce((m, a) => (m.set(a.getAttribute('href'), a), m), new Map());
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const id = '#' + entry.target.id;
            const link = navMap.get(id);
            if (link) {
                if (entry.isIntersecting) link.classList.add('active');
                else link.classList.remove('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
    ['projects','other-projects','skills','values','contact'].forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    // Enhanced dialog handling
    document.addEventListener('DOMContentLoaded', function() {
        // Open dialog
        document.querySelectorAll('[data-dialog]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const dialogId = btn.getAttribute('data-dialog');
                const dialog = document.getElementById(dialogId);

                if (dialog) {
                    dialog.showModal();
                    document.body.style.overflow = 'hidden';

                    // Focus the close button
                    const closeBtn = dialog.querySelector('[data-close]');
                    if (closeBtn) closeBtn.focus();

                    // Set up one-time close handler
                    const handleClose = () => {
                        document.body.style.overflow = '';
                        btn.focus(); // Return focus to trigger button
                        dialog.removeEventListener('close', handleClose);
                    };
                    dialog.addEventListener('close', handleClose);
                }
            });
        });

        // Close dialog buttons
        document.querySelectorAll('[data-close]').forEach(btn => {
            btn.addEventListener('click', () => {
                const dialog = btn.closest('dialog');
                if (dialog) dialog.close();
            });
        });

        // Close on backdrop click
        document.querySelectorAll('dialog').forEach(dialog => {
            dialog.addEventListener('click', (e) => {
                const rect = dialog.getBoundingClientRect();
                const isInDialog = (
                    rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
                    rect.left <= e.clientX && e.clientX <= rect.left + rect.width
                );
                if (!isInDialog) {
                    dialog.close();
                }
            });
        });

        // Keyboard handling
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openDialog = document.querySelector('dialog[open]');
                if (openDialog) openDialog.close();
            }
        });
    });
