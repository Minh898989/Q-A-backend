const usersInRoom = {}; // roomId => [ { peerId, socketId } ]

const socket = (io) => {
  io.on('connection', (socket) => {

    socket.on("joinNotificationRoom", (userId) => {
      socket.join(`notification-${userId}`);
    });

    socket.on('joinRoom', (userId) => {
      socket.join(`chat-${userId}`);
    });

    socket.on('join-room', ({ roomId, peerId }) => {
      socket.join(roomId);

      // Khởi tạo room nếu chưa có
      if (!usersInRoom[roomId]) {
        usersInRoom[roomId] = [];
      }

      // Thêm user vào room
      usersInRoom[roomId].push({ peerId, socketId: socket.id });

      // Gửi danh sách người đã có mặt cho người mới
      const otherUsers = usersInRoom[roomId]
        .filter(user => user.peerId !== peerId)
        .map(user => user.peerId);

      socket.emit('all-users', otherUsers); // <-- Client sẽ call() từng peerId này

      // Gửi thông báo tới các peer khác để biết có người mới vào
      socket.to(roomId).emit('user-joined', peerId);

      console.log(`📹 Peer ${peerId} joined room ${roomId}`);
    });

    socket.on('disconnect', () => {
      for (const roomId in usersInRoom) {
        const user = usersInRoom[roomId].find(u => u.socketId === socket.id);
        if (user) {
          socket.to(roomId).emit('user-disconnected', user.peerId); // Thông báo rời phòng
        }

        usersInRoom[roomId] = usersInRoom[roomId].filter(user => user.socketId !== socket.id);
        if (usersInRoom[roomId].length === 0) {
          delete usersInRoom[roomId];
        }
      }
    });

  });
};

module.exports = socket;
