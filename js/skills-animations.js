/**
 * Portfolio V2 - Skills Animations
 * Handles animated counters and skill bar animations
 */

(function () {
    'use strict';

    // Wait for DOM to be ready
    document.addEventListener('DOMContentLoaded', function () {
        initSkillsAnimations();
    });

    function initSkillsAnimations() {
        // Animate achievement counters
        animateCounters();

        // Animate skill bars on scroll
        animateSkillBars();
    }

    function animateCounters() {
        const counters = document.querySelectorAll('.achievement-number');

        if (counters.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    let current = 0;

                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };

                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-fill');

        if (skillBars.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.getAttribute('data-width');

                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 200);

                    observer.unobserve(bar);
                }
            });
        }, observerOptions);

        skillBars.forEach(bar => observer.observe(bar));
    }

})();
