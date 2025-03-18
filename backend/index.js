const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(cors());
app.use(express.json());

// Import route
app.use('/api/auth', authRoutes);

const newsRoutes = require("./routes/news");
app.use("/api", newsRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
