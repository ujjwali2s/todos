// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes.js');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();


// Middleware
app.use(cors({
  origin: 'https://ujjwaltodos.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  allowedHeaders: 'Content-Type', // Add this line to allow the Content-Type header
}));

app.get("/", (req, res) => {
  res.status(200).send("Hello, it's working");
});

app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb+srv://library:CTKqVpXO6o4laGbL@cluster0.zrilhaz.mongodb.net/todos" , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Start server
app.listen(5000, () => {
  console.log(`Server is running on port `);
});
