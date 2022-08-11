const Post = require('../models/Post');
const fs = require('fs');

exports.createPost = (req, res) => {
  const post = new Post({
    text: req.body.text,
    author: req.auth.userId,
    pictureUrl:
      req.file !== undefined
        ? `${req.protocol}://${req.get('host')}/images/posts/${
            req.file.filename
          }`
        : '',
  });
  post
    .save()
    .then((docs) => res.status(201).json({ message: 'Post enregistré.', docs }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getPosts = (req, res) => {
  Post.find()
    .populate('author', 'username')
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((error) => res.status(400).json({ error }));
};

exports.updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (req.file) {
      const postObject = {
        text: req.body.text,
        pictureUrl: `${req.protocol}://${req.get('host')}/images/posts/${
          req.file.filename
        }`,
      };

      if (post.author._id != req.auth.userId && !req.auth.isAdmin) {
        fs.unlink(`images/posts/${req.file.filename}`, (error) => {
          if (error) throw error;
        });
        return res.status(403).json({ error: 'Requête non autorisée.' });
      }

      if (post.pictureUrl) {
        const filename = post.pictureUrl.split('/posts/')[1];
        fs.unlink(`images/posts/${filename}`, () => {
          Post.findByIdAndUpdate(
            req.params.id,
            { ...postObject, _id: req.params.id },
            { new: true }
          )
            .then((docs) =>
              res.status(200).json({ message: 'Post modifié.', docs })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      } else {
        Post.findByIdAndUpdate(
          req.params.id,
          { ...postObject, _id: req.params.id },
          { new: true }
        )
          .then((docs) =>
            res.status(200).json({ message: 'Post modifié.', docs })
          )
          .catch((error) => res.status(400).json({ error }));
      }
    } else {
      if (post.author._id != req.auth.userId && !req.auth.isAdmin) {
        return res.status(403).json({ error: 'Requête non autorisée.' });
      } else {
        if (post.pictureUrl && !req.body.image) {
          const filename = post.pictureUrl.split('/posts/')[1];
          fs.unlink(`images/posts/${filename}`, () => {
            Post.findByIdAndUpdate(
              req.params.id,
              { text: req.body.text, pictureUrl: '', _id: req.params.id },
              { new: true }
            )
              .then((docs) =>
                res.status(200).json({ message: 'Post modifié.', docs })
              )
              .catch((error) => res.status(400).json({ error }));
          });
        } else {
          console.log(req.body);
          Post.findByIdAndUpdate(
            req.params.id,
            {
              text: req.body.text,
              pictureUrl: req.body.image,
              _id: req.params.id,
            },
            { new: true }
          )
            .then((docs) =>
              res.status(200).json({ message: 'Post modifié.', docs })
            )
            .catch((error) => res.status(400).json({ error }));
        }
      }
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });
    switch (req.body.like) {
      case 0:
        if (post.likes.includes(req.auth.userId)) {
          Post.findByIdAndUpdate(
            req.params.id,
            {
              $pull: { likes: req.auth.userId },
              _id: req.params.id,
            },
            { new: true }
          )
            .then((docs) =>
              res.status(201).json({ message: 'Like annulé.', docs })
            )
            .catch((error) => res.status(400).json({ error }));
        } else {
          return res.status(400).json({ error: 'Requête invalide.' });
        }
        break;
      case 1:
        if (post.likes.includes(req.auth.userId)) {
          return res.status(400).json({ error: 'Post déjà liké.' });
        } else {
          Post.findByIdAndUpdate(
            req.params.id,
            {
              $push: { likes: req.auth.userId },
              _id: req.params.id,
            },
            { new: true }
          )
            .then((docs) =>
              res.status(201).json({ message: 'Post liké.', docs })
            )
            .catch((error) => res.status(400).json({ error }));
        }
        break;
      default:
        return res.status(400).json({ error: 'Invalid request.' });
    }
  } catch (error) {
    res.status(404).json({ error });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (post.author._id != req.auth.userId && !req.auth.isAdmin)
      return res.status(403).json({ error: 'Requête non autorisée.' });

    const filename = post.pictureUrl.split('/posts/')[1];
    fs.unlink(`images/posts/${filename}`, () => {
      Post.deleteOne({ _id: req.params.id })
        .then(() => res.status(201).json({ message: 'Post supprimé.' }))
        .catch((error) => res.status(400).json({ error }));
    });
  } catch (error) {
    res.status(404).json({ error });
  }
};
