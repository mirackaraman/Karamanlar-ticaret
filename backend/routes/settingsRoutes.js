const express = require("express");
const router = express.Router();
const Setting = require("../models/Setting");
const { verifyAdmin } = require("../middleware/auth"); // JWT admin kontrol middleware’in varsa

// GET hedefi al
router.get("/sales-goal", async (req, res) => {
  const setting = await Setting.findOne();
  res.json({ salesGoal: setting?.salesGoal || 20000 });
});

// PUT hedefi güncelle
router.put("/sales-goal", verifyAdmin, async (req, res) => {
  const { salesGoal } = req.body;
  let setting = await Setting.findOne();
  if (!setting) {
    setting = new Setting({ salesGoal });
  } else {
    setting.salesGoal = salesGoal;
  }
  await setting.save();
  res.json({ salesGoal: setting.salesGoal });
});

module.exports = router;
