// DOM Elements
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");
const sections = document.querySelectorAll("section");
const scrollIndicator = document.querySelector(".scroll-indicator");
const contactForm = document.querySelector(".contact-form");
const skillBars = document.querySelectorAll(".progress-bar");

// Mobile Navigation Toggle
navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  navToggle.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset;

  // Header background on scroll
  if (scrollTop > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Hide scroll indicator after scrolling
  if (scrollTop > 200) {
    scrollIndicator.style.opacity = "0";
  } else {
    scrollIndicator.style.opacity = "1";
  }
});

// Active Navigation Link
function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 100;

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

window.addEventListener("scroll", updateActiveNavLink);

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

// Typing Animation for Hero Text
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing animation when page loads
window.addEventListener("load", () => {
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    setTimeout(() => {
      typeWriter(typingElement, "Hello, I'm", 100);
    }, 500);
  }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");

      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains("skills")) {
        animateSkillBars();
      }

      // Animate statistics when about section is visible
      if (entry.target.classList.contains("about")) {
        animateStats();
      }
    }
  });
}, observerOptions);

// Observe sections for animations
sections.forEach((section) => {
  section.classList.add("fade-in");
  observer.observe(section);
});

// Animate skill progress bars
function animateSkillBars() {
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    setTimeout(() => {
      bar.style.width = progress + "%";
    }, 200);
  });
}

// Animate statistics counters
function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");

  statNumbers.forEach((stat) => {
    const target = parseInt(stat.textContent);
    const increment = target / 100;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      stat.textContent =
        Math.floor(current) + (stat.textContent.includes("+") ? "+" : "");
    }, 20);
  });
}

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(contactForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Basic validation
  if (!name || !email || !subject || !message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Show loading state
  const submitButton = contactForm.querySelector(".btn-primary");
  const originalText = submitButton.textContent;
  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  // Send email using EmailJS
  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: 'alexbesios02@gmail.com'
  };

  // Check if EmailJS config is available
  if (!window.emailjsConfig) {
    showNotification("Email service not configured. Please contact directly.", "error");
    return;
  }

  emailjs.send(window.emailjsConfig.serviceId, window.emailjsConfig.templateId, templateParams)
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      showNotification(
        "Message sent successfully! I'll get back to you soon.",
        "success"
      );
      contactForm.reset();
    })
    .catch((error) => {
      console.log('FAILED...', error);
      showNotification(
        "Failed to send message. Please try again or contact me directly.",
        "error"
      );
    })
    .finally(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
    });
});

// Notification System
function showNotification(message, type = "success") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success" ? "fa-check-circle" : "fa-exclamation-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#4ecdc4" : "#ff6b6b"};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 300px;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }, 5000);
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector(".hero-image");
  const heroText = document.querySelector(".hero-text");

  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
  }

  if (heroText) {
    heroText.style.transform = `translateY(${scrolled * 0.1}px)`;
  }
});

// Dynamic Background Particles
function createParticles() {
  const particlesContainer = document.querySelector(".floating-particles");
  const numberOfParticles = 20;

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: var(--primary-color);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            animation-delay: ${Math.random() * 15}s;
            opacity: ${Math.random() * 0.5 + 0.1};
        `;

    particlesContainer.appendChild(particle);
  }
}

// Mouse Cursor Effect
function createCursorEffect() {
  const cursor = document.createElement("div");
  cursor.className = "custom-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: rgba(0, 212, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        transform: translate(-50%, -50%);
    `;

  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Hover effects
  const hoverElements = document.querySelectorAll(
    "a, button, .project-card, .skill-item"
  );
  hoverElements.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2)";
      cursor.style.background = "rgba(0, 212, 255, 0.5)";
    });

    element.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background = "rgba(0, 212, 255, 0.3)";
    });
  });
}

// Project Card Tilt Effect
function addTiltEffect() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

// Initialize all effects when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize EmailJS with config from config.js
  if (window.emailjsConfig) {
    emailjs.init(window.emailjsConfig.publicKey);
  } else {
    console.warn('EmailJS config not found. Contact form will not work.');
  }
  
  createParticles();
  addTiltEffect();
});

// Project Card Hover Effects
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    const image = card.querySelector(".project-image .image-placeholder");
    if (image) {
      image.style.transform = "scale(1.1)";
      image.style.transition = "transform 0.3s ease";
    }
  });

  card.addEventListener("mouseleave", () => {
    const image = card.querySelector(".project-image .image-placeholder");
    if (image) {
      image.style.transform = "scale(1)";
    }
  });
});

// Social Links Animation
document.querySelectorAll(".social-link").forEach((link) => {
  link.addEventListener("mouseenter", () => {
    link.style.animation = "pulse 0.6s ease-in-out";
  });

  link.addEventListener("animationend", () => {
    link.style.animation = "";
  });
});

// Add pulse animation keyframes
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0% { transform: translateY(-3px) scale(1); }
        50% { transform: translateY(-3px) scale(1.1); }
        100% { transform: translateY(-3px) scale(1); }
    }
`;
document.head.appendChild(style);

// Scroll to Top Functionality
function createScrollToTop() {
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 5px 15px rgba(0, 212, 255, 0.3);
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.transform = "translateY(0)";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.transform = "translateY(100px)";
    }
  });

  // Scroll to top when clicked
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Initialize scroll to top button
createScrollToTop();

// Loading Animation
window.addEventListener("load", () => {
  const loader = document.createElement("div");
  loader.className = "loader";
  loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;

  loader.innerHTML = `
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
    `;

  document.body.appendChild(loader);

  // Add spin animation
  const spinStyle = document.createElement("style");
  spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
  document.head.appendChild(spinStyle);

  // Remove loader after page loads
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      if (loader.parentNode) {
        loader.remove();
      }
    }, 500);
  }, 1000);
});

// Dynamic Text Color on Scroll
window.addEventListener("scroll", () => {
  const scrollPercent =
    (window.pageYOffset / (document.body.scrollHeight - window.innerHeight)) *
    100;
  const hue = (scrollPercent * 3.6) % 360; // Full color wheel

  document.documentElement.style.setProperty(
    "--dynamic-color",
    `hsl(${hue}, 70%, 60%)`
  );
});
