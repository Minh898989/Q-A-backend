require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const authRoutes = require('./src/routes/authRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const friendRoutes = require('./src/routes/friendRoutes');

const app = express();
const server = http.createServer(app); // ⚠️ Dòng này bị thiếu

const PORT = process.env.PORT || 3009;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/friend', friendRoutes);

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// Start server
server.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
