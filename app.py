from flask import Flask, render_template, send_from_directory, redirect
import os

app = Flask(__name__)

@app.route('/')
def index():
    """Render the main index page."""
    return render_template('index.html')

@app.route('/assets/<path:path>')
def send_assets(path):
    """Serve static assets."""
    return send_from_directory('assets', path)

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

if __name__ == '__main__':
    # Use environment variable for port if available (for production)
    port = int(os.environ.get('PORT', 5000))
    # Set debug to False in production
    app.run(host='0.0.0.0', port=port, debug=False)
