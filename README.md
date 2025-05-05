# InsectiScan

InsectiScan is a mobile application that identifies and diagnoses insect bites based on user-provided images and descriptions. This repository contains the code for the InsectiScan website, which provides information about the app and download links.

## Website Overview

The InsectiScan website is designed to:

- Showcase the app's features and benefits
- Provide download links for iOS and Android platforms
- Share user testimonials and information about the app
- Offer easy navigation to resources and contact information

## Features

- Responsive design that works on all devices
- Clean, user-friendly interface with a blue and green theme
- Smooth scrolling navigation
- Download buttons for different platforms
- Information about the app's features and how it works

## Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Python with Flask
- **Deployment**: Compatible with various hosting platforms

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

### Installation

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

## Directory Structure

```
insectiscan/
├── app.py              # Flask application
├── static/             # Static files
│   ├── css/            # CSS stylesheets
│   │   └── styles.css  # Main stylesheet
│   ├── js/             # JavaScript files
│   │   └── script.js   # Main JavaScript file
│   └── img/            # Images and assets
├── templates/          # HTML templates
│   ├── index.html      # Main page template
│   ├── privacy.html    # Privacy policy template
│   └── terms.html      # Terms of service template
└── requirements.txt    # Python dependencies
```

## Deployment

The website is ready to be deployed on any platform that supports Flask applications, such as:

- Heroku
- AWS Elastic Beanstalk
- Google Cloud Platform
- DigitalOcean

Follow the deployment instructions for your chosen platform.

## Customization

To customize the website:

1. Modify the HTML files in the `templates` directory
2. Update styles in `static/css/styles.css`
3. Adjust scripts in `static/js/script.js`
4. Replace placeholder images with your own in the `static/img` directory

## Contact

For questions or suggestions, please contact info@insectiscan.org or visit [insectiscan.org](https://insectiscan.org).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
