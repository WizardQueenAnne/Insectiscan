#!/usr/bin/env python3
"""
Setup script to create the proper directory structure for the InsectiScan Flask app.
This script will create necessary directories and move files to their proper locations.
"""

import os
import shutil
import sys

def create_directory(path):
    """Create directory if it doesn't exist."""
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Created directory: {path}")
    else:
        print(f"Directory already exists: {path}")

def main():
    """Main function to set up directory structure."""
    # Define the directories we need
    directories = [
        'templates',
        'static',
        'static/css',
        'static/js',
        'static/img'
    ]
    
    # Create directories
    for directory in directories:
        create_directory(directory)
    
    # Move HTML files to templates directory
    html_files = [f for f in os.listdir('.') if f.endswith('.html')]
    for html_file in html_files:
        destination = os.path.join('templates', html_file)
        if not os.path.exists(destination):
            try:
                shutil.move(html_file, destination)
                print(f"Moved {html_file} to templates directory")
            except Exception as e:
                print(f"Error moving {html_file}: {e}")
        else:
            print(f"File already exists in templates directory: {html_file}")
    
    # Move CSS files to static/css directory
    css_files = [f for f in os.listdir('.') if f.endswith('.css')]
    for css_file in css_files:
        destination = os.path.join('static/css', css_file)
        if not os.path.exists(destination):
            try:
                shutil.move(css_file, destination)
                print(f"Moved {css_file} to static/css directory")
            except Exception as e:
                print(f"Error moving {css_file}: {e}")
        else:
            print(f"File already exists in static/css directory: {css_file}")
    
    # Move JavaScript files to static/js directory
    js_files = [f for f in os.listdir('.') if f.endswith('.js') and f != 'setup_directory.py']
    for js_file in js_files:
        destination = os.path.join('static/js', js_file)
        if not os.path.exists(destination):
            try:
                shutil.move(js_file, destination)
                print(f"Moved {js_file} to static/js directory")
            except Exception as e:
                print(f"Error moving {js_file}: {e}")
        else:
            print(f"File already exists in static/js directory: {js_file}")
    
    # Move image files to static/img directory
    img_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.ico']
    img_files = [f for f in os.listdir('.') if any(f.endswith(ext) for ext in img_extensions)]
    for img_file in img_files:
        destination = os.path.join('static/img', img_file)
        if not os.path.exists(destination):
            try:
                shutil.move(img_file, destination)
                print(f"Moved {img_file} to static/img directory")
            except Exception as e:
                print(f"Error moving {img_file}: {e}")
        else:
            print(f"File already exists in static/img directory: {img_file}")
    
    print("\nDirectory setup complete!")
    print("Next steps:")
    print("1. Update your app.py file to explicitly set template and static folders")
    print("2. Update your HTML files to use url_for() for static file references")
    print("3. Test your application locally before deploying")

if __name__ == "__main__":
    main()
