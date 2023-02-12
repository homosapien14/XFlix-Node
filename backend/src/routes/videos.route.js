const router = require('express').Router();
const validate = require('../middleware/validate.middleware');
const { videoSchema, getVideoByQuerySchema, getVideoByParamSchema, patchVoteSchema, patchViewsSchema } = require('../validations/video.validator');

const { videoController } = require('../controllers');
router.get('/', validate(getVideoByQuerySchema), videoController.getVideos);
router.get('/:videoId', validate(getVideoByParamSchema), videoController.getVideoById);
router.post('/', validate(videoSchema), videoController.addVideo);
router.patch('/:videoId/votes', validate(patchVoteSchema), videoController.updateVotes);
router.patch('/:videoId/views', validate(patchViewsSchema), videoController.updateViewCount);

module.exports = router;