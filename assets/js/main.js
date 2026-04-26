// Professional Portfolio JavaScript - B&W Theme
document.addEventListener('DOMContentLoaded', () => {
  // Typing effect
  const dynamicSpan = document.querySelector('.typewriter__dynamic');
  if (dynamicSpan) {
    const phrases = [
      'Software Engineer.',
      'Network Engineer.',
      'CyberSecurity Analyst.',
      'PenTester.'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
      const currentPhrase = phrases[phraseIndex];
      
      if (!isDeleting && charIndex <= currentPhrase.length) {
        dynamicSpan.textContent = currentPhrase.slice(0, charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      } else if (isDeleting && charIndex > 0) {
        dynamicSpan.textContent = currentPhrase.slice(0, charIndex - 1);
        charIndex--;
        setTimeout(typeWriter, 50);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(typeWriter, 1500);
        } else {
          setTimeout(typeWriter, 50);
        }
      }
    }
    typeWriter();
  }

  // Hamburger menu - Updated selectors
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close on window click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    // Close on nav link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Nav active class on scroll
  window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

// Skills highlight animation - subtle green loop every second
  const skillsItems = document.querySelectorAll('.skills-tree__item');
  if (skillsItems.length > 0) {
    function highlightSkills() {
      skillsItems.forEach(item => {
        item.style.color = 'var(--text-secondary)';
        item.style.textShadow = 'none';
      });
      
      let currentIndex = 0;
      const interval = setInterval(() => {
        skillsItems.forEach(item => {
          item.style.color = 'var(--text-secondary)';
          item.style.textShadow = 'none';
        });
        
        const currentItem = skillsItems[currentIndex];
        currentItem.style.color = '#00ff88';
        currentItem.style.textShadow = '0 0 12px rgba(0, 255, 136, 0.5)';
        
        currentIndex = (currentIndex + 1) % skillsItems.length;
      }, 1000);

      // Stop on scroll away
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) {
            clearInterval(interval);
            skillsItems.forEach(item => {
              item.style.color = 'var(--text-primary)';
              item.style.textShadow = 'none';
            });
          } else {
            // Restart if scrolled back
            clearInterval(interval);
            highlightSkills();
          }
        });
      });
      
      const skillsSection = document.querySelector('.skills-tree');
      if (skillsSection) observer.observe(skillsSection);
    }
    
    // Start when visible
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          highlightSkills();
          skillsObserver.unobserve(entry.target);
        }
      });
    });
    
    const skillsSection = document.querySelector('.skills-tree');
    if (skillsSection) skillsObserver.observe(skillsSection);
  }

  // Card hover enhancements
  document.querySelectorAll('.card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  // Form handling (prevent default, simulate send)
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const button = form.querySelector('button');
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;
      
      setTimeout(() => {
        button.textContent = 'Sent! ✓';
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          form.reset();
        }, 2000);
      }, 1500);
    });
  }
});
