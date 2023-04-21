const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking} = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');

const router = express.Router();


//Get user current bookings
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;
    let bookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                include: [
                    {
                        model: SpotImage,
                        attributes: ['id', 'url', 'preview']
                    }
                ]
            }
        ]
    })

    let Bookings = []
    if (bookings) {
        for (let booking of bookings) {
            booking = booking.toJSON()
            for (let image of booking.Spot.SpotImages) {
                if (image.preview === true) {
                    booking.Spot.previewImage = image.url
                    delete booking.Spot.SpotImages
                }
            }  
         
            Bookings.push(booking);
                
        }
    }

  

    res.json({ Bookings })

});





module.exports = router;