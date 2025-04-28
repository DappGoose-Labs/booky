# AI Ebook Creator

A web application that uses the Google Gemini API to generate professionally formatted ebooks based on user input. This application is designed with security in mind, using serverless functions to protect API keys.

## Features

- User-friendly interface for inputting ebook details
- Secure API key handling through serverless functions
- Outline generation and review
- Full ebook content generation
- Markdown formatting for professional output
- Dark/light mode support
- Copy functionality for easy export

## Deployment Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or newer)
- [Netlify CLI](https://docs.netlify.com/cli/get-started/) (installed globally or via npx)
- A Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Local Development

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
4. Start the development server:
   ```
   npm run dev
   ```
5. Open your browser to the URL shown in the terminal (typically http://localhost:8888)

### Deploying to Netlify

1. Create a Netlify account if you don't have one
2. Deploy using Netlify CLI:
   ```
   netlify deploy
   ```
3. Follow the prompts to create a new site or select an existing one
4. Set the build directory to the current directory (.)
5. Once deployed, set up the environment variable in the Netlify dashboard:
   - Go to Site settings > Environment variables
   - Add a new variable named `GEMINI_API_KEY` with your API key as the value
6. Redeploy with the production flag:
   ```
   netlify deploy --prod
   ```

Alternatively, you can deploy directly from the Netlify website:

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. Log in to Netlify and click "New site from Git"
3. Connect to your repository and select it
4. Set the build command to `npm run build` (or leave blank)
5. Set the publish directory to `.`
6. Click "Deploy site"
7. After deployment, add your environment variable in Site settings > Environment variables

## Security Considerations

This application uses serverless functions to securely handle API calls to the Gemini API. The API key is stored as an environment variable on the server and is never exposed to the client.

## License

MIT