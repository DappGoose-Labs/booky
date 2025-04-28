const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }

    // Parse the request body
    const requestBody = JSON.parse(event.body);
    const { prompt, modelId, stream } = requestBody;

    // Validate required parameters
    if (!prompt || !modelId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters: prompt and modelId' })
      };
    }

    // Get the API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'API key not configured' })
      };
    }

    // Construct the request to Gemini API
    const geminiRequestBody = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 60
      }
    };

    // Determine the URL based on whether streaming is requested
    const baseUrl = `https://generativelanguage.googleapis.com/v1/models/${modelId}`;
    const url = stream 
      ? `${baseUrl}:streamGenerateContent?key=${apiKey}`
      : `${baseUrl}:generateContent?key=${apiKey}`;

    // Call the Gemini API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(geminiRequestBody)
    });

    // Handle API errors
    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        headers,
        body: JSON.stringify({ 
          error: `Gemini API Error: ${response.statusText}`,
          details: errorData
        })
      };
    }

    // For non-streaming responses, return the JSON data
    if (!stream) {
      const data = await response.json();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(data)
      };
    }

    // For streaming responses, read the response and return it as-is
    // Note: Netlify Functions don't support streaming responses directly
    // This is a limitation we'll need to address
    const responseText = await response.text();
    return {
      statusCode: 200,
      headers,
      body: responseText
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal Server Error', message: error.message })
    };
  }
};