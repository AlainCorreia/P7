const Post = require('../models/Post');
const fs = require('fs');

const isGranted = (post, auth) => {
  return post.author._id.toHexString() === auth.userId || auth.isAdmin;
};

const deletePicture = (filename) => {
  fs.unlink(`images/posts/${filename}`, (error) => {
    if (error) throw error;
  });
};

const getFileUrl = (req) => {
  return `${req.protocol}://${req.get('host')}/images/posts/${
    req.file.filename
  }`;
};

const getFilename = (post) => {
  return post.pictureUrl.split('/posts/')[1];
};

exports.createPost = (req, res) => {
  const post = new Post({
    text: req.body.text,
    author: req.auth.userId,
    pictureUrl: req.file !== undefined ? getFileUrl(req) : '',
    editedBy: req.auth.userId,
  });

  if (!post.text && !req.file) {
    return res
      .status(400)
      .json({ message: 'Le post doit contenir du texte et/ou une image.' });
  } else {
    post
      .save()
      .then((docs) =>
        res.status(201).json({ message: 'Post enregistré.', docs })
      )
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.getPosts = (req, res) => {
  const skip = req.query.skip && /^\d+$/.test(req.query.skip) ? Number(req.query.skip) : 0;

  Post.find()
    .populate('author', 'username')
    .populate('editedBy', 'username')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(10)
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    const data = {
      text: req.body.text,
      _id: req.params.id,
      editedBy: req.auth.userId,
      lastEdited: new Date(),
    };

    if (!isGranted(post, req.auth)) {
      if (req.file) {
        deletePicture(req.file.filename);
      }
      return res.status(403).json({ error: 'Requête non autorisée.' });
    }

    if (post.pictureUrl && (!req.body.image || req.file)) {
      deletePicture(getFilename(post));
    }

    if (req.file) {
      data.pictureUrl = getFileUrl(req);
    } else if (!req.body.image) {
      data.pictureUrl = '';
    }

    Post.findByIdAndUpdate(req.params.id, data, { new: true })
      .populate('author', 'username')
      .populate('editedBy', 'username')
      .then((docs) => {
        res.status(200).json({ message: 'Post modifié.', docs });
      })
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    const data = {
      _id: req.params.id,
    };

    let message = '';

    switch (req.body.like) {
      case 0:
        if (post.likes.includes(req.auth.userId)) {
          data.$pull = { likes: req.auth.userId };
          message = 'Like annulé.';
        } else {
          return res.status(400).json({ error: 'Requête invalide.' });
        }
        break;

      case 1:
        if (post.likes.includes(req.auth.userId)) {
          return res.status(400).json({ error: 'Post déjà liké.' });
        } else {
          data.$push = { likes: req.auth.userId };
          message = 'Post liké.';
        }
        break;

      default:
        return res.status(400).json({ error: 'Invalid request.' });
    }

    Post.findByIdAndUpdate(req.params.id, data, { new: true })
      .then(() => res.status(201).json({ message }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!isGranted)
      return res.status(403).json({ error: 'Requête non autorisée.' });

    if (post.pictureUrl) {
      deletePicture(getFilename(post));
    }

    Post.deleteOne({ _id: req.params.id })
      .then(() => res.status(201).json({ message: 'Post supprimé.' }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(404).json({ error });
  }
};
