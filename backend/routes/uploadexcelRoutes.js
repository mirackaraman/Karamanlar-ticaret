const express = require("express");
const multer = require("multer");
const XLSX = require("xlsx");
const Product = require("../models/Product");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/products", protect, admin, upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Dosya yok" });

    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const productsToInsert = data.map((row) => ({
      name: row.name,
      price: row.price,
      description: row.description || "",
      countInStock: row.countInStock || 0,
      category: row.category || "Genel",
      image: row.image || "",
    }));

    await Product.insertMany(productsToInsert);
    res.json({ message: "✅ Ürünler başarıyla eklendi", count: productsToInsert.length });
  } catch (error) {
    console.error("Excel yükleme hatası:", error);
    res.status(500).json({ message: "❌ Yükleme sırasında hata oluştu" });
  }
});

module.exports = router;
