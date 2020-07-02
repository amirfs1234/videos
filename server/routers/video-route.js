const router = require('express').Router();

const { putAndPatchResponseMiddleware, validatePermissions, errorHandler } = require('./utilities');

const Logic = require('../logic/video-logic'); 

const addProgression = (req,data,next) => {
    req.session.progression = req.body.progression;
    req.data = req.session.progression;
    return next();
}

const addNewVideo = async (req, data, next) => {
    try {
        const addedVideo = await Logic.addNewVideo(req.body);
        req.data = addedVideo;
        return next();
    }
    catch(err) {
        errorHandler(err, res)
    }
      
}

router.post('/addprogression', addProgression, putAndPatchResponseMiddleware);
router.post('/add', validatePermissions, addNewVideo, putAndPatchResponseMiddleware);


module.exports = router;