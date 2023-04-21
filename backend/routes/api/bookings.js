const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');

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

//Edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    let { user } = req;
    let { startDate, endDate } = req.body;
    let id = req.params.bookingId;
    let booking = await Booking.findByPk(id)


    if (new Date(endDate) <= new Date(startDate)) {
        return res.status(400).json({
            message: "Bad Request",
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        });
    }

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found"
        })
    }

    let spot = await Spot.findByPk(booking.spotId)

    const bookingConflict = await Booking.findOne({
        where: {
            spotId: spot.id,
            [Op.or]: [
                { startDate: { [Op.between]: [startDate, endDate] } },
                { endDate: { [Op.between]: [startDate, endDate] } }
            ]
        }
    });

    if (bookingConflict) {
        return res.status(403).json({
            message: "Sorry, this spot is already booked for the specified dates",
            errors: {
                startDate: "Start date conflicts with an existing booking",
                endDate: "End date conflicts with an existing booking"
            }
        });
    };

    if (booking.endDate < new Date()) {
        return res.status(403).json({
            message: "Past bookings can't be modified"
        })
    }

    if (user.id === booking.userId) {
        if (startDate) { booking.startDate = new Date(startDate) };
        if (endDate) { booking.endDate = new Date(endDate) }
        await booking.save()
        return res.status(200).json(booking)
    } else {
        res.status(403).json({ message: "You are not allow to change this booking" })
    }

})

router.delete('/:bookingId', requireAuth, async (req, res)=>{
    const { user } = req;
    const id = req.params.bookingId;
    const booking = await Booking.findByPk(id);

    if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.startDate <= new Date()) {
        return res.status(403).json({ message: "Bookings that have been started can't be deleted"})
    }
    
    if (booking.userId === user.id) {
        await booking.destroy();
        return res.status(200).json({ message: 'Successfully deleted' });
    } else {
        return res.status(404).json({message: "You are not authorized to delete this booking."})
    }

    
})


module.exports = router;