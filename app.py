from flask import request, jsonify
from flask import Flask, render_template, send_from_directory, redirect
import os
import csv
from datetime import datetime

app = Flask(__name__)

# File to store email addresses
EMAIL_LIST_FILE = 'notify_emails.csv'

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
    """Store email address and log for admin review"""
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')
        
        if not email:
            return jsonify({"success": False, "message": "Email address is required."}), 400
        
        try:
            # Store email in CSV file
            store_email(email)
            
            # Print to console/logs - you'll see this in your terminal
            print(f"NOTIFICATION REQUEST: {email} wants to be notified when InsectiScan is ready.")
            
            # Return success response
            return jsonify({"success": True, "message": "Thank you! We'll notify you when InsectiScan is ready."}), 200
        except Exception as e:
            print(f"Error processing notification request: {e}")
            # Even if storage fails, show success to the user
            return jsonify({"success": True, "message": "Thank you! We'll notify you when InsectiScan is ready."}), 200

def store_email(email):
    """Store email address in CSV file with timestamp"""
    # Create file if it doesn't exist
    if not os.path.exists(EMAIL_LIST_FILE):
        with open(EMAIL_LIST_FILE, 'w', newline='') as file:
            writer = csv.writer(file)
            writer.writerow(['Email', 'Date'])
    
    # Check if email already exists
    emails = []
    if os.path.exists(EMAIL_LIST_FILE):
        with open(EMAIL_LIST_FILE, 'r') as file:
            reader = csv.reader(file)
            next(reader, None)  # Skip header
            emails = [row[0] for row in reader]
    
    # Only add if email doesn't exist already
    if email not in emails:
        with open(EMAIL_LIST_FILE, 'a', newline='') as file:
            writer = csv.writer(file)
            writer.writerow([email, datetime.now().strftime('%Y-%m-%d %H:%M:%S')])

# This ensures Flask knows where to find templates
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app.static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')

if __name__ == '__main__':
    # Use environment variable for port if available (for production)
    port = int(os.environ.get('PORT', 5000))
    # Set debug to False in production
    debug_mode = os.environ.get('DEBUG', 'False').lower() == 'true'
    app.run(host='0.0.0.0', port=port, debug=debug_mode)
