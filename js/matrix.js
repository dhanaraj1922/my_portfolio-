// Matrix Rain Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Characters to display (katakana and some special characters)
const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nums = '0123456789';
const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?/\\\'"`~';

const chars = katakana + latin + nums + symbols;

// Font size and columns
const fontSize = 16;
const columns = Math.floor(canvas.width / fontSize);

// Array to store the y position of each drop
const drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
}

// Example: Assign colors for each character type
function getMatrixCharColor(char) {
    if (char.match(/[\u30A0-\u30FF]/)) { // Katakana
        return "#00fff7"; // Bright cyan
    } else if (char.match(/[A-Za-z]/)) { // Latin
        return "#19ff4b"; // Neon green
    } else if (char.match(/[0-9]/)) { // Numbers
        return "#ffea00"; // Bright yellow
    } else { // Symbols
        return "#ff005a"; // Bright magenta
    }
}

// Draw function
function draw() {
    // Set semi-transparent black background to create trail effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text color and font
    ctx.font = `${fontSize}px 'Source Code Pro'`;

    // Loop through each drop
    for (let i = 0; i < drops.length; i++) {
        // Choose a random character
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        
        // Calculate x position
        const x = i * fontSize;
        
        // Calculate y position
        const y = drops[i] * fontSize;
        
        // Set character color
        ctx.fillStyle = getMatrixCharColor(text);
        
        // Draw the character
        ctx.fillText(text, x, y);
        
        // Add glow effect to some characters
        if (Math.random() > 0.975) {
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 10;
            ctx.fillStyle = '#ffffff';
            ctx.fillText(text, x, y);
            ctx.shadowBlur = 0;
            ctx.fillStyle = getMatrixCharColor(text);
        }
        
        // Reset drop position if it's at the bottom or randomly
        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        
        // Move the drop down
        drops[i]++;
    }
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Recalculate columns
    const newColumns = Math.floor(canvas.width / fontSize);
    
    // Adjust drops array
    if (newColumns > columns) {
        // Add new drops
        for (let i = columns; i < newColumns; i++) {
            drops[i] = Math.random() * -100;
        }
    } else {
        // Remove excess drops
        drops.length = newColumns;
    }
});

// Animation loop
function animate() {
    draw();
    requestAnimationFrame(animate);
}

// Start animation
animate();