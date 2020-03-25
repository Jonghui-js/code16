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

/*
  const mbtiType = [
    'ISTJ',
    'ISFJ',
    'INFJ',
    'INTJ',
    'ISTP',
    'ISFP',
    'INFP',
    'INTP',
    'ESTP',
    'ESFP',
    'ENFP',
    'ENTP',
    'ESTJ',
    'ESFJ',
    'ENFJ',
    'ENTJ'
  ];
  */

/*
router.get('/', async (req, res) => {
  const users = await User.find({}, { mbti: 1 });
  console.log(users);

  let ISTJ = 0;
  let ISFJ = 0;
  let INFJ = 0;
  let INTJ = 0;
  let ISTP = 0;
  let ISFP = 0;
  let INFP = 0;
  let INTP = 0;
  let ESTP = 0;
  let ESFP = 0;
  let ENFP = 0;
  let ENTP = 0;
  let ESTJ = 0;
  let ESFJ = 0;
  let ENFJ = 0;
  let ENTJ = 0;

  await users.map(user => {
    if (user.mbti === 'ISTJ') {
      ISTJ += 1;
    }
    if (user.mbti === 'ISFJ') {
      ISFJ += 1;
    }
    if (user.mbti === 'INFJ') {
      INFJ += 1;
    }
    if (user.mbti === 'INTJ') {
      INTJ += 1;
    }
    if (user.mbti === 'ISTP') {
      ISTP += 1;
    }
    if (user.mbti === 'ISFP') {
      ISFP += 1;
    }
    if (user.mbti === 'INFP') {
      INFP += 1;
    }
    if (user.mbti === 'INTP') {
      INTP += 1;
    }
    if (user.mbti === 'ESTP') {
      ESTP += 1;
    }
    if (user.mbti === 'ESFP') {
      ESFP += 1;
    }
    if (user.mbti === 'ENFP') {
      ENFP += 1;
    }
    if (user.mbti === 'ENTP') {
      ENTP += 1;
    }
    if (user.mbti === 'ESTJ') {
      ESTJ += 1;
    }
    if (user.mbti === 'ESFJ') {
      ESFJ += 1;
    }
    if (user.mbti === 'ENFJ') {
      ENFJ += 1;
    }
    if (user.mbti === 'ENTJ') {
      ENTJ += 1;
    }
  });

  const mbti = {
    ISTJ,
    ISFJ,
    INFJ,
    INTJ,
    ISTP,
    ISFP,
    INFP,
    INTP,
    ESTP,
    ESFP,
    ENFP,
    ENTP,
    ESTJ,
    ESFJ,
    ENFJ,
    ENTJ
  };
  res.status(200).json(mbti);
});
*/
module.exports = router;
