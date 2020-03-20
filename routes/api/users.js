const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

//POST signup form - 회원 가입하기
router.post(
  '/',
  [
    check('name', '아이디를 작성해주세요')
      .not()
      .isEmpty(),
    check('mbti', 'MBTI 유형을 선택하세요')
      .not()
      .isEmpty(),

    check('email', '이메일 형식에 맞게 작성해주세요').isEmail(),
    check('password', '비밀번호는 6자 이상으로 설정해주세요').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, mbti, password } = req.body;

    try {
      //see if user exists
      let existingEmail = await User.findOne({ email });
      let existingName = await User.findOne({ name });
      if (existingEmail) {
        return res
          .status(400)
          .json({ errors: [{ msg: '같은 이메일 계정이 이미 존재합니다' }] });
      }
      if (existingName) {
        return res
          .status(400)
          .json({ errors: [{ msg: '같은 ID 계정이 이미 존재합니다' }] });
      }

      user = new User({
        name,
        email,
        mbti,
        password
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
