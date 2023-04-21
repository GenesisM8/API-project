const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();



//Get all reviews of the current User
router.get('/current', requireAuth, async (req, res) => {

    const { user } = req;
    let reviews = await Review.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['id', 'url', 'preview']
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    let Reviews = []

    if (reviews) {
        for (let review of reviews) {
            review = review.toJSON()

            for (let image of review.Spot.SpotImages) {
                if (image.preview === true) {
                    review.Spot.previewImage = image.url
                    delete review.Spot.SpotImages

                }
            }

            Reviews.push(review)
        }
    }

    res.json({ Reviews })
});

//Add image to a Review
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { user } = req;
    const { url } = req.body;

    const review = await Review.findByPk(req.params.reviewId, {
        where: {
            userId: user.id
        }
    })

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
    };

    const maxCount = await ReviewImage.count({
        where: {
            reviewId: review.id
        }
    });

    if (maxCount >= 10) {
        return res.status(403).json({
            message: "Maximum number of images for this resource was reached"
        })
    };

    if (user.id !== review.userId) {
        return res.status(404).json({
            message: "You are not authorized to add an image."
        })
    }

    const newImageReview = await ReviewImage.create({
        url,
        reviewId: review.id,
    });
    
    return res.status(200).json(
        {
            id: newImageReview.id,
            url: newImageReview.url
        }
    )
});


module.exports = router;