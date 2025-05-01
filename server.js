const express = require('express');
const NodeCache = require('node-cache');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Cache with 5 min TTL
const cache = new NodeCache({ stdTTL: 300 });

app.post('/check-slots', async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
    }

    const cachedData = cache.get(userId);

    if (cachedData) {
        console.log(`Serving cached data for user ${userId}`);
        return res.json({ source: 'cache', unavailableSlots: cachedData });
    }

    // Simulate fetching from real calendar API
    const fetchedSlots = await getUnavailableSlotsFromRealAPI();

    cache.set(userId, fetchedSlots);

    console.log(`Fetched new data for user ${userId}`);
    res.json({ source: 'fresh', unavailableSlots: fetchedSlots });
});

// Mock function (replace with real API call logic later)
async function getUnavailableSlotsFromRealAPI() {
    return ["2025-04-30T09:00", "2025-04-30T13:00"]; // Example dummy data
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//dev: Momena Akhtar (2025)


