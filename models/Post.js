const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    likes: {
      type: [String],
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
