const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  videos: [{type: Schema.Types.ObjectId, ref: 'Video'}],
  userName: String,
  password: String,
  fullName: String
});

module.exports = userSchema;