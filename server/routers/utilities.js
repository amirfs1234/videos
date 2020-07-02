const createSuccessResponse = data => ({data, success: true})
const errorHandler = (err, res) => res.json(err);
const getResponseMiddleware = (req, res) => res.json(createSuccessResponse(req.data));
const putAndPatchResponseMiddleware = (req, res) => res.status(201).json(createSuccessResponse(req.data));
const permissionDeniedMiddleWare = (req, res ) => res.status(403).send('Bad Request');
const destructuredUser = req => req.session.passport.user;
const validatePermissions = (req, res, next) => destructuredUser(req).admin ? next() : permissionDeniedMiddleWare(req, res);

module.exports = {
    createSuccessResponse,
    errorHandler,
    getResponseMiddleware,
    putAndPatchResponseMiddleware,
    validatePermissions,
    destructuredUser
}