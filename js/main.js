// --- Navbar Scroll Effect ---
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Booking Modal Logic ---
const modal = document.getElementById('bookingModal');
const openBtns = document.querySelectorAll('.open-booking');
const closeBtn = document.querySelector('.close-modal');
const steps = document.querySelectorAll('.booking-step');
const finalSubmit = document.getElementById('finalSubmit');

// Open Modal
openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
        nextStep(1); // Reset to step 1
    });
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Step Navigation
function nextStep(stepNumber) {
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(`step${stepNumber}`).classList.add('active');
}

// Global scope for onclick attributes in HTML
window.nextStep = nextStep;

// --- WhatsApp Booking Data Handling ---
finalSubmit.addEventListener('click', () => {
    // Get form values
    const service = document.getElementById('serviceType').value;
    const placement = document.getElementById('placement').value;
    const size = document.getElementById('size').value;
    const day = document.getElementById('preferredDay').value;
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const message = document.getElementById('additionalInfo').value;

    // Basic Validation
    if (!name || !phone) {
        alert("Please provide your name and phone number so we can reach you!");
        return;
    }

    // Construct WhatsApp Message
    const studioPhone = "9779800000000"; // Placeholder for the studio's WhatsApp number
    const text = `*New Booking Request from Website*%0A%0A` +
        `*Name:* ${name}%0A` +
        `*Phone:* ${phone}%0A` +
        `*Service:* ${service}%0A` +
        `*Placement:* ${placement || 'Not specified'}%0A` +
        `*Estimated Size:* ${size || 'Not specified'}%0A` +
        `*Preferred Time:* ${day}%0A` +
        `*Message:* ${message || 'None'}`;

    const whatsappUrl = `https://wa.me/${studioPhone}?text=${text}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Close modal after redirection
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// --- Mobile Navigation Toggle ---
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li a');

mobileToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    // Change icon between bars and times
    const icon = mobileToggle.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }
});

// Close menu when a link is clicked
navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    });
});
