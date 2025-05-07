from flask import request, jsonify
from flask import Flask, render_template, send_from_directory, redirect
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)

@app.route('/')
def index():
    """Render the main index page."""
    return render_template('index.html')

@app.route('/static/<path:path>')
def serve_static(path):
    """Serve static files (CSS, JS, images)."""
    return send_from_directory('static', path)

@app.route('/download/android')
def download_android():
    """Redirect to Android app download."""
    # Replace with actual Google Play Store URL when available
    return redirect('https://play.google.com/store/apps/details?id=org.insectiscan.app')

@app.route('/download/ios')
def download_ios():
    """Redirect to iOS app download."""
    # Replace with actual App Store URL when available
    return redirect('https://apps.apple.com/app/insectiscan/id0000000000')

@app.route('/privacy')
def privacy():
    """Render the privacy policy page."""
    return render_template('privacy.html')

@app.route('/terms')
def terms():
    """Render the terms of service page."""
    return render_template('terms.html')

@app.route('/notify', methods=['POST'])
def notify():
    """Handle email notification requests"""
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        
        # In a production environment, you would send an email to insectiscan@gmail.com
        # This would require configuring SMTP settings and credentials
        try:
            # This is a placeholder for actual email sending code
            # You would replace this with your actual SMTP settings
            '''
            sender_email = "your-app-email@example.com"
            receiver_email = "insectiscan@gmail.com"
            password = "your-email-password"  # Use environment variables in production
            
            message = MIMEMultipart()
            message["From"] = sender_email
            message["To"] = receiver_email
            message["Subject"] = "New InsectiScan App Notification Request"
            
            body = f"A user has requested to be notified when InsectiScan is ready.\n\nEmail: {email}"
            message.attach(MIMEText(body, "plain"))
            
            with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
                server.login(sender_email, password)
                server.sendmail(sender_email, receiver_email, message.as_string())
            '''
            
            # For demonstration, we'll just log this
            print(f"Email notification request received for: {email}")
            
            return jsonify({"success": True, "message": "Thank you! We'll notify you when InsectiScan is ready."}), 200
        except Exception as e:
            print(f"Error sending notification email: {e}")
            return jsonify({"success": False, "message": "There was an error processing your request. Please try again later."}), 500

# This ensures Flask knows where to find templates
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app.static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

if __name__ == '__main__':
    # Use environment variable for port if available (for production)
    port = int(os.environ.get('PORT', 5000))
    # Set debug to False in production
    debug_mode = os.environ.get('DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
