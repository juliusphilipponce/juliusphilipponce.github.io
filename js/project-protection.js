document.addEventListener('DOMContentLoaded', function () {
    // Select all confidential images and their wrappers
    const protectedElements = document.querySelectorAll('[data-confidential="true"] img, .confidential-blur');

    protectedElements.forEach(element => {
        // Disable right-click context menu
        element.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            return false;
        });

        // Disable drag and drop
        element.addEventListener('dragstart', function (e) {
            e.preventDefault();
            return false;
        });

        // Disable selection
        element.style.userSelect = 'none';
        element.style.webkitUserSelect = 'none';
        element.style.mozUserSelect = 'none';
        element.style.msUserSelect = 'none';
    });

    // Optional: Add a transparent overlay to block direct interaction if needed
    // This is handled by the existing .portfolio-overlay, but we ensure it catches clicks
    const overlays = document.querySelectorAll('[data-confidential="true"] .portfolio-overlay');
    overlays.forEach(overlay => {
        overlay.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            return false;
        });
    });
});
