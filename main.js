const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint for the character sorting functionality
app.post('/sort-characters', (req, res) => {
    try {
        // Extract the string from the request body
        const inputString = req.body.data;
        
        // Check if data exists and is a string
        if (typeof inputString !== 'string') {
            return res.status(400).json({ error: 'Invalid input: "data" must be a string' });
        }
        
        // Convert string to array of characters
        const charArray = inputString.split('');
        
        // Sort the array alphabetically
        const sortedArray = charArray.sort();
        
        // Return the sorted array as a word in JSON format
        res.json({ word: sortedArray });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});