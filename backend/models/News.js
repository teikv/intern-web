const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
    title: String,
    date: String, // Hoặc Date nếu cần định dạng ngày tháng
    content: String,
    description: String,
    image_url: String,
    link: String,
});

module.exports = mongoose.model("News", NewsSchema);
