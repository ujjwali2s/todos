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
  // origin:'https://ujjwaltodos.vercel.app'
}));
app.get("/",(re,req)=>{
  res.send("Hell it`s working")
}
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/auth', authRoutes);
app.use('/todos', todoRoutes);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port `);
});
