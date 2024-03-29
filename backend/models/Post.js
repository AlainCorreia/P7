const mongoose = require('mongoose');
const {Schema} = mongoose;

const postSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      trim: true,
    },
    pictureUrl: {
      type: String,
    },
    likes: {
      type: [String],
      required: true,
    },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    editedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    lastEdited: {type: Date}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Post', postSchema);
