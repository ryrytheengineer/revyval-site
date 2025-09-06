// Conversion Optimization Features for Revyval System
// Based on top supplement brand strategies

// Exit Intent Modal
let exitIntentTriggered = false;

function initExitIntent() {
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentTriggered) {
            setTimeout(() => showExitIntentModal(), 100);
        }
    });
}

function showExitIntentModal() {
    if (exitIntentTriggered) return;
    
    // Create exit intent modal if it doesn't exist
    if (!document.getElementById('exit-intent-modal')) {
        createExitIntentModal();
    }
    
    const modal = document.getElementById('exit-intent-modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    exitIntentTriggered = true;
    startExitTimer();
}

function createExitIntentModal() {
    const modalHTML = `
        <div id="exit-intent-modal" class="modal-overlay exit-intent">
            <div class="modal-content exit-modal">
                <div class="modal-header">
                    <h3>Wait! Don't Miss Your Chance</h3>
                    <button class="modal-close" onclick="closeExitModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="exit-offer">
                        <h4>🎁 Exclusive Early Access Bonus</h4>
                        <p>Join our VIP list now and get:</p>
                        <ul class="bonus-list">
                            <li>✓ <strong>40% OFF</strong> instead of 30% (limited time)</li>
                            <li>✓ Free longevity assessment ($200 value)</li>
                            <li>✓ Exclusive pre-launch webinar access</li>
                        </ul>
                    </div>
                    <form id="exit-form" onsubmit="handleExitSignup(event)">
                        <input type="email" placeholder="Enter your email for exclusive access" required>
                        <button type="submit" class="exit-cta">Claim My 40% Discount</button>
                    </form>
                    <div class="exit-timer">
                        <p>This exclusive offer expires in: <span id="exit-timer">05:00</span></p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeExitModal() {
    const modal = document.getElementById('exit-intent-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function startExitTimer() {
    let timeLeft = 300; // 5 minutes
    const timerElement = document.getElementById('exit-timer');
    
    if (timerElement) {
        const countdown = setInterval(() => {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            if (timeLeft <= 0) {
                clearInterval(countdown);
                closeExitModal();
            }
            timeLeft--;
        }, 1000);
    }
}

function handleExitSignup(event) {
    event.preventDefault();
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Claiming Your Discount...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        closeExitModal();
        showNotification('🎁 Exclusive 40% discount secured! Check your email for details.', 'success');
        event.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Social Proof Notifications
const socialProofMessages = [
    { name: "Dr. Sarah M.", action: "joined VIP list", time: "2 minutes ago", location: "San Francisco" },
    { name: "Michael R.", action: "completed longevity assessment", time: "5 minutes ago", location: "New York" },
    { name: "Jennifer L.", action: "joined VIP list", time: "8 minutes ago", location: "Austin" },
    { name: "David K.", action: "calculated biological age", time: "12 minutes ago", location: "Seattle" },
    { name: "Lisa P.", action: "joined VIP list", time: "15 minutes ago", location: "Miami" }
];

function showSocialProofNotification() {
    const container = getSocialProofContainer();
    const message = socialProofMessages[Math.floor(Math.random() * socialProofMessages.length)];
    
    const notification = document.createElement('div');
    notification.className = 'social-notification';
    
    const initials = message.name.split(' ').map(n => n[0]).join('');
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-avatar">${initials}</div>
            <div class="notification-text">
                <p><strong>${message.name}</strong> from ${message.location} ${message.action}</p>
                <div class="notification-time">${message.time}</div>
            </div>
        </div>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            if (container.contains(notification)) {
                container.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

function getSocialProofContainer() {
    let container = document.getElementById('social-proof-notifications');
    if (!container) {
        container = document.createElement('div');
        container.id = 'social-proof-notifications';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            z-index: 999;
        `;
        document.body.appendChild(container);
    }
    return container;
}

function initSocialProof() {
    setTimeout(() => {
        showSocialProofNotification();
        
        setInterval(() => {
            if (Math.random() > 0.3) {
                showSocialProofNotification();
            }
        }, 25000);
    }, 10000);
}

// Enhanced VIP Modal Functions
function updateSpotsRemaining() {
    const spotsElement = document.getElementById('spots-remaining');
    if (spotsElement) {
        const baseSpots = 247;
        const randomDecrease = Math.floor(Math.random() * 15) + 1;
        const currentSpots = Math.max(baseSpots - randomDecrease, 180);
        spotsElement.textContent = currentSpots;
    }
}

function enhanceVIPModal() {
    const modal = document.getElementById('signup-modal');
    if (!modal) return;
    
    // Add urgency indicator if not exists
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody && !modal.querySelector('.urgency-indicator')) {
        const urgencyHTML = `
            <div class="urgency-indicator">
                <span class="urgency-dot"></span>
                <span class="urgency-text">Only <strong id="spots-remaining">247</strong> VIP spots remaining</span>
            </div>
        `;
        modalBody.insertAdjacentHTML('afterbegin', urgencyHTML);
    }
    
    // Add commitment checkbox to form
    const form = modal.querySelector('form');
    if (form && !form.querySelector('.commitment-checkbox')) {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            const commitmentHTML = `
                <div class="commitment-checkbox">
                    <label>
                        <input type="checkbox" id="commitment-check" required>
                        <span class="checkmark"></span>
                        I'm committed to optimizing my longevity and health
                    </label>
                </div>
            `;
            submitBtn.insertAdjacentHTML('beforebegin', commitmentHTML);
        }
    }
    
    // Add social proof testimonial
    const benefits = modal.querySelector('.modal-benefits');
    if (benefits && !modal.querySelector('.social-proof')) {
        const socialProofHTML = `
            <div class="social-proof">
                <div class="testimonial-mini">
                    <p>"This system changed my biological age by 8 years in 6 months."</p>
                    <span>- Dr. Sarah Chen, Age 42</span>
                </div>
            </div>
        `;
        benefits.insertAdjacentHTML('afterend', socialProofHTML);
    }
}

// Initialize all conversion features
function initConversionOptimization() {
    initExitIntent();
    initSocialProof();
    enhanceVIPModal();
    
    // Update spots when modal opens
    const originalOpenModal = window.openSignupModal;
    if (originalOpenModal) {
        window.openSignupModal = function() {
            originalOpenModal();
            updateSpotsRemaining();
        };
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConversionOptimization);
} else {
    initConversionOptimization();
}
