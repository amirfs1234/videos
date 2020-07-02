const Data = require('../dal/user-data');
const {userParsed} = require ('./parsers/mongo-parser')

const fetchUser = async userId => {
    const user = await Data.fetchUser(userId);
    return userParsed(user);
}

const addVideoToUser = async userAndVideo => {
    const user = await Data.addVideoToUser(userAndVideo);
    return userParsed(user);
}

module.exports = {
    fetchUser,
    addVideoToUser
}