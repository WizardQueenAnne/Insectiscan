# InsectiScan Deployment Guide

This guide provides step-by-step instructions to fix the "TemplateNotFound: index.html" error and properly deploy the InsectiScan website to Render.

## Understanding the Error

The error occurs because Flask is looking for HTML templates in a 'templates' directory, but it can't find one. This is a common issue when deploying Flask applications if the directory structure isn't set up correctly.

## Step 1: Fix Directory Structure

Ensure your project has the following directory structure:

```
insectiscan/
├── app.py                # Flask application
├── requirements.txt      # Python dependencies
├── Procfile              # For Render/Heroku deployment
├── static/               # Static files directory
│   ├── css/              
│   │   └── styles.css    
│   ├── js/               
│   │   └── script.js     
│   └── img/              
│       └── ... (any images)
├── templates/            # Templates directory - THIS IS CRITICAL
│   ├── index.html        # Main page template
│   ├── privacy.html      # Privacy policy template
│   └── terms.html        # Terms of service template
```

## Step 2: Update app.py File

Make sure your `app.py` file explicitly sets the template and static folders:

```python
# Add this to your Flask app configuration
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app.static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
```

## Step 3: Move HTML Files to Templates Directory

All HTML files should be in the 'templates' directory:

1. Create a 'templates' directory if it doesn't exist
2. Move all HTML files (`index.html`, `privacy.html`, `terms.html`) into this directory

## Step 4: Move Static Files to Static Directory

All CSS, JavaScript, and image files should be in the 'static' directory:

1. Create a 'static' directory with subdirectories for 'css', 'js', and 'img'
2. Move all CSS files to 'static/css/'
3. Move all JavaScript files to 'static/js/'
4. Move all image files to 'static/img/'

## Step 5: Update File References in HTML

Update all static file references in your HTML files to use Flask's `url_for` function:

```html
<!-- CSS files -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}">

<!-- JavaScript files -->
<script src="{{ url_for('static', filename='js/script.js') }}"></script>

<!-- Images -->
<img src="{{ url_for('static', filename='img/logo.png') }}" alt="Logo">

<!-- Internal links -->
<a href="{{ url_for('index') }}">Home</a>
<a href="{{ url_for('privacy') }}">Privacy Policy</a>
```

## Step 6: Testing Locally

Before deploying, test your changes locally:

1. Activate your virtual environment
2. Run the Flask application: `python app.py`
3. Visit http://localhost:5000 in your browser
4. Verify all pages load correctly and all static assets (CSS, JS, images) work

## Step 7: Deploy to Render

1. Commit all changes to your GitHub repository:
   ```
   git add .
   git commit -m "Fix template directory structure"
   git push
   ```

2. In your Render dashboard:
   - Connect to your GitHub repository
   - Set Build Command: `pip install -r requirements.txt`
   - Set Start Command: `gunicorn app:app`
   - Click Deploy

3. Once deployed, check the logs for any errors

## Step 8: Troubleshooting Common Issues

If you still encounter issues after following the steps above, try these troubleshooting tips:

### Issue: Templates still not found

1. **Check file permissions**:
   Make sure all directories and files have the correct permissions.

   ```bash
   chmod -R 755 templates/
   chmod -R 755 static/
   ```

2. **Verify file paths are correct**:
   Ensure there are no typos in directory or file names. Flask is case-sensitive!

3. **Try using absolute paths**:
   ```python
   import os
   
   # Get the absolute path to the directory containing this file
   BASE_DIR = os.path.abspath(os.path.dirname(__file__))
   
   # Configure Flask app
   app = Flask(__name__, 
               template_folder=os.path.join(BASE_DIR, 'templates'),
               static_folder=os.path.join(BASE_DIR, 'static'))
   ```

4. **Check for hidden characters**:
   Some editors add hidden characters that can cause issues. Try re-saving your files with a different editor.

### Issue: Static files not loading

1. **Inspect browser network tab**:
   Use your browser's developer tools to see if static files are being requested correctly and what status codes they return.

2. **Check render logs**:
   Look for 404 errors related to static files in your Render logs.

3. **Verify static route works**:
   Make sure your app has a route to serve static files:

   ```python
   @app.route('/static/<path:path>')
   def serve_static(path):
       return send_from_directory('static', path)
   ```

### Issue: Blank page or server error

1. **Enable debug mode temporarily**:
   Set `debug=True` in your app.run() statement to see more detailed error messages.

2. **Check syntax errors**:
   Ensure there are no syntax errors in your templates or Python code.

3. **Verify all dependencies are installed**:
   Make sure all required packages are in your requirements.txt file.

4. **Check environment variables**:
   Verify that any environment variables your app depends on are properly set in Render.

## Final Steps for Production

Before finalizing your deployment, consider these best practices:

1. **Set Debug Mode to False**:
   Ensure debug mode is disabled in production:
   ```python
   app.run(debug=False)
   ```

2. **Add Error Handling**:
   Implement custom error pages for common HTTP errors:
   ```python
   @app.errorhandler(404)
   def page_not_found(e):
       return render_template('404.html'), 404
   
   @app.errorhandler(500)
   def server_error(e):
       return render_template('500.html'), 500
   ```

3. **Setup Logging**:
   Configure proper logging to help diagnose issues:
   ```python
   import logging
   logging.basicConfig(level=logging.INFO)
   ```

4. **Setup HTTPS**:
   Render provides HTTPS by default, but make sure your application doesn't reference any resources over HTTP.

5. **Add Security Headers**:
   Consider adding security headers to your responses.

## Conclusion

By following this guide, you should be able to successfully deploy your InsectiScan website to Render without the "TemplateNotFound" error. Remember that the most critical part is ensuring the correct directory structure with HTML files in the 'templates' directory and static files in the 'static' directory.

If you continue to experience issues, feel free to reach out for support or consult the [Flask Documentation](https://flask.palletsprojects.com/) and [Render Docs](https://render.com/docs).
