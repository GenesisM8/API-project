const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//get all spots
router.get('/', async (req, res)=>{
    const spots = await Spot.findAll({ raw: true })

    for (let spot of spots) { 
        const stars = await Review.sum('stars', { where: { spotId: spot.id } }); 
        const total = await Review.count({ where: { spotId: spot.id } });
        let avg = stars / total
        if(avg > 0 ){spot.avgRating = avg
        } else { spot.avgRating = 0 };

        const previewImage = await SpotImage.findOne({ where: { spotId: spot.id } })
        if (previewImage) spot.previewImage = previewImage.url
        else spot.previewImage = 'Doesnt exist';
    }

    return res.json({spots});

})






module.exports = router;