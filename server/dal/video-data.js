const mongoose = require('mongoose');
const videoSchema = require('./models/video.model');
const Video = mongoose.model('Video', videoSchema);

const addNewVideo = async ({ name, progression, length, url }) => new Video({ name, progression, length, url }).save();

module.exports = {
    addNewVideo
}