// Email notification form handling
document.addEventListener('DOMContentLoaded', function() {
    console.log("Email notification script loaded");
    
    const notifyForm = document.getElementById('notify-form');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notifyForm) {
        console.log("Found the notification form");
        
        notifyForm.addEventListener('submit', function(e) {
            console.log("Form submitted");
            e.preventDefault(); // Prevent the form from submitting normally
            
            const emailInput = document.getElementById('notify-email');
            const email = emailInput.value.trim();
            
            console.log("Email entered:", email);
            
            if (email) {
                // Show notification immediately
                notificationMessage.textContent = "Thank you! We'll notify you when InsectiScan is ready.";
                notificationMessage.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                notificationMessage.style.color = "#2ecc71";
                notificationMessage.style.border = "1px solid #2ecc71";
                notificationMessage.style.display = "block";
                
                // Clear the input
                emailInput.value = '';
                
                // Log the email to the console
                console.log("Email submitted:", email);
                
                // Hide the message after 5 seconds
                setTimeout(function() {
                    notificationMessage.style.display = "none";
                }, 5000);
                
                // For actual implementation, you could add the fetch call here
                // but for now let's just make sure the form submission works
            }
        });
    } else {
        console.log("Could not find the notification form");
    }
});
