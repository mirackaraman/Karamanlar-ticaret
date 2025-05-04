const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth");
const AdminLog = require("../models/AdminLog");

// ✅ Admin loglarını getir (sıralı)
router.get("/logs", protect, admin, async (req, res) => {
  try {
    const logs = await AdminLog.find()
      .populate("adminUser", "name email")
      .sort({ createdAt: -1 })
      .limit(100); // opsiyonel: son 100 log

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Log verileri alınamadı" });
  }
});

module.exports = router;
