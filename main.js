const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// API Endpoint
app.post('/api/sort-characters', (req, res) => {
    try {
        const inputString = req.body.data;
        
        if (typeof inputString !== 'string') {
            return res.status(400).json({ error: 'Invalid input: "data" must be a string' });
        }
        
        const charArray = inputString.split('');
        const sortedArray = charArray.sort();
        
        res.json({ word: sortedArray });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
});

// Export for Vercel
module.exports = app;

// Local development
if (require.main === module) {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}