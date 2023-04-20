const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();

const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 150 })
        .withMessage('Street address is required.'),

    check('city')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 50 })
        .withMessage('City is required.'),

    check('state')
        .exists({ checkFalsy: true })
        .isAlpha()
        .isLength({ min: 4, max: 25 })
        .withMessage('State is required.'),

    check('country')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 100 })
        .withMessage('Country is required.'),

    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('Latitude is not valid.'),

    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid.'),

    check('name')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a name.')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters.'),

    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 5, max: 500 })
        .withMessage('Description is required.'),

    check('price')
        .exists({ checkFalsy: true })
        .isNumeric()
        .withMessage('Price per day is required.'),
    handleValidationErrors
];

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
            where: { id: spotId },
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

//create a spot
router.post('/', validateSpot, requireAuth, async (req, res) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
    })
    return res.status(201).json(newSpot)
})

//edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { user } = req;
    const { address, city, state, country, lat, lng, name, description, price } = req.body
    const spot = await Spot.findByPk(req.params.spotId, {
        where: {
            ownerId: user.id
        }
    });

    if (!spot) {
        return res.status(404).json({ message: "spot couldn't be found" });
    };

    if (spot.ownerId !== user.id) {
        return res.status(401).json({
            message: "You are not authorized to edit this spot"
        })
    };

    if (spot.ownerId === user.id) {
        if (address) { spot.address = address };
        if (city) { spot.city = city };
        if (state) { spot.state = state };
        if (country) { spot.country = country };
        if (lat) { spot.lat = lat };
        if (lng) { spot.lng = lng };
        if (name) { spot.name = name };
        if (description) { spot.description = description };
        if (price) { spot.price = price }
        spot.ownerId = req.user.id,
        
        await spot.save()
        return res.status(200).json(spot)
    }
})

//delete spot
router.delete('/:spotId', requireAuth, async (req, res) => {


    const { user } = req;
    const id = req.params.spotId;
    const spot = await Spot.findByPk(id);

    if (!spot) {
        return res.status(404).json({ message: "spot couldn't be found" });
    }

    if (spot.ownerId === user.id) {
        await spot.destroy();
        return res.json({ message: 'Successfully deleted' });
    } else {
        return res.status(404).json({
            message: "You are not authorized."

        })
    }
})


module.exports = router;