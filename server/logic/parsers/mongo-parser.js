const videoParsed = video => {

    const {_id, name, progression, length, url} = video;

    return {
        id: _id,
        videoUrl:  url,
        name: `Your Video: ${name}`,
        progression,
        length
    }

}

const userParsed = ({videos, userName, fullName}) => {

    return {
        userName,
        fullName,
        videos: videos.map(video=>videoParsed(video))
    }

}

module.exports = {
    userParsed,
    videoParsed
};