const express = require('express');
const router = express.Router();
const User = require('../../models/User');

router.get('/', async (req, res) => {
  try {
    const main = await User.aggregate([
      {
        $group: {
          _id: '$mbti',
          count: { $sum: 1 }
        }
      }
    ]).sort({ count: -1 });
    let loading = false;
    res.json({ main, loading });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ success: false });
  }
});
module.exports = router;
