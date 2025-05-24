const socket = (io) => {
  io.on('connection', (socket) => {
    
    socket.on("joinNotificationRoom", (userId) => {
      socket.join(`notification-${userId}`);
    });
    
    socket.on('joinRoom', (userId) => {
      socket.join(`chat-${userId}`);
    });

    socket.on('disconnect', () => {
      
    });
  });
};

module.exports = socket;
