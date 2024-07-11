const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const auctionRoutes = require('./routes/AuctionRoutes')


const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
mongoose.connect('mongodb+srv://snehithachaluvadi:snehitha@cluster0.6pepwuv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// // Connect to MongoDB
// mongoose.connect('mongodb+srv://test:12345@cluster0.v7jlqnt.mongodb.net/data');
// const connection = mongoose.connection;

// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully');
// });

// Routes
app.use('/', authRoutes);
app.use("/auctionRoute", auctionRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});