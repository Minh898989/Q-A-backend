const Message = require("../models/Message");

exports.getChatHistory = async (req, res) => {
  const { userId, friendId } = req.params;
  try {
    const messages = await Message.getByUsers(userId, friendId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err });
  }
};

exports.sendMessage = async (req, res) => {
  const { sender_id, receiver_id, text } = req.body;
  const image_url = req.fileType === "image" ? `uploads/${req.file.filename}` : null;
  const file_url = req.fileType === "file" ? `uploads/${req.file.filename}` : null;

  // ✅ Khởi tạo thời gian gửi
  const time_sent = new Date();

  try {
    // ✅ Truyền time_sent vào model nếu cần lưu
    const messageId = await Message.create({ sender_id, receiver_id, text, image_url, file_url, time_sent });

    const newMessage = {
      id: messageId,
      sender_id,
      receiver_id,
      text,
      image_url,
      file_url,
      time_sent
    };

    req.io.to(`chat-${receiver_id}`).emit("newMessage", newMessage);
    res.json(newMessage);
  } catch (err) {
    console.error("Lỗi gửi tin nhắn:", err);
    res.status(500).json({ message: "Lỗi khi gửi tin nhắn", error: err });
  }
};
