/**
 * Portfolio V2 - Filtering System
 * Handles portfolio project filtering with smooth animations
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        initPortfolioFilter();
    });

    function initPortfolioFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        if (filterButtons.length === 0 || portfolioItems.length === 0) return;

        // Add click event to each filter button
        filterButtons.forEach(button => {
            button.addEventListener('click', function () {
                const filterValue = this.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Filter portfolio items
                filterPortfolioItems(filterValue, portfolioItems);
            });
        });
    }

    function filterPortfolioItems(filterValue, items) {
        items.forEach((item, index) => {
            // Skip confidential items - they should always remain hidden
            if (item.getAttribute('data-confidential') === 'true') {
                item.style.display = 'none';
                return;
            }

            // Add fade out animation
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';

            setTimeout(() => {
                if (filterValue === '*') {
                    // Show all items (except confidential)
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Show only matching items (except confidential)
                    if (item.classList.contains(filterValue.substring(1))) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }
            }, 300);
        });
    }

    // Add transition styles to portfolio items
    function addTransitionStyles() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        });
    }

    // Initialize transition styles
    addTransitionStyles();

})();
