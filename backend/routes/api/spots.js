const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//get all spots by current User
router.get('/current', requireAuth, async (req, res) => {
    const allSpots = await Spot.findAll({
        where: { ownerId: req.user.id }
    });

    let spots = []

    for (let spot of allSpots) {
        let jsonSpot = spot.toJSON()
        const stars = await Review.sum('stars', { where: { spotId: jsonSpot.id } });
        const total = await Review.count({ where: { spotId: jsonSpot.id } });
        let avg = stars / total
        jsonSpot.avgRating = avg


        const previewImage = await SpotImage.findOne({ where: { spotId: jsonSpot.id } })
        if (previewImage) jsonSpot.previewImage = previewImage.url

        spots.push(jsonSpot)
    }

    return res.json({ spots });

});

//get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    let spotId = req.params.spotId;

    let spotsById = await Spot.findOne({
        where: {
            id: spotId
        },
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview'] },
            // { model: User, attributes: ['id', 'firstName', 'lastName'] },
        ]
    })


    if (spotsById) {
        spotsById = spotsById.toJSON()

    const owner = await User.findOne({
            where: {id: spotId},
            attributes: ['id', 'firstName', 'lastName']
        })
        spotsById.Owner = owner;

        const numReviews = await Review.count({ where: { spotId: spotsById.id } })
        spotsById.numReviews = numReviews;

        const stars = await Review.sum('stars', { where: { spotId: spotsById.id } });
        const total = await Review.count({ where: { spotId: spotsById.id } });
        let avg = stars / total
        spotsById.avgStarRating = avg

    

    } else {
        res.status(404).json({
            message: "Spot not found"
        })
    }

    return res.json(spotsById)
});

//get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll()

    let spots = []

    for (let spot of allSpots) {
        let jsonSpot = spot.toJSON()
        const stars = await Review.sum('stars', { where: { spotId: jsonSpot.id } });
        const total = await Review.count({ where: { spotId: jsonSpot.id } });
        let avg = stars / total
        jsonSpot.avgRating = avg


        const previewImage = await SpotImage.findOne({ where: { spotId: jsonSpot.id } })
        if (previewImage) jsonSpot.previewImage = previewImage.url

        spots.push(jsonSpot)
    }

    return res.json({ spots });

})



module.exports = router;