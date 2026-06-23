// Monitor dynamic header state tracking adjustments
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        header.style.padding = '15px 40px';
        header.style.backgroundColor = '#0f172a';
    } else {
        header.style.padding = '20px 40px';
        header.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
    }
});

// Simple local contact form submit validation hooks handler
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Hold target action default dispatch away
    
    const nameValue = document.getElementById('name').value;
    alert(`Thank you for reaching out, ${nameValue}! Your mock form entry has been submitted.`);
    
    contactForm.reset();
});