const router = require('express').Router();
const Logic = require('../logic/user-logic');
const { putAndPatchResponseMiddleware, destructuredUser, errorHandler } = require('./utilities');

const checkIfLiveSession = (req,res, next)=>{
    if(req.session.passport){
        req.data = {status:'live', user: destructuredUser(req).fullName};
    }
    return res.json(req.data);
}

const fetchUser = async (req, res) => {
    try {
        const user = await Logic.fetchUser(destructuredUser(req)._id);
        req.data = user;
        return putAndPatchResponseMiddleware(req, res);
    }
    catch(err){
        errorHandler(err, res)
    }

};

const addVideoToUser = async (req, res, next) => {
    try {
        const user = await Logic.addVideoToUser({_id: destructuredUser(req)._id, videoId: req.params.videoid})
        req.data = user;
        return putAndPatchResponseMiddleware(req, res);
    }
    catch(err){
        errorHandler(err, res)
    }
}

router.get('/checksession', checkIfLiveSession);
router.get('/', fetchUser);
router.put('/:videoid', addVideoToUser);

module.exports = router;