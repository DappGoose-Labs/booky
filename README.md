# AI Ebook Creator

A web application that uses Google's Gemini API to generate ebooks based on user input. This project is built with HTML, CSS, JavaScript, and Netlify Functions.

## Features

- Create ebooks from simple concept descriptions
- Customize ebook length, style, and target audience
- Review and approve outlines before content generation
- Secure API access through Netlify serverless functions
- Responsive design that works on all devices

## Technology Stack

- Frontend: HTML, CSS, JavaScript
- Styling: Tailwind CSS
- Markdown Rendering: Marked.js
- Backend: Netlify Functions (Node.js)
- API: Google Gemini API

## Deployment

This project is configured for deployment on Netlify.

### Prerequisites

- A Netlify account
- A Google Gemini API key

### Deployment Steps

1. Fork or clone this repository
2. Connect your GitHub repository to Netlify
3. Configure the following environment variable in Netlify:
   - `GEMINI_API_KEY`: Your Google Gemini API key
4. Deploy the site

Netlify will automatically build and deploy the site when changes are pushed to the main branch.

### Local Development

To run this project locally:

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file with your `GEMINI_API_KEY`
4. Run the development server: `npm run dev`

## License

© 2025 DappGoose Labs. All rights reserved.