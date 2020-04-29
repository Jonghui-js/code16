const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('title', 'Title is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        mbti: user.mbti,
        user: req.user.id,
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.put(
  '/:id',
  [
    auth,
    [
      check('text', 'Text is required').not().isEmpty(),
      check('title', 'Title is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { title: req.body.title, text: req.body.text } },
        { returnNewDocument: true }
      );
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/', async (req, res) => {
  try {
    const mbti = req.query.mbti.toUpperCase(); //? req.query.mbti.toUpperCase() : req.query.mbti;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const startIndex = (page - 1) * limit;
    const posts = await (mbti === 'ALL'
      ? Post.find().sort({ date: -1 })
      : Post.find({ mbti: mbti }).sort({ date: -1 }));
    const total = Math.ceil(posts.length / limit);
    const currentPosts = await (mbti === 'ALL'
      ? Post.find().sort({ date: -1 }).skip(startIndex).limit(limit)
      : Post.find({ mbti: mbti })
          .sort({ date: -1 })
          .skip(startIndex)
          .limit(limit));
    const loading = false;
    res.status(200).json({ currentPosts, total, loading });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: '존재하지 않는 글입니다' });
    }
    const result = post;
    res.json(result);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '존재하지 않는 글입니다' });
    }
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: '존재하지 않는 글입니다' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: '존재하지 않는 글입니다' });
    }
    res.status(500).send('Server error');
  }
});

router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        mbti: user.mbti,
        user: req.user.id,
      };
      post.comments.unshift(newComment);

      await post.save();
      res.status(200).json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!댓글 수정
router.put(
  '/comment/:id/:comment_id',
  [auth, [check('commentText', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      /*
      const post = await Post.findById(req.params.id);
      const comment = post.comments.find(
        (comment) => comment.id === req.params.comment_id
      );
      if (!comment) {
        return res.status(404).json({ msg: '댓글이 존재하지 않습니다.' });
      }
      if (comment.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: '권한이 없습니다.' });
      }*/
      console.log(req.body.commentText);
      const post = await Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { 'comments.$[elem].text': req.body.commentText } },
        { new: true, arrayFilters: [{ 'elem._id': req.params.comment_id }] }
      );
      await post.save();

      res.status(200).json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: '댓글이 존재하지 않습니다.' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: '권한이 없습니다.' });
    }

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);
    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});
module.exports = router;
