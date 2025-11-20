// ========================================
// Initialize AOS (Animate On Scroll)
// ========================================
AOS.init({
  duration: 1000,
  easing: "ease-out-cubic",
  once: true,
  offset: 50,
  mirror: false,
  anchorPlacement: "top-bottom",
});

// ========================================
// Dark Mode Toggle
// ========================================
const themeToggle = document.getElementById("themeToggle");
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem("theme") || "light";
html.setAttribute("data-theme", currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";

  html.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector("i");
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a nav link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// ========================================
// Sticky Navbar
// ========================================
const navbar = document.getElementById("navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

function updateActiveLink() {
  const scrollPosition = window.pageYOffset + 150;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");

    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offsetTop = targetElement.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// ========================================
// Typing Effect for Hero Section
// ========================================
const typedTextElement = document.getElementById("typedText");
const textArray = [
  "AI Enthusiast",
  "ML Learner",
  "Cybersecurity Explorer",
  "Web Developer",
  "Problem Solver",
];
let textArrayIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 150;
let erasingDelay = 100;
let newTextDelay = 2000;

function type() {
  const currentText = textArray[textArrayIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typingDelay = erasingDelay;
  } else {
    typedTextElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typingDelay = 150;
  }

  if (!isDeleting && charIndex === currentText.length) {
    typingDelay = newTextDelay;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textArrayIndex = (textArrayIndex + 1) % textArray.length;
    typingDelay = 500;
  }

  setTimeout(type, typingDelay);
}

// Start typing effect after page load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(type, 1000);
});

// ========================================
// Counter Animation for About Stats
// ========================================
const statNumbers = document.querySelectorAll(".stat-number");
let hasAnimated = false;

function animateStats() {
  if (hasAnimated) return;

  const aboutSection = document.getElementById("about");
  const aboutPosition = aboutSection.getBoundingClientRect().top;
  const screenPosition = window.innerHeight / 1.3;

  if (aboutPosition < screenPosition) {
    hasAnimated = true;

    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-target"));
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        current += increment;

        if (current < target) {
          stat.textContent = Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          stat.textContent = target;
        }
      };

      updateCounter();
    });
  }
}

window.addEventListener("scroll", animateStats);

// ========================================
// Project Modal Functionality
// ========================================
const projectModal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");

// Project data for modals
const projectData = {
  project1: {
    title: "E-Commerce Platform",
    image: "assets/images/project1.jpg",
    description:
      "A comprehensive e-commerce platform built with modern technologies, featuring user authentication, product management, shopping cart functionality, and secure payment processing.",
    features: [
      "User authentication and authorization",
      "Product catalog with search and filters",
      "Shopping cart and wishlist",
      "Stripe payment integration",
      "Order tracking and management",
      "Admin dashboard for inventory",
      "Responsive design for all devices",
      "Real-time notifications",
    ],
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux",
      "Stripe API",
      "JWT",
    ],
    liveDemo: "https://demo-link.com",
    github: "https://github.com/yourusername/project",
  },
  project2: {
    title: "Task Management App",
    image: "assets/images/project2.jpg",
    description:
      "A collaborative task management application with real-time updates, allowing teams to organize, prioritize, and track their work efficiently.",
    features: [
      "Drag-and-drop task organization",
      "Real-time collaboration",
      "Team member management",
      "Due dates and reminders",
      "File attachments",
      "Activity timeline",
      "Custom labels and tags",
      "Dark mode support",
    ],
    technologies: [
      "JavaScript",
      "Firebase",
      "Tailwind CSS",
      "DnD Kit",
      "React",
    ],
    liveDemo: "https://demo-link.com",
    github: "https://github.com/yourusername/project",
  },
  project3: {
    title: "Weather Dashboard",
    image: "assets/images/project3.jpg",
    description:
      "An interactive weather application providing accurate weather data, forecasts, and beautiful visualizations for locations worldwide.",
    features: [
      "Current weather conditions",
      "7-day weather forecast",
      "Hourly temperature charts",
      "Location search and favorites",
      "Weather maps and radar",
      "Severe weather alerts",
      "UV index and air quality",
      "Beautiful animations",
    ],
    technologies: ["React", "OpenWeather API", "Chart.js", "CSS3", "Axios"],
    liveDemo: "https://demo-link.com",
    github: "https://github.com/yourusername/project",
  },
  project4: {
    title: "Portfolio Generator",
    image: "assets/images/project4.jpg",
    description:
      "A dynamic portfolio generator that helps developers create personalized portfolio websites quickly with multiple themes and customization options.",
    features: [
      "Multiple professional themes",
      "Drag-and-drop editor",
      "Custom color schemes",
      "Project showcase templates",
      "Contact form integration",
      "SEO optimization",
      "Export to HTML/CSS",
      "Hosting integration",
    ],
    technologies: ["Python", "Flask", "Bootstrap", "SQLite", "Jinja2"],
    liveDemo: "https://demo-link.com",
    github: "https://github.com/yourusername/project",
  },
  project5: {
    title: "Real-Time Chat App",
    image: "assets/images/project5.jpg",
    description:
      "A feature-rich real-time messaging application with private chats, group conversations, and multimedia sharing capabilities.",
    features: [
      "Real-time messaging",
      "Private and group chats",
      "File and image sharing",
      "Typing indicators",
      "Read receipts",
      "User presence status",
      "Message reactions",
      "Push notifications",
    ],
    technologies: ["Socket.io", "Express", "React", "MongoDB", "Node.js"],
    liveDemo: "https://demo-link.com",
    github: "https://github.com/yourusername/project",
  },
  project6: {
    title: "ML Model Deployment",
    image: "assets/images/project6.jpg",
    description:
      "A machine learning project featuring image classification with a user-friendly web interface and RESTful API endpoints.",
    features: [
      "Image classification model",
      "REST API endpoints",
      "Batch processing support",
      "Model performance metrics",
      "Interactive web interface",
      "Docker containerization",
      "CI/CD pipeline",
      "Comprehensive documentation",
    ],
    technologies: [
      "Python",
      "TensorFlow",
      "Docker",
      "Flask",
      "NumPy",
      "Pandas",
    ],
    liveDemo: "https://demo-link.com",
    github: "https://github.com/yourusername/project",
  },
};

