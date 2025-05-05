// Basic JavaScript functionality for InsectiScan website
document.addEventListener('DOMContentLoaded', function() {
    console.log('InsectiScan website loaded successfully!');
    
    // Add a simple animation to the coming soon message
    const comingSoonElement = document.querySelector('.coming-soon');
    if (comingSoonElement) {
        comingSoonElement.style.opacity = '0';
        comingSoonElement.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(function() {
            comingSoonElement.style.opacity = '1';
        }, 300);
    }
    
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(function(button) {
        button.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Add current year to copyright notice
    const currentYear = new Date().getFullYear();
    const footerElement = document.querySelector('footer');
    if (footerElement) {
        const copyrightText = footerElement.innerHTML;
        if (copyrightText.includes('2025')) {
            footerElement.innerHTML = copyrightText.replace('2025', currentYear);
        }
    }
});
