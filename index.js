require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIo = require('socket.io'); // ⚠️ Thêm dòng này
const initSocket = require("./socket");

const authRoutes = require('./src/routes/authRoutes');
const usersRoutes = require('./src/routes/usersRoutes');
const friendRoutes = require('./src/routes/friendRoutes');
const messageRoutes = require("./src/routes/messageRoutes");
const notificationsRoutes = require("./src/routes/notificationsRoutes");
const adminRoutes = require('./src/routes/adminRoutes');
const resetPasswordRoutes = require("./src/routes/resetPasswordRoutes");
const ggRoutes = require('./src/routes/ggRoutes'); 

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } }); // ⚠️ Thêm socketIo

const PORT = process.env.PORT || 3009;

// Middleware
app.use(cors());
app.use(express.json());


// Inject io vào req để dùng trong controller nếu cần
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/friend', friendRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api", notificationsRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api", resetPasswordRoutes);
app.use('/auth', ggRoutes); 

app.get('/', (req, res) => {
  res.send('Hello Express!');
});

// Init Socket.IO
initSocket(io);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
