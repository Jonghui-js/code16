const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const Post = require('../../models/Post');

//GET all my contents - 내 글, 댓글 가져오기
router.get('/', auth, async (req, res) => {
  try {
    const myposts = await Post.find({ user: req.user.id }).sort({
      date: -1,
    });
    const mycomments = await Post.find(
      {
        comments: { $elemMatch: { user: req.user.id } },
      },
      {
        comments: {
          $elemMatch: { user: req.user.id },
        },
        'comments.text': true,
        'comments.date': true,
      }
    ).sort({
      date: -1,
    });
    const myContent = { myposts, mycomments };

    res.json(myContent);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.put(
  '/',
  auth,
  [
    check('email', '유효한 이메일이 아닙니다.').isEmail(),
    check('name', '아이디를 작성해주세요').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, mbti } = req.body;
    let user = await User.findById(req.user.id);
    let existingName = await User.findOne({ name });
    let existingEmail = await User.findOne({ email });
    if (existingName && user.name !== name) {
      return res
        .status(400)
        .json({ errors: [{ msg: '같은 ID 계정이 이미 존재합니다' }] });
    }
    if (existingEmail && user.email !== email) {
      return res
        .status(400)
        .json({ errors: [{ msg: '같은 이메일 계정이 이미 존재합니다' }] });
    }

    try {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { name: name, email: email, mbti: mbti },
        {
          new: true,
        }
      ).select('-password');

      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

//DELETE user - 계정 삭제하기
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
