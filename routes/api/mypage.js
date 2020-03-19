const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

//내 글 가져오기
router.get('/:name', auth, async (req, res) => {
  try {
    const myposts = await Post.find({ name: req.params.name }).sort({
      date: -1
    });
    const mycomments = await Post.find(
      {
        comments: { $elemMatch: { name: req.params.name } }
      },
      {
        comments: true
      }
    ).sort({
      date: -1
    });
    const mycontents = { myposts, mycomments };
    res.json(mycontents);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

//계정 삭제
router.delete('/', auth, async (req, res) => {
  try {
    await Post.deleteMany({ user: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: '회원탈퇴가 완료되었습니다.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error..');
  }
});

module.exports = router;
