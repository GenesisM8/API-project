const express = require('express')
const bcrypt = require('bcryptjs');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {

    const { user } = req;
    const id = req.params.imageId;
    const image = await ReviewImage.findByPk(id);




    if (!image) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
    }
    const review = await Review.findByPk(image.reviewId)

    if (review.userId === user.id) {
        await image.destroy();
        return res.status(200).json({ message: 'Successfully deleted' });
    } else {
        return res.status(404).json({
            message: "You are not authorized to delete this image."

        })
    }
})


module.exports = router;