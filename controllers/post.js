const Post = require('../models/Post');

exports.createPost = (req, res) => {
  const post = new Post({
    text: req.body.text,
    author: req.auth.userId,
    picture:
      req.file !== undefined
        ? `${req.protocol}://${req.get('host')}/images/posts/${
            req.file.filename
          }`
        : '',
  });
  post
    .save()
    .then(() => res.status(201).json({ message: 'Post enregistré.' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getPosts = (req, res) => {
  Post.find()
    .populate('author', 'username')
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};


