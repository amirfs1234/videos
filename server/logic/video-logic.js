const Data = require('../dal/video-data');
const { videoParsed } = require('./parsers/mongo-parser');

const addNewVideo = async video => {
    const {_doc} = await Data.addNewVideo(video);
    return videoParsed(_doc);
};

module.exports = {
    addNewVideo
}