function openModal(projectId) {
  const project = projectData[projectId];

  if (!project) return;

  modalBody.innerHTML = `
        <img src="${project.image}" alt="${project.title}" 
             style="width: 100%; border-radius: 12px; margin-bottom: 24px;"
             onerror="this.src='https://via.placeholder.com/800x400/0A0A0A/D4AF37?text=${encodeURIComponent(
               project.title
             )}'">
        <h2 style="font-size: 2rem; margin-bottom: 16px; color: var(--text-primary);">${
          project.title
        }</h2>
        <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 24px;">${
          project.description
        }</p>
        
        <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--text-primary);">Key Features</h3>
        <ul style="color: var(--text-secondary); margin-bottom: 24px; padding-left: 20px;">
            ${project.features
              .map(
                (feature) => `<li style="margin-bottom: 8px;">${feature}</li>`
              )
              .join("")}
        </ul>
        
        <h3 style="font-size: 1.5rem; margin-bottom: 16px; color: var(--text-primary);">Technologies Used</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px;">
            ${project.technologies
              .map(
                (tech) => `
                <span style="background-color: var(--bg-secondary); color: var(--primary-color); 
                      padding: 6px 12px; border-radius: 20px; font-size: 0.875rem; font-weight: 600;">
                    ${tech}
                </span>
            `
              )
              .join("")}
        </div>
        
        <div style="display: flex; gap: 16px; margin-top: 32px;">
            <a href="${
              project.liveDemo
            }" target="_blank" class="btn btn-primary">
                <span>Live Demo</span>
                <i class="fas fa-external-link-alt"></i>
            </a>
            <a href="${
              project.github
            }" target="_blank" class="btn btn-secondary">
                <span>View Code</span>
                <i class="fab fa-github"></i>
            </a>
        </div>
    `;

  projectModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  projectModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close modal when clicking outside
projectModal.addEventListener("click", (e) => {
  if (
    e.target === projectModal ||
    e.target.classList.contains("modal-overlay")
  ) {
    closeModal();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectModal.classList.contains("active")) {
    closeModal();
  }
});

// ========================================
// Contact Form Handling with EmailJS
// ========================================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  // Disable submit button
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const originalButtonText = submitButton.innerHTML;
  submitButton.innerHTML =
    '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  submitButton.disabled = true;

  try {
    // Simulate form submission (replace with actual EmailJS or backend API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    formMessage.className = "form-message success";
    formMessage.innerHTML =
      '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully. I\'ll get back to you soon!';

    // Reset form
    contactForm.reset();

    // Hide message after 5 seconds
    setTimeout(() => {
      formMessage.style.display = "none";
    }, 5000);
  } catch (error) {
    // Show error message
    formMessage.className = "form-message error";
    formMessage.innerHTML =
      '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again or email me directly.';
  } finally {
    // Re-enable submit button
    submitButton.innerHTML = originalButtonText;
    submitButton.disabled = false;
  }
});

