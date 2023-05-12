import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../context/Modal';
import { loadReviewThunk } from "../../store/reviews";
import { singleSpotThunk } from "../../store/spots";
import { addReviewThunk } from "../../store/reviews";
import StarsRatingInput from "./StarsRating";
import './Review.css'

const CreateReviewModal = ({ spot }) => {

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState({});
    const [errorRes, setErrorRes] = useState({});
    const id = spot.id;

    const dispatch = useDispatch();
    const { closeModal } = useModal();

    useEffect(() => {
        const err = {};
        if (review.length < 10) err.review = ''
        if (stars < 1) err.star = ''
        setErrors(err);
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newReview = {
            review,
            stars
        }
        const addReviewRes = await dispatch(addReviewThunk(newReview, id))
        if (addReviewRes.message) {
            // console.log(addReviewRes.message)
            await setErrorRes(addReviewRes)
        }
        await closeModal();
        await dispatch(loadReviewThunk(id));
        await dispatch(singleSpotThunk(id))
    }

        const onChange = (stars) => {
        setStars(parseInt(stars));
    };


    return (
        <>
            <div className="reviewContainer">
                <form className="reviewForm" onSubmit={handleSubmit}>
                    <h1>How was your Stay?</h1>
                    {Boolean(Object.values(errorRes).length) ?
                        <p className="error">{errorRes}</p> : null
                    }
                    <textarea
                        cols='40'
                        rows='7'
                        placeholder="Leave your review here..."
                        value={review}
                        name="review"
                        onChange={(e) => setReview(e.target.value)}
                    >
                    </textarea>
                    <div className="starsContainer">
                        <StarsRatingInput disabled={false} onChange={onChange} rating={stars} />
                        <p>Stars</p>
                    </div>
                    <button type="submit" className="submitReview" disabled={Boolean(Object.values(errors).length)}>Submit Your Review</button>
                </form>
            </div>
        </>
    )
}

export default CreateReviewModal