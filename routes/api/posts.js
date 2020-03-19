const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Post = require('../../models/Post');
const User = require('../../models/User');

//글올리기 /create-post component={PostForm}

router.post(
  '/',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
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
        user: req.user.id
      });

      const post = await newPost.save();
      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

//글 수정하기
router.put(
  '/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
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

//글목록 가져오기.
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

// 현재페이지 글 가져오기

router.get('/pages/:page', auth, async (req, res) => {
  try {
    const currentPage = req.params.page == 'undefined' ? 1 : req.params.page;
    const posts = await Post.find().sort({ date: -1 });
    const totalPosts = posts.length;
    const totalPages = Math.ceil(totalPosts / 15);
    const currentPosts = await Post.find()
      .sort({ date: -1 })
      .skip((currentPage - 1) * 15)
      .limit(15);

    res.json({ totalPages, currentPosts, currentPage });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;

//하나의 글을 가져오기.

router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

//내글 삭제하기
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await post.remove();

    res.json({ msg: 'Post removed' });
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error');
  }
});

//@route    Post api/posts/comment/:id
//@decs     Comment on a post
//@access   Private
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
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
        user: req.user.id
      };

      post.comments.unshift(newComment);

      await post.save();
      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route    DELETE api/posts/comment/:id/:comment_id
//@decs     Delete comment
//@access   Private

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not asthorized' });
    }

    const removeIndex = post.comments
      .map(comment => comment.user.toString())
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
