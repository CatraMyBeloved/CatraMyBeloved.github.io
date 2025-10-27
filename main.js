document.getElementById('year').textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-dialog]').forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            const dialogId = btn.getAttribute('data-dialog');
            const dialog = document.getElementById(dialogId);

            if (dialog) {
                dialog.showModal();
                document.body.style.overflow = 'hidden';

                const closeBtn = dialog.querySelector('[data-close]');
                if (closeBtn) closeBtn.focus();

                const handleClose = () => {
                    document.body.style.overflow = '';
                    btn.focus();
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
        dialog.addEventListener('click', event => {
            const rect = dialog.getBoundingClientRect();
            const isInDialog = rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
                rect.left <= event.clientX && event.clientX <= rect.left + rect.width;
            if (!isInDialog) {
                dialog.close();
            }
        });
    });

    // Escape key handling
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            const openDialog = document.querySelector('dialog[open]');
            if (openDialog) openDialog.close();
        }
    });
});
