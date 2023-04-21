const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors,

]

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

//Edit a review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { user } = req;
    const { review, stars } = req.body;

    const findReview = await Review.findByPk(req.params.reviewId, {
        where: {
            userId: user.id
        }
    })

    if (!findReview) {
        return res.status(404).json({ message: "Review couldn't be found" });
    };

    if (findReview.userId !== user.id) {
        return res.status(401).json({
            message: "You are not authorized to edit this review"
        })
    };

    if (findReview.userId === user.id) {
        if (review) { findReview.review = review };
        if (stars) { findReview.stars = stars }

        await findReview.save()
        return res.status(200).json(findReview)
    }
})

router.delete('/:reviewId', requireAuth, async (req, res) => {
    const { user } = req;
    const id = req.params.reviewId;
    const review = await Review.findByPk(id);

    if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId === user.id) {
        await review.destroy();
        return res.status(200).json({ message: 'Successfully deleted' });
    } else {
        return res.status(404).json({
            message: "You are not authorized to delete this review."

        })
    }
})

module.exports = router;