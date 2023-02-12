const router = require('express').Router();
const videoRoute = require('./videos.route');


router.use('/videos', videoRoute);

module.exports = router;