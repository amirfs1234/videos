const mongoose = require('mongoose');
const userSchema = require('./models/user.model');
const User = mongoose.model('User', userSchema);


const fetchUser = async _id => await User.findOne({_id}).populate('videos');

const addVideoToUser = async ({_id, videoId}) => await User.findByIdAndUpdate({ _id }, { $addToSet: {videos: videoId} }).populate('videos');


module.exports = {
  fetchUser,
  addVideoToUser
}