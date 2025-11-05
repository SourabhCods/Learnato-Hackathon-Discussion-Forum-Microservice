import { Router } from 'express';
import Post from '../models/Post.js';

export default ({ io }) => {
  const router = Router();

  // Create post
  router.post('/', async (req, res, next) => {
    try {
      const { title, content, author } = req.body;
      const post = await Post.create({ title, content, author });
      io.emit('post:created', post);
      res.status(201).json(post);
    } catch (e) { next(e); }
  });

  // List posts with sort & search
  router.get('/', async (req, res, next) => {
    try {
      const { sort = 'date', q } = req.query;
      const query = q ? { $or: [
        { title: { $regex: q, $options: 'i' } },
        { content: { $regex: q, $options: 'i' } }
      ]} : {};

      const sortMap = {
        date: { createdAt: -1 },
        votes: { votes: -1, createdAt: -1 }
      };

      const posts = await Post.find(query).sort(sortMap[sort] || sortMap.date);
      res.json(posts);
    } catch (e) { next(e); }
  });

  // Get single post
  router.get('/:id', async (req, res, next) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      res.json(post);
    } catch (e) { next(e); }
  });

  // Add reply
  router.post('/:id/reply', async (req, res, next) => {
    try {
      const { content, author } = req.body;
      const post = await Post.findById(req.params.id);
      if (!post) return res.status(404).json({ error: 'Post not found' });
      const reply = { content, author };
      post.replies.push(reply);
      await post.save();
      io.emit('reply:created', { postId: post._id, reply: post.replies.at(-1) });
      res.status(201).json(post);
    } catch (e) { next(e); }
  });

  // Upvote post
  router.post('/:id/upvote', async (req, res, next) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { votes: 1 } },
        { new: true }
      );
      if (!post) return res.status(404).json({ error: 'Post not found' });
      io.emit('post:updated', post);
      res.json(post);
    } catch (e) { next(e); }
  });

  // Mark as answered
  router.post('/:id/mark-answered', async (req, res, next) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: { isAnswered: true } },
        { new: true }
      );
      if (!post) return res.status(404).json({ error: 'Post not found' });
      io.emit('post:updated', post);
      res.json(post);
    } catch (e) { next(e); }
  });

  return router;
};
