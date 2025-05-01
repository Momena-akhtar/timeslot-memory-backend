// auth.js
const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: ['https://www.googleapis.com/auth/calendar.readonly'],
});

console.log('Authorize this URL:', authUrl);

app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;
  if (!code) {
    return res.status(400).send('No code query param provided');
  }

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log('Tokens acquired:', tokens);

    res.send('Authorization successful! You can close this window.');
  } catch (err) {
    console.error('Error retrieving tokens:', err);
    res.status(500).send('Error retrieving tokens');
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
    