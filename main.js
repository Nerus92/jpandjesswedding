"use strict";
/* Countdown */
const wedding_date = new Date("2025-06-13T18:00:00+02:00");
function updateCountdown() {
    const now = new Date().getTime();
    const timeRemaining = wedding_date.getTime() - now;
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const formatNumber = (num) => num.toString().padStart(2, '0');
        countdownElement.textContent = `${formatNumber(days)} : ${formatNumber(hours)} : ${formatNumber(minutes)} : ${formatNumber(seconds)}`;
    }
}
// Update the countdown every second
setInterval(updateCountdown, 1000);
// Initial call to display the countdown immediately
updateCountdown();
/* Navigation Indicator */
// Get all sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar a');
const indicator = document.querySelector('#nav-indicator');
const updateActiveLink = () => {
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.scrollY;
        if (scrollPosition >= sectionTop - sectionHeight / 2 &&
            scrollPosition < sectionTop + sectionHeight / 2) {
            // Add active class to current section's link
            const correspondingLink = document.querySelector(`#navbar a[href="#${section.id}"]`);
            if (correspondingLink && indicator) {
                // Update indicator position and width
                const linkRect = correspondingLink.getBoundingClientRect();
                indicator.style.width = `${linkRect.width}px`;
                indicator.style.left = `${linkRect.left}px`;
                correspondingLink.classList.add('selected'); // Keep any other active states you want
                // Remove active class from all links
                navLinks.forEach(link => {
                    if (link !== correspondingLink) {
                        link.classList.remove('selected');
                    }
                });
            }
        }
    });
};
// Initialize indicator position on page load
window.addEventListener('load', () => {
    const firstLink = document.querySelector('#navbar a');
    if (firstLink && indicator) {
        const linkRect = firstLink.getBoundingClientRect();
        indicator.style.width = `${linkRect.width}px`;
        indicator.style.left = `${linkRect.left}px`;
    }
});
// Update indicator position on window resize
window.addEventListener('resize', updateActiveLink);
// Add scroll event listener
window.addEventListener('scroll', updateActiveLink);
// Run once on page load
updateActiveLink();
/* RSVP Modal */
const rsvpButtons = document.querySelectorAll('#rsvp-button');
const rsvpModal = document.getElementById('rsvp-modal');
const waitButton = document.getElementById('wait-button');
const readyButton = document.getElementById('ready-button');
const RSVP_URL = 'https://jessica-and-jean-philippe.thatstheone.com/rsvp';
rsvpButtons?.forEach(button => {
    button?.addEventListener('click', (e) => {
        e.preventDefault();
        rsvpModal?.classList.remove('hidden');
        // Small delay to ensure the display: none is removed before starting the fade
        requestAnimationFrame(() => {
            rsvpModal?.classList.add('visible');
        });
    });
});
waitButton?.addEventListener('click', () => {
    rsvpModal?.classList.remove('visible');
    // Wait for fade out animation to complete before hiding
    setTimeout(() => {
        rsvpModal?.classList.add('hidden');
    }, 300); // Match this with the CSS transition duration (0.3s = 300ms)
});
readyButton?.addEventListener('click', () => {
    rsvpModal?.classList.remove('visible');
    setTimeout(() => {
        window.open(RSVP_URL, '_blank'); // This will open in a new tab
    }, 300);
});
const initApp = () => {
    const hamburgerBtn = document.getElementById('hamburger-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const toggleMenu = () => {
        mobileMenu?.classList.toggle('hidden');
        mobileMenu?.classList.toggle('flex');
        hamburgerBtn?.classList.toggle('toggle-btn');
    };
    hamburgerBtn?.addEventListener('click', toggleMenu);
    mobileMenu?.addEventListener('click', toggleMenu);
};
document.querySelectorAll('.collapsible-header').forEach(button => {
    button.addEventListener('click', () => {
        const section = button.parentElement;
        section?.classList?.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', initApp);