// ========================================
// EmailJS Integration (Optional)
// To use EmailJS, uncomment and configure:
// ========================================
/*
// Initialize EmailJS with your User ID
emailjs.init("YOUR_USER_ID");

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitButton.disabled = true;
    
    try {
        await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm);
        
        formMessage.className = 'form-message success';
        formMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent successfully.';
        contactForm.reset();
        
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
        
    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.innerHTML = '<i class="fas fa-exclamation-circle"></i> Oops! Something went wrong. Please try again.';
    } finally {
        submitButton.innerHTML = originalButtonText;
        submitButton.disabled = false;
    }
});
*/

// ========================================
// Formspree Integration (Alternative)
// To use Formspree, update the form action:
// ========================================
/*
// Add this to your HTML form tag:
// <form action="https://formspree.io/f/YOUR_FORM_ID" method="POST" id="contactForm">

// The form will automatically submit to Formspree
// You can still add custom success/error handling if needed
*/

// ========================================
// Scroll to Top Button
// ========================================
const scrollTopButton = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollTopButton.classList.add("visible");
  } else {
    scrollTopButton.classList.remove("visible");
  }
});

scrollTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// ========================================
// Easter Egg
// ========================================
const easterEggTrigger = document.getElementById("easterEggTrigger");
const easterEgg = document.getElementById("easterEgg");

easterEggTrigger.addEventListener("click", (e) => {
  e.preventDefault();
  easterEgg.classList.add("active");
  document.body.style.overflow = "hidden";
});

function closeEasterEgg() {
  easterEgg.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close easter egg when clicking outside
easterEgg.addEventListener("click", (e) => {
  if (e.target === easterEgg) {
    closeEasterEgg();
  }
});

// Konami Code Easter Egg
let konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
let konamiIndex = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      easterEgg.classList.add("active");
      document.body.style.overflow = "hidden";
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
});

// ========================================
// Parallax Effect for Hero Section
// ========================================
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroParticles = document.querySelector(".hero-particles");

  if (heroParticles) {
    heroParticles.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// ========================================
// Image Lazy Loading
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute("data-src");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// ========================================
// Particle Effect (Optional Enhancement)
// ========================================
function createParticles() {
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    const size = Math.random() * 5 + 2;
    particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-color);
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s infinite ease-in-out;
            z-index: 0;
        `;
    heroSection.appendChild(particle);
  }
}

// Add floating particles to hero section
document.addEventListener("DOMContentLoaded", createParticles);

// ========================================
// Console Message (Fun Touch)
// ========================================
console.log(
  "%c👋 Hello Developer!",
  "color: #D4AF37; font-size: 20px; font-weight: bold;"
);
console.log(
  "%cThanks for checking out my portfolio!",
  "color: #F4D06F; font-size: 14px;"
);
console.log(
  "%cInterested in the code? Check out my GitHub!",
  "color: #AA8C2C; font-size: 14px;"
);

// ========================================
// Performance Monitoring
// ========================================
window.addEventListener("load", () => {
  const loadTime = performance.now();
  console.log(`⚡ Page loaded in ${loadTime.toFixed(2)}ms`);
});

// ========================================
// Preload Critical Images
// ========================================
const criticalImages = ["assets/images/profile.jpg"];

criticalImages.forEach((src) => {
  const link = document.createElement("link");
  link.rel = "preload";
  link.as = "image";
  link.href = src;
  document.head.appendChild(link);
});

// ========================================
// Add Copy Email Functionality
// ========================================
document.querySelectorAll('a[href^="mailto:"]').forEach((emailLink) => {
  emailLink.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    const email = emailLink.href.replace("mailto:", "");

    navigator.clipboard.writeText(email).then(() => {
      // Create temporary notification
      const notification = document.createElement("div");
      notification.textContent = "Email copied to clipboard!";
      notification.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--primary-color);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                box-shadow: var(--shadow-lg);
                z-index: 1000;
                animation: slideIn 0.3s ease-out;
            `;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
      }, 3000);
    });
  });
});

// ========================================
// Initialize Everything on Load
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Portfolio website initialized successfully!");

  // Add loaded class to body for animations
  document.body.classList.add("loaded");
});
