// script.js

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const navLinks = document.querySelector('.nav-links');
const toggleButton = document.createElement('button');
toggleButton.innerHTML = 'Menu';
toggleButton.classList.add('menu-toggle');
document.querySelector('nav').appendChild(toggleButton);

toggleButton.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Simple form validation for contact section
document.querySelector('#contact-form').addEventListener('submit', function (e) {
    const email = document.querySelector('#email').value;
    const message = document.querySelector('#message').value;

    if (!email || !message) {
        e.preventDefault();
        alert('Please fill in all fields.');
    }
});
