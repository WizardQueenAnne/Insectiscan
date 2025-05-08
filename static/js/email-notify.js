// Email notification form handling
document.addEventListener('DOMContentLoaded', function() {
    console.log("Email notification script loaded");
    
    const notifyForm = document.getElementById('notify-form');
    const notificationMessage = document.getElementById('notification-message');
    
    if (notifyForm) {
        console.log("Found the notification form");
        
        notifyForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent the form from submitting normally
            
            const emailInput = document.getElementById('notify-email');
            const email = emailInput.value.trim();
            
            console.log("Email entered:", email);
            
            if (email) {
                // Disable the button while submitting
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = 'Sending...';
                submitBtn.disabled = true;
                
                // Send the email to the backend
                fetch('/notify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: email }),
                })
                .then(response => response.json())
                .then(data => {
                    // Reset the button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    if (data.success) {
                        // Show success message
                        notificationMessage.textContent = data.message;
                        notificationMessage.style.backgroundColor = "rgba(46, 204, 113, 0.15)";
                        notificationMessage.style.color = "#2ecc71";
                        notificationMessage.style.border = "1px solid #2ecc71";
                        notificationMessage.style.display = "block";
                        
                        // Clear the input
                        emailInput.value = '';
                    } else {
                        // Show error message
                        notificationMessage.textContent = data.message || "There was an error processing your request.";
                        notificationMessage.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                        notificationMessage.style.color = "#e74c3c";
                        notificationMessage.style.border = "1px solid #e74c3c";
                        notificationMessage.style.display = "block";
                    }
                    
                    // Hide the message after 5 seconds
                    setTimeout(function() {
                        notificationMessage.style.display = "none";
                    }, 5000);
                })
                .catch(error => {
                    // Reset the button
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                    
                    console.error('Error:', error);
                    // Show error message
                    notificationMessage.textContent = "There was an error submitting your email. Please try again later.";
                    notificationMessage.style.backgroundColor = "rgba(231, 76, 60, 0.15)";
                    notificationMessage.style.color = "#e74c3c";
                    notificationMessage.style.border = "1px solid #e74c3c";
                    notificationMessage.style.display = "block";
                    
                    // Hide the message after 5 seconds
                    setTimeout(function() {
                        notificationMessage.style.display = "none";
                    }, 5000);
                });
            }
        });
    } else {
        console.log("Could not find the notification form");
    }
});
