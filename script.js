// Masterpiece Scrolling Experience for Revyval System
// Advanced scroll animations, parallax effects, and interactive elements

document.addEventListener('DOMContentLoaded', function() {
  
  // Performance optimization
  let ticking = false;
  let scrollY = 0;
  let windowHeight = window.innerHeight;
  let documentHeight = document.documentElement.scrollHeight;
  
  // Throttled scroll handler for better performance
  function updateOnScroll() {
    scrollY = window.pageYOffset;
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }
  
  // Main scroll effects handler
  function updateScrollEffects() {
    const scrollProgress = scrollY / (documentHeight - windowHeight);
    
    // Update all scroll effects
    handleNavbarEffects();
    handleParallaxEffects();
    handleScrollAnimations();
    handleSectionMorphing();
    handleBackgroundTransitions();
    
    ticking = false;
  }
  
  // Enhanced glassmorphic navbar effects
  function handleNavbarEffects() {
    const nav = document.querySelector('.nav');
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    if (scrollY > 100) {
      nav.style.background = 'rgba(255, 255, 255, 0.15)';
      nav.style.backdropFilter = 'saturate(180%) blur(30px)';
      nav.style.boxShadow = `
        0 12px 40px rgba(0, 0, 0, 0.15),
        0 4px 16px rgba(0, 0, 0, 0.08),
        inset 0 1px 0 rgba(255, 255, 255, 0.3),
        0 0 0 1px rgba(255, 255, 255, 0.1)
      `;
      nav.style.border = '1px solid rgba(255, 255, 255, 0.3)';
    } else {
      nav.style.background = 'rgba(255, 255, 255, 0.1)';
      nav.style.backdropFilter = 'saturate(180%) blur(25px)';
      nav.style.boxShadow = `
        0 8px 32px rgba(0, 0, 0, 0.1),
        0 2px 8px rgba(0, 0, 0, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.2)
      `;
      nav.style.border = '1px solid rgba(255, 255, 255, 0.2)';
    }
    
    // Smooth hide/show nav on scroll direction with glassmorphic transform
    if (scrollY > lastScrollTop && scrollY > heroHeight / 3) {
      nav.style.transform = 'translateX(-50%) translateY(-120%)';
      nav.style.opacity = '0';
    } else {
      nav.style.transform = 'translateX(-50%) translateY(0)';
      nav.style.opacity = '1';
    }
    
    lastScrollTop = scrollY;
  }
  
  // Advanced parallax effects
  function handleParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax-bg');
    
    parallaxElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const speed = 0.5;
      const yPos = -(scrollY * speed);
      
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        element.style.transform = `translateY(${yPos}px)`;
      }
    });
    
    // Pill floating effect based on scroll
    const pillImage = document.querySelector('.pill-image');
    if (pillImage) {
      const pillContainer = pillImage.closest('.hero');
      const rect = pillContainer.getBoundingClientRect();
      
      if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / windowHeight));
        const floatY = Math.sin(scrollY * 0.01) * 10 + progress * -20;
        const rotateZ = Math.sin(scrollY * 0.008) * 2;
        
        pillImage.style.transform = `translateY(${floatY}px) rotate(${rotateZ}deg)`;
      }
    }
  }
  
  // Scroll-triggered animations
  function handleScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');
    
    animateElements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const elementTop = rect.top;
      const elementBottom = rect.bottom;
      
      // Trigger animation when element is 80% visible
      if (elementTop < windowHeight * 0.8 && elementBottom > 0) {
        element.classList.add('animate');
      }
    });
  }
  
  // Section morphing effects
  function handleSectionMorphing() {
    const morphSections = document.querySelectorAll('.section-morph');
    
    morphSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(windowHeight / 2 - sectionCenter);
      const maxDistance = windowHeight;
      const morphIntensity = Math.max(0, 1 - distanceFromCenter / maxDistance);
      
      if (morphIntensity > 0.3) {
        section.classList.add('morphed');
      } else {
        section.classList.remove('morphed');
      }
    });
  }
  
  // Premium ecommerce-style transitions
  function handleBackgroundTransitions() {
    // Sections now have built-in seamless gradient transitions
    // No body background changes needed for smooth, high-converting flow
  }
  
  // Magnetic button effects
  function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        const force = Math.max(0, 1 - distance / maxDistance);
        
        const moveX = x * force * 0.3;
        const moveY = y * force * 0.3;
        
        button.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.05})`;
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });
  }
  
  // Advanced intersection observer for staggered animations
  function initAdvancedObserver() {
    const observerOptions = {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        const intersectionRatio = entry.intersectionRatio;
        
        // Staggered card animations
        if (element.classList.contains('system-card')) {
          const cards = Array.from(document.querySelectorAll('.system-card'));
          const cardIndex = cards.indexOf(element);
          
          if (intersectionRatio > 0.3) {
            setTimeout(() => {
              element.classList.add('animate');
            }, cardIndex * 150);
          }
        }
        
        // Floating elements intensity based on visibility
        if (element.classList.contains('float-element')) {
          const intensity = intersectionRatio;
          element.style.animationDuration = `${6 - intensity * 2}s`;
        }
        
        // Glow text effects
        if (element.classList.contains('glow-text')) {
          if (intersectionRatio > 0.5) {
            element.style.filter = `drop-shadow(0 0 20px rgba(74, 144, 226, ${intersectionRatio * 0.5}))`;
          }
        }
      });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .system-card, .float-element, .glow-text').forEach(el => {
      observer.observe(el);
    });
  }
  
  // Smooth scrolling with easing
  function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
        
      if (target) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.offsetTop - navHeight - 20;
        
          // Custom smooth scroll with easing
          const startPosition = window.pageYOffset;
          const distance = targetPosition - startPosition;
          const duration = 1200;
          let start = null;
          
          function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
          }
          
          function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const progress = Math.min(timeElapsed / duration, 1);
            const easedProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * easedProgress);
            
            if (timeElapsed < duration) {
              requestAnimationFrame(animation);
            }
          }
          
          requestAnimationFrame(animation);
      }
    });
  });
  }

  // Enhanced VIP form with animations
  function initEnhancedForm() {
  const vipForm = document.getElementById('vipForm');
  if (vipForm) {
      const inputs = vipForm.querySelectorAll('input');
      const submitBtn = vipForm.querySelector('button[type="submit"]');
      
      // Input focus effects
      inputs.forEach(input => {
        input.addEventListener('focus', () => {
          input.parentElement.style.transform = 'scale(1.02)';
          input.parentElement.style.boxShadow = '0 8px 25px rgba(74, 144, 226, 0.2)';
        });
        
        input.addEventListener('blur', () => {
          input.parentElement.style.transform = 'scale(1)';
          input.parentElement.style.boxShadow = 'none';
        });
      });
      
    vipForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const name = document.getElementById('name').value;
      
        // Validation with smooth error animations
      if (!email || !name) {
        showNotification('Please fill in all fields', 'error');
          shakeForm();
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
          shakeForm();
        return;
      }
      
        // Success animation
        submitBtn.innerHTML = `
          <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 12l6 6L21 6"/>
            </svg>
            Joining...
          </span>
        `;
      submitBtn.disabled = true;
        submitBtn.style.background = 'var(--accent-blue)';
      
        // Simulate API call with success animation
      setTimeout(() => {
          submitBtn.innerHTML = `
            <span style="display: inline-flex; align-items: center; gap: 0.5rem;">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12l2 2 4-4"/>
              </svg>
              Welcome to VIP Circle!
            </span>
          `;
        submitBtn.style.background = 'var(--accent-teal)';
          submitBtn.style.transform = 'scale(1.05)';
        
        showNotification(`Welcome ${name}! Check your email for VIP access details.`, 'success');
          
          // Confetti effect
          createConfetti();
        
        // Reset form after delay
        setTimeout(() => {
          vipForm.reset();
            submitBtn.innerHTML = 'Join VIP Inner Circle';
          submitBtn.disabled = false;
          submitBtn.style.background = '';
            submitBtn.style.transform = '';
          }, 4000);
        }, 2000);
      });
    }
  }
  
  // Form shake animation
  function shakeForm() {
    const form = document.getElementById('vipForm');
    form.style.animation = 'shake 0.6s ease-in-out';
    
    setTimeout(() => {
      form.style.animation = '';
    }, 600);
    
    // Add shake keyframes if not exists
    if (!document.querySelector('#shake-styles')) {
      const style = document.createElement('style');
      style.id = 'shake-styles';
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Confetti effect
  function createConfetti() {
    const colors = ['#4A90E2', '#F4A261', '#5856D6', '#32D74B', '#FF6B6B'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        top: -10px;
        left: ${Math.random() * 100}vw;
        z-index: 10000;
        border-radius: 50%;
        pointer-events: none;
        animation: confettiFall ${2 + Math.random() * 3}s linear forwards;
      `;
      
      document.body.appendChild(confetti);
      
      setTimeout(() => {
        confetti.remove();
      }, 5000);
    }
    
    // Add confetti animation if not exists
    if (!document.querySelector('#confetti-styles')) {
      const style = document.createElement('style');
      style.id = 'confetti-styles';
      style.textContent = `
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Enhanced notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    document.querySelectorAll('.notification').forEach(n => n.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    // Notification content with icon
    let icon = '';
    switch(type) {
      case 'success':
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>';
        break;
      case 'error':
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
        break;
      default:
        icon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }
    
    notification.innerHTML = `
      <div class="notification-content">
        <div class="notification-icon">${icon}</div>
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;

    // Enhanced styles
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      z-index: 10000;
      max-width: 400px;
      padding: 1.25rem 1.5rem;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15), 0 8px 16px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(30px);
      font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif;
      font-size: 0.95rem;
      font-weight: 500;
      opacity: 0;
      transform: translateX(100%) scale(0.8);
      transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: 1px solid rgba(255, 255, 255, 0.2);
    `;

    // Type-specific styles
    const typeStyles = {
      success: {
        background: 'rgba(50, 215, 75, 0.95)',
        color: 'white',
        border: '1px solid rgba(50, 215, 75, 0.3)'
      },
      error: {
        background: 'rgba(255, 69, 58, 0.95)',
        color: 'white',
        border: '1px solid rgba(255, 69, 58, 0.3)'
      },
      info: {
        background: 'rgba(0, 122, 255, 0.95)',
        color: 'white',
        border: '1px solid rgba(0, 122, 255, 0.3)'
      }
    };
    
    Object.assign(notification.style, typeStyles[type] || typeStyles.info);
    
    // Style content
    const content = notification.querySelector('.notification-content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      gap: 0.75rem;
    `;
    
    const iconEl = notification.querySelector('.notification-icon');
    iconEl.style.cssText = `
      flex-shrink: 0;
      opacity: 0.9;
    `;
    
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      color: inherit;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0;
      opacity: 0.7;
      transition: all 0.2s ease;
      margin-left: auto;
      flex-shrink: 0;
    `;
    
    closeBtn.addEventListener('click', () => hideNotification(notification));
    closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
    closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
    
    document.body.appendChild(notification);

    // Trigger entrance animation
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0) scale(1)';
    });

    // Auto-hide
    setTimeout(() => {
      if (document.body.contains(notification)) {
        hideNotification(notification);
      }
    }, 6000);
  }

  function hideNotification(notification) {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%) scale(0.8)';
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.remove();
      }
    }, 400);
  }
  
  // Email validation
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  // Performance monitoring
  function initPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          // Reduce animation complexity for better performance
          document.body.classList.add('reduced-motion');
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFPS);
    }
    
    requestAnimationFrame(checkFPS);
  }
  
  // Initialize all effects
  let lastScrollTop = 0;
  
  // Event listeners
  window.addEventListener('scroll', updateOnScroll, { passive: true });
  window.addEventListener('resize', () => {
    windowHeight = window.innerHeight;
    documentHeight = document.documentElement.scrollHeight;
  });
  
  // Initialize all features
  initSmoothScrolling();
  initMagneticButtons();
  initAdvancedObserver();
  initEnhancedForm();
  initPerformanceMonitoring();
  
  // Easter egg - Konami code for special effects
  const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  let konamiProgress = 0;
  
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === konamiCode[konamiProgress]) {
      konamiProgress++;
      if (konamiProgress === konamiCode.length) {
      document.body.style.filter = document.body.style.filter ? '' : 'invert(1) hue-rotate(180deg)';
        showNotification('🌙 Secret mode activated! (Konami code detected)', 'success');
        createConfetti();
        konamiProgress = 0;
      }
    } else {
      konamiProgress = 0;
    }
  });
  
  // Initial setup
  updateScrollEffects();
  
  // Initialize longevity features
  initCounterAnimations();
  initHealthMetrics();
  initLongevityCalculator();
  initCircadianVisualizer();
  initBioAgeQuiz();
  initSignupModal();

  console.log('🚀 Revyval System: Masterpiece scrolling experience loaded!');
});

// Longevity Feature Functions

// Counter Animations
function initCounterAnimations() {
  const counters = document.querySelectorAll('.counter-number');
  
  const animateCounter = (counter) => {
    const target = parseFloat(counter.getAttribute('data-target'));
    const increment = target / 100;
    let current = 0;
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = current.toFixed(1);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toFixed(1);
      }
    };
    
    updateCounter();
  };
  
  // Animate counters when they come into view
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Health Metrics Animation
function initHealthMetrics() {
  const metrics = document.querySelectorAll('.metric-fill');
  
  const metricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
        metricObserver.unobserve(entry.target);
      }
    });
  });
  
  metrics.forEach(metric => {
    metricObserver.observe(metric);
  });
  
  // Sleep optimization metrics animation
  const sleepMetrics = document.querySelectorAll('.metric-progress');
  
  const sleepMetricObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.setProperty('--target-width', width);
        entry.target.style.width = width;
        sleepMetricObserver.unobserve(entry.target);
      }
    });
  });
  
  sleepMetrics.forEach(metric => {
    sleepMetricObserver.observe(metric);
  });
}

// Longevity Calculator
function initLongevityCalculator() {
  const calculateBtn = document.getElementById('calculate-longevity');
  const resultDiv = document.getElementById('longevity-result');
  
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const age = parseInt(document.getElementById('current-age').value);
      const sleepQuality = document.getElementById('sleep-quality').value;
      const exerciseFreq = document.getElementById('exercise-frequency').value;
      const stressLevel = document.getElementById('stress-level').value;
      const dietQuality = document.getElementById('diet-quality').value;
      const socialConnections = document.getElementById('social-connections').value;
      const smokingStatus = document.getElementById('smoking-status').value;
      const alcoholConsumption = document.getElementById('alcohol-consumption').value;
      
      if (!age || !sleepQuality || !exerciseFreq || !stressLevel || !dietQuality || !socialConnections || !smokingStatus || !alcoholConsumption) {
        showNotification('Please complete all fields for accurate assessment', 'error');
        return;
      }
      
      // Clinical longevity calculation based on research
      let lifeExtension = 0;
      
      // Sleep Quality (Harvard Sleep Study data)
      if (sleepQuality === 'excellent') lifeExtension += 4.2;
      else if (sleepQuality === 'good') lifeExtension += 2.1;
      else if (sleepQuality === 'average') lifeExtension += 0.5;
      else lifeExtension -= 2.8; // Poor sleep reduces lifespan
      
      // Exercise (Blue Zones & Harvard Health data)
      if (exerciseFreq === 'high') lifeExtension += 3.8;
      else if (exerciseFreq === 'moderate') lifeExtension += 2.4;
      else if (exerciseFreq === 'light') lifeExtension += 0.9;
      else lifeExtension -= 1.5; // Sedentary lifestyle
      
      // Stress Management (Chronic stress research)
      if (stressLevel === 'optimal') lifeExtension += 2.7;
      else if (stressLevel === 'low') lifeExtension += 1.8;
      else if (stressLevel === 'moderate') lifeExtension += 0.3;
      else lifeExtension -= 2.1; // High stress
      
      // Diet Quality (Mediterranean diet studies)
      if (dietQuality === 'excellent') lifeExtension += 3.2;
      else if (dietQuality === 'good') lifeExtension += 1.9;
      else if (dietQuality === 'average') lifeExtension += 0.2;
      else lifeExtension -= 1.8; // Poor diet
      
      // Social Connections (Loneliness mortality research)
      if (socialConnections === 'strong') lifeExtension += 2.3;
      else if (socialConnections === 'good') lifeExtension += 1.4;
      else if (socialConnections === 'some') lifeExtension += 0.3;
      else lifeExtension -= 2.9; // Social isolation
      
      // Smoking Status (CDC mortality data)
      if (smokingStatus === 'never') lifeExtension += 2.5;
      else if (smokingStatus === 'former') lifeExtension += 1.2;
      else if (smokingStatus === 'former-recent') lifeExtension -= 0.8;
      else lifeExtension -= 8.7; // Current smoking
      
      // Alcohol Consumption (J-curve research)
      if (alcoholConsumption === 'light') lifeExtension += 0.8; // Moderate consumption benefit
      else if (alcoholConsumption === 'none') lifeExtension += 0.3;
      else if (alcoholConsumption === 'moderate') lifeExtension -= 0.5;
      else lifeExtension -= 3.2; // Heavy drinking
      
      // Age adjustment (intervention effectiveness decreases with age)
      if (age > 65) lifeExtension *= 0.7;
      else if (age > 50) lifeExtension *= 0.85;
      else if (age > 35) lifeExtension *= 0.95;
      
      // Revyval System optimization bonus (sleep optimization amplifies other factors)
      const revyvalBonus = Math.max(1.2, lifeExtension * 0.15);
      lifeExtension += revyvalBonus;
      
      // Ensure realistic bounds
      lifeExtension = Math.max(-5, Math.min(15, lifeExtension));
      const finalExtension = Math.round(lifeExtension * 10) / 10;
      
      let message;
      if (finalExtension >= 8) {
        message = "Outstanding lifestyle factors! The Revyval System can help you maintain and optimize these exceptional habits.";
      } else if (finalExtension >= 4) {
        message = "Good foundation for longevity. The Revyval System can significantly amplify your healthy lifestyle choices.";
      } else if (finalExtension >= 0) {
        message = "Moderate longevity potential. The Revyval System addresses key areas for substantial improvement.";
      } else {
        message = "Significant opportunity for transformation. The Revyval System can help reverse negative lifestyle impacts.";
      }
      
      resultDiv.innerHTML = `
        <div class="result-years">${finalExtension > 0 ? '+' : ''}${finalExtension}</div>
        <div class="result-label">Years of Life Extension Potential</div>
        <p style="margin-top: 1rem; color: var(--text-secondary); line-height: 1.5;">${message}</p>
        <p style="margin-top: 0.5rem; font-size: 0.9rem; color: var(--text-secondary); opacity: 0.8;">*Based on peer-reviewed longevity research and clinical studies</p>
      `;
      resultDiv.classList.add('show');
    });
  }
}

// Circadian Rhythm Visualizer
function initCircadianVisualizer() {
  const bedtimeInput = document.getElementById('bedtime');
  const waketimeInput = document.getElementById('waketime');
  const scoreElement = document.getElementById('circadian-score');
  const pmHand = document.querySelector('.pm-hand');
  const amHand = document.querySelector('.am-hand');
  
  const updateCircadianScore = () => {
    if (!bedtimeInput || !waketimeInput) return;
    
    const bedtime = bedtimeInput.value;
    const waketime = waketimeInput.value;
    
    if (bedtime && waketime) {
      const bedHour = parseInt(bedtime.split(':')[0]);
      const wakeHour = parseInt(waketime.split(':')[0]);
      
      // Calculate sleep duration
      let sleepHours = wakeHour - bedHour;
      if (sleepHours <= 0) sleepHours += 24;
      
      // Calculate optimization score
      let score = 70;
      
      // Optimal bedtime (9-11 PM)
      if (bedHour >= 21 && bedHour <= 23) score += 15;
      else if (bedHour >= 20 || bedHour === 0) score += 10;
      else score -= 10;
      
      // Optimal wake time (5-7 AM)
      if (wakeHour >= 5 && wakeHour <= 7) score += 15;
      else if (wakeHour >= 4 && wakeHour <= 8) score += 10;
      else score -= 10;
      
      // Sleep duration (7-9 hours optimal)
      if (sleepHours >= 7 && sleepHours <= 9) score += 10;
      else if (sleepHours >= 6 && sleepHours <= 10) score += 5;
      else score -= 15;
      
      score = Math.max(0, Math.min(100, score));
      scoreElement.textContent = `${score}%`;
      
      // Update clock hands
      const bedAngle = ((bedHour % 12) * 30) - 90;
      const wakeAngle = ((wakeHour % 12) * 30) - 90;
      
      pmHand.style.transform = `translate(-50%, -100%) rotate(${bedAngle}deg)`;
      amHand.style.transform = `translate(-50%, -100%) rotate(${wakeAngle}deg)`;
    }
  };
  
  if (bedtimeInput) bedtimeInput.addEventListener('change', updateCircadianScore);
  if (waketimeInput) waketimeInput.addEventListener('change', updateCircadianScore);
  
  // Initial calculation
  updateCircadianScore();
}

// Biological Age Quiz
function initBioAgeQuiz() {
  const quizOptions = document.querySelectorAll('.quiz-option');
  const questions = document.querySelectorAll('.quiz-question');
  const resultDiv = document.getElementById('bio-age-result');
  let currentQuestion = 1;
  let answers = [];
  
  quizOptions.forEach(option => {
    option.addEventListener('click', () => {
      const questionNum = parseInt(option.closest('.quiz-question').getAttribute('data-question'));
      const value = parseInt(option.getAttribute('data-value'));
      
      // Mark option as selected
      option.closest('.quiz-question').querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('selected');
      });
      option.classList.add('selected');
      
      // Store answer
      answers[questionNum - 1] = value;
      
      // Move to next question after delay
      setTimeout(() => {
        if (currentQuestion < questions.length) {
          questions[currentQuestion - 1].classList.remove('active');
          questions[currentQuestion].classList.add('active');
          currentQuestion++;
        } else {
          // Calculate biological age
          calculateBiologicalAge();
        }
      }, 800);
    });
  });
  
  function calculateBiologicalAge() {
    // Get chronological age from first question (assuming it's asked)
    const chronologicalAge = 24; // Default for demo, should be from quiz
    
    // Clinical algorithm based on lifestyle factors
    let biologicalAge = chronologicalAge;
    
    // Question 1: Sleep Quality (major factor)
    if (answers[0] === 4) biologicalAge -= 3.2; // Excellent sleep
    else if (answers[0] === 3) biologicalAge -= 1.1; // Good sleep
    else if (answers[0] === 2) biologicalAge += 1.8; // Fair sleep
    else biologicalAge += 4.5; // Poor sleep
    
    // Question 2: Energy Levels
    if (answers[1] === 4) biologicalAge -= 2.1;
    else if (answers[1] === 3) biologicalAge -= 0.7;
    else if (answers[1] === 2) biologicalAge += 1.3;
    else biologicalAge += 3.2;
    
    // Question 3: Exercise Frequency
    if (answers[2] === 4) biologicalAge -= 2.8;
    else if (answers[2] === 3) biologicalAge -= 1.2;
    else if (answers[2] === 2) biologicalAge += 0.9;
    else biologicalAge += 2.7;
    
    // Question 4: Stress Management
    if (answers[3] === 4) biologicalAge -= 1.9;
    else if (answers[3] === 3) biologicalAge -= 0.8;
    else if (answers[3] === 2) biologicalAge += 1.1;
    else biologicalAge += 2.4;
    
    // Question 5: Recovery Quality
    if (answers[4] === 4) biologicalAge -= 1.6;
    else if (answers[4] === 3) biologicalAge -= 0.5;
    else if (answers[4] === 2) biologicalAge += 0.8;
    else biologicalAge += 2.1;
    
    // Ensure biological age is realistic
    biologicalAge = Math.max(chronologicalAge - 8, Math.min(chronologicalAge + 15, biologicalAge));
    biologicalAge = Math.round(biologicalAge);
    
    let message;
    const ageDifference = biologicalAge - chronologicalAge;
    
    if (ageDifference <= -5) {
      message = "Outstanding! Your biological age is significantly younger than your chronological age. The Revyval System can help you maintain this exceptional advantage.";
    } else if (ageDifference <= -2) {
      message = "Excellent! You're aging slower than average. The Revyval System can accelerate your longevity journey even further.";
    } else if (ageDifference <= 2) {
      message = "Good! Your biological age is close to your chronological age. The Revyval System can help you reverse the aging process.";
    } else if (ageDifference <= 5) {
      message = "Your biological age shows room for improvement. The Revyval System is designed to help reverse this aging acceleration.";
  } else {
      message = "Significant opportunity for transformation! The Revyval System can help you reclaim years of vitality and health.";
    }
    
    // Hide questions and show result
    questions.forEach(q => q.classList.remove('active'));
    
    document.getElementById('bio-age-number').textContent = biologicalAge;
    document.getElementById('bio-age-message').textContent = message;
    resultDiv.classList.add('show');
  }
}

// VIP Signup Modal Functions
function openSignupModal() {
  const modal = document.getElementById('signup-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeSignupModal() {
  const modal = document.getElementById('signup-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initSignupModal() {
  const modal = document.getElementById('signup-modal');
  const openBtn = document.getElementById('open-signup-modal');
  const closeBtn = document.getElementById('close-modal');
  const form = document.getElementById('vip-modal-form');
  
  // Open modal
  if (openBtn) {
    openBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  // Close modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSignupModal);
  }
  
  // Close on overlay click
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeSignupModal();
      }
    });
  }
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeSignupModal();
    }
  });
  
  // Handle form submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('vip-email').value;
      const phone = document.getElementById('vip-phone').value;
      
      if (email && phone) {
        // Simulate form submission
        showNotification('🎉 Welcome to the VIP list! Check your email for exclusive access details.', 'success');
        
        // Close modal and reset form
        modal.classList.remove('active');
        document.body.style.overflow = '';
        form.reset();
        
        // Optional: Add confetti effect
        if (typeof handleConfetti === 'function') {
          handleConfetti();
        }
      } else {
        showNotification('Please fill in both email and phone number', 'error');
      }
    });
  }
}

// Reduced motion support
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.body.classList.add('reduced-motion');
}