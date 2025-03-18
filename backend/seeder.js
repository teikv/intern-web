const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require("fs");
const connectDB = require("./config/db.js");
const User = require("./models/User.js");
const News = require("./models/News.js");

dotenv.config(); 

connectDB();

const user = {
    name: "Hekate",
    email: "test@example.com",
    password: "$2a$12$38o/0n3CSTT5087q31FjjeDFjo/mblQ8m7ZLf80GeA88KJrcl3nEi",
};

const newsData = JSON.parse(fs.readFileSync("./data/news.json", "utf-8"));

const seedDatabase = async () => {
    try {
        console.log("🗑 Xóa dữ liệu cũ...");
        await User.deleteMany();
        await News.deleteMany();

        console.log("🔹 Tạo User...");
        const createdUser = await User.create(user);

        console.log("📰 Tạo News...");
        const newsWithUser = newsData.map((item) => ({
            ...item,
            author: createdUser._id,
        }));
        await News.insertMany(newsWithUser);

        console.log("✅ Seed thành công!");
        console.log("Test account: Hekate, email: test@example.com , password: 123456");
        mongoose.connection.close();
    } catch (err) {
        console.error(err);
        mongoose.connection.close();
    }
};

seedDatabase();
