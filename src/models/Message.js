const db = require('../config/db');

const Message = {
  async create({ sender_id, receiver_id, text, image_url, file_url }) {
  const time_sent = new Date(); // Hoặc dùng dayjs().toISOString()
  const [result] = await db.query(
    `INSERT INTO messages (sender_id, receiver_id, text, image_url, file_url, time_sent)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [sender_id, receiver_id, text, image_url, file_url, time_sent]
  );
  return { id: result.insertId, time_sent };
},


  async getByUsers(userId1, userId2) {
    const [rows] = await db.query(
      `SELECT * FROM messages WHERE 
      (sender_id = ? AND receiver_id = ?) OR 
      (sender_id = ? AND receiver_id = ?)
      ORDER BY time_sent ASC`,
      [userId1, userId2, userId2, userId1]
    );
    return rows;
  }
};

module.exports = Message;
