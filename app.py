from flask import request, jsonify
from flask import Flask, render_template, send_from_directory, redirect
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

app = Flask(__name__)

# Email configuration - Set these in your environment or .env file
EMAIL_USER = os.environ.get('EMAIL_USER', '')
EMAIL_PASSWORD = os.environ.get('EMAIL_PASSWORD', '')
EMAIL_SERVER = os.environ.get('EMAIL_SERVER', 'smtp.gmail.com')
EMAIL_PORT = int(os.environ.get('EMAIL_PORT', 587))

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
    """Handle email notification requests and send email to insectiscan@gmail.com"""
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({"success": False, "message": "Email address is required."}), 400
        
        try:
            # Send email notification to insectiscan@gmail.com
            send_notification_email(email)
            
            # Return success response
            return jsonify({"success": True, "message": "Thank you! We'll notify you when InsectiScan is ready."}), 200
        except Exception as e:
            print(f"Error processing notification request: {e}")
            # Even if email sending fails, show success to the user 
            # but log the error for admin troubleshooting
            return jsonify({"success": True, "message": "Thank you! We'll notify you when InsectiScan is ready."}), 200


def send_notification_email(user_email):
    """Send an email to insectiscan@gmail.com with the user's email"""
    try:
        # Email message setup
        msg = MIMEMultipart()
        msg['From'] = EMAIL_USER
        msg['To'] = 'insectiscan@gmail.com'
        msg['Subject'] = 'New InsectiScan App Notification Request'
        
        # Email body
        body = f"""
        Hello InsectiScan Team,
        
        A new user has requested to be notified when the InsectiScan app is ready.
        
        User Email: {user_email}
        
        This email was automatically generated from your website's notification form.
        """
        
        msg.attach(MIMEText(body, 'plain'))
        
        # Connect to email server and send
        with smtplib.SMTP(EMAIL_SERVER, EMAIL_PORT) as server:
            server.starttls()  # Secure the connection
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
            
        print(f"Notification email sent successfully for user: {user_email}")
        return True
    except Exception as e:
        print(f"Failed to send email notification: {e}")
        # Re-raise the exception to be caught by the calling function
        raise

# This ensures Flask knows where to find templates
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app.static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

if __name__ == '__main__':
    # Use environment variable for port if available (for production)
    port = int(os.environ.get('PORT', 5000))
    # Set debug to False in production
    debug_mode = os.environ.get('DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
