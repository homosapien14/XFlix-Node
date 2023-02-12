const catchAsync = require('../utils/catchAsync');
const { videoServices } = require('../services');

const getVideos = catchAsync(async (req, res) => {
    try {
        const { query } = req;
        const videoCollection = await videoServices.getVideoByQuery(query);
        res.status(200).send({ videos: videoCollection });

    } catch (err) {
        const { statusCode, message } = err;
        if (!statusCode) return res.status(500).send({ message: "Internal server Error" });
        res.status(statusCode).send({ statusCode, message })
    }
})

const getVideoById = catchAsync(async (req, res) => {
    try {
        const { videoId } = req.params;
        const video = await videoServices.getVideoById(videoId);
        res.status(200).send(video);

    } catch (err) {
        const { statusCode, message } = err;
        if (!statusCode) return res.status(500).send({ message: "Internal server Error" });
        res.status(statusCode).send({ statusCode, message })
    }
});


const addVideo = catchAsync(async (req, res) => {
    try {
        const { body } = req;
        const video = await videoServices.addVideoToDb(body);
        res.status(201).send(video);

    } catch (err) {
        const { statusCode, message } = err;
        if (!statusCode) return res.status(500).send({ message: "Internal server Error" });
        res.status(statusCode).send({ statusCode, message })
    }
});


const updateVotes = catchAsync(async (req, res) => {
    try {
        const { videoId } = req.params;
        const { vote, change } = req.body;
        await videoServices.updateVoteCount(videoId, vote, change);
        res.sendStatus(204);

    } catch (err) {
        console.log(err);
        const { statusCode, message } = err;
        if (!statusCode) return res.status(500).send({ message: "Internal server Error" });
        res.status(statusCode).send({ statusCode, message })
    }
});

const updateViewCount = catchAsync(async (req, res) => {
    try {
        const { videoId } = req.params;
        await videoServices.updateViewCount(videoId);
        res.sendStatus(204)

    } catch (err) {
        const { statusCode, message } = err;
        if (!statusCode) return res.status(500).send({ message: "Internal server Error" });
        res.status(statusCode).send({ statusCode, message })
    }
});



module.exports = { getVideos, getVideoById, addVideo, updateVotes, updateViewCount }