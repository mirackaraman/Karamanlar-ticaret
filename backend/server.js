const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");

const uploadRoutes = require("./routes/uploadRoutes");
const { protect, admin } = require("./middleware/auth");
const feedbackRoutes = require("./routes/feedbackRoutes");
const excelUploadRoutes = require("./routes/excelUploadRoutes");
const settingsRoutes = require("./routes/settingsRoutes");
const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/uploadexcel", excelUploadRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Test route (opsiyonel)
app.get("/api/admin", protect, admin, (req, res) => {
  res.json({ message: "Admin Paneli" });
});

app.get("/", (req, res) => {
  res.send("✅ Backend API çalışıyor!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Sunucu çalışıyor: http://localhost:${PORT}`);
});
