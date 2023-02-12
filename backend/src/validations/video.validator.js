const Joi = require('joi');

const videoSchema = {
    body: Joi.object().keys({
        videoLink: Joi.string().required().custom((value, helpers) => {
            if (!value.match(/^youtube.com\/embed\/.*$/)) {
                return helpers.message(
                    "Please submit a valid youtube link"
                );
            }
            return value;
        }),
        title: Joi.string().required(),
        genre: Joi.string().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All").required(),
        contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+").required(),
        releaseDate: Joi.date().required(),
        previewImage: Joi.string().required(),
    })
}

const getVideoByQuerySchema = {
    query: Joi.object().keys({
        title: Joi.string(),
        genres: Joi.string(),
        contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+"),
        sortBy: Joi.string().valid("viewCount", "releaseDate"),
    })
}

const getVideoByParamSchema = {
    params: Joi.object().keys({
        videoId: Joi.string().required().custom((value, helpers) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
                return helpers.message('"{{#label}}" must be a valid mongo id');
            }
            return value;
        })
    })
}

const patchVoteSchema = {
    body: Joi.object().keys({
        vote: Joi.string().valid("upVote", "downVote").required(),
        change: Joi.string().valid("increase", "decrease").required(),
    }),
    params: Joi.object().keys({
        videoId: Joi.string().required().custom((value, helpers) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
                return helpers.message('"{{#label}}" must be a valid mongo id');
            }
            return value;
        })
    })
}

const patchViewsSchema = {
    params: Joi.object().keys({
        videoId: Joi.string().required().custom((value, helpers) => {
            if (!value.match(/^[0-9a-fA-F]{24}$/)) {
                return helpers.message('"{{#label}}" must be a valid mongo id');
            }
            return value;
        })
    })
}



module.exports = { videoSchema, getVideoByQuerySchema, getVideoByParamSchema, patchVoteSchema, patchViewsSchema };