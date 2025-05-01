// server.js
require('dotenv').config();
const express = require('express');
const { fetchUnavailableSlots } = require('./googleCalender');
const { isCacheValid, getCachedData, updateCache } = require('./cache');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/unavailable-slots', async (req, res) => {
  try {
    if (isCacheValid()) {
      console.log('✅ Returning cached unavailable slots');
      return res.json({ cached: true, slots: getCachedData() });
    }

    const slots = await fetchUnavailableSlots();
    updateCache(slots);
    console.log('🌐 Fetched fresh unavailable slots from Google Calendar');
    res.json({ cached: false, slots });
  } catch (err) {
    console.error('❌ Error:', err);
    res.status(500).send('Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
