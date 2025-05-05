# InsectiScan

InsectiScan is a mobile application that identifies and diagnoses insect bites based on user-provided images and descriptions. This repository contains the code for the InsectiScan website.

## Deployment Fix

If you're encountering the `TemplateNotFound: index.html` error when deploying to Render, follow these steps:

1. Make sure your project follows this directory structure:
```
insectiscan/
├── app.py                # Flask application
├── requirements.txt      # Python dependencies
├── static/               # Create this directory for static files
│   ├── css/              
│   │   └── styles.css    
│   ├── js/               
│   │   └── script.js     
│   └── img/              
│       └── ...           # Image files
├── templates/            # Create this directory for HTML templates
│   ├── index.html        # Main page template
│   ├── privacy.html      # Privacy policy template
│   └── terms.html        # Terms of service template
```

2. Make sure your `app.py` file correctly specifies the template and static folders:

```python
app.template_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'templates')
app.static_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'static')
```

3. Verify that all HTML files are in the `templates` directory.

4. Verify that all CSS, JS, and image files are in the appropriate subdirectories within the `static` directory.

5. Update paths in your HTML files to reference static content correctly:
```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/styles.css') }}">
<script src="{{ url_for('static', filename='js/script.js') }}"></script>
<img src="{{ url_for('static', filename='img/logo.png') }}" alt="Logo">
```

## Development Setup

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/insectiscan.git
   cd insectiscan
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Run the application:
   ```
   python app.py
   ```

6. Open your browser and navigate to `http://localhost:5000`

## Deployment to Render

1. Push your changes to GitHub with the correct directory structure.

2. In your Render dashboard, select "Web Service" and connect to your GitHub repository.

3. Configure your service:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`

4. Once deployed, verify that the site loads correctly.

## Troubleshooting

If you still encounter the error after following these steps, check the following:

1. Ensure all files have the correct permissions.
2. Verify that there are no syntax errors in your templates.
3. Check the Render logs for any specific error messages.
4. Try using absolute paths if relative paths are not working.

## Contact

For questions or support, contact us at info@insectiscan.org.
