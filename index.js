const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const auctionRoutes = require('./routes/AuctionRoutes');
require('dotenv').config();
 // ✅ load env variables

const app = express();
const PORT = process.env.PORT || 8000;

// ✅ Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected ✅'))
.catch(err => console.error('MongoDB connection error:', err));

// ✅ Optional test route
app.get("/", (req, res) => {
  res.send("Backend is working ✅");
});

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/auctions', auctionRoutes);

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
