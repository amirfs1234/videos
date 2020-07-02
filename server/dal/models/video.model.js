const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
  name: String,
  progression: Number,
  length: Number,
  url: String
});

module.exports = videoSchema;