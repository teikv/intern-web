const express = require("express");
const News = require("../models/News"); // Import model News
const router = express.Router();

// API lấy danh sách tin tức AI từ MongoDB
router.get("/news", async (req, res) => {
    try {
        const news = await News.find().sort({ date: -1 }); // Sắp xếp theo ngày mới nhất
        res.json(news);
    } catch (error) {
        res.status(500).json({ message: "Lỗi server!" });
    }
});

module.exports = router;
