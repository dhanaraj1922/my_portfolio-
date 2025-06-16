// Typing Animation
function typeText(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animations
document.addEventListener('DOMContentLoaded', () => {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        typeText(element, text);
    });
    
    // Initialize skill levels
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(skill => {
        const level = skill.getAttribute('data-level');
        skill.style.setProperty('--skill-level', `${level}%`);
        
        // Create the fill element
        const fill = document.createElement('div');
        fill.classList.add('skill-fill');
        fill.style.width = `${level}%`;
        skill.appendChild(fill);
    });
    
    // Glitch effect on hover
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.classList.add('glitching');
            
            // Random glitch effect
            const glitchInterval = setInterval(() => {
                const glitchX = Math.random() * 10 - 5;
                const glitchY = Math.random() * 10 - 5;
                
                element.style.transform = `translate(${glitchX}px, ${glitchY}px)`;
                
                // Random color channels
                if (Math.random() > 0.7) {
                    element.style.textShadow = `
                        ${Math.random() * 3}px 0 rgba(255, 0, 0, 0.5),
                        ${-Math.random() * 3}px 0 rgba(0, 255, 0, 0.5),
                        0 ${Math.random() * 3}px rgba(0, 0, 255, 0.5)
                    `;
                }
            }, 50);
            
            // Stop glitching after a while
            setTimeout(() => {
                clearInterval(glitchInterval);
                element.classList.remove('glitching');
                element.style.transform = 'translate(0, 0)';
                element.style.textShadow = 'none';
            }, 500);
        });
    });
});

// Scan effect on page load
function scanEffect() {
    const scanLine = document.createElement('div');
    scanLine.classList.add('scan-line');
    document.body.appendChild(scanLine);
    
    let position = -100;
    const height = window.innerHeight + 100;
    
    const scan = setInterval(() => {
        position += 10;
        scanLine.style.top = `${position}px`;
        
        if (position > height) {
            clearInterval(scan);
            scanLine.remove();
        }
    }, 20);
}

// Run scan effect on page load
window.addEventListener('load', scanEffect);

// Add CSS for scan line
const style = document.createElement('style');
style.textContent = `
    .scan-line {
        position: fixed;
        top: -100px;
        left: 0;
        width: 100%;
        height: 5px;
        background: linear-gradient(to bottom, 
            rgba(0, 255, 65, 0) 0%,
            rgba(0, 255, 65, 0.8) 50%,
            rgba(0, 255, 65, 0) 100%);
        z-index: 9999;
        pointer-events: none;
    }
    
    .glitching {
        position: relative;
        display: inline-block;
    }
`;
document.head.appendChild(style);