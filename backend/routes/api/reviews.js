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



module.exports = router;