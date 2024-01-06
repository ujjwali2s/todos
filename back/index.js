// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path =require("path")
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();


// Middleware
app.use(cors({
  origin: 'https://todos-lemon-six.vercel.app/',
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://library:CTKqVpXO6o4laGb@cluster0.zrilhaz.mongodb.net/todos"  , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/api/v1/todos', todoRoutes);

//build
app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "front", "build")));
  res.sendFile(path.resolve(__dirname, "front", "build", "index.html"));
});
// Start server
app.listen(5000, () => {
  console.log("server is running");
});
