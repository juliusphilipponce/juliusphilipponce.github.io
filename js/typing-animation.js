/**
 * Portfolio V2 - Typing Animation
 * Displays rotating text showcasing different specializations
 */

(function () {
    'use strict';

    // Typing animation configuration
    const typedTextElement = document.getElementById('typed-text');

    if (!typedTextElement) return;

    const textArray = [
        'E-commerce Plugin Specialist',
        'Full-stack PHP Developer',
        'WordPress Expert',
        'Payment Gateway Integration Specialist',
        'AWS Solutions Architect'
    ];

    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000; // Delay between current and next text
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextElement.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextElement.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    // Start the typing animation after page load
    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // Animate badges on scroll
    function animateBadges() {
        const badges = document.querySelectorAll('.badge-item');

        badges.forEach((badge, index) => {
            badge.style.animationDelay = `${0.8 + (index * 0.1)}s`;
        });
    }

    // Initialize animations
    document.addEventListener('DOMContentLoaded', function () {
        animateBadges();
    });

})();
