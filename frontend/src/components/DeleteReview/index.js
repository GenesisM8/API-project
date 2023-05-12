import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {loadReviewThunk, deleteReviewThunk} from '../../store/reviews'
import { useModal } from '../../context/Modal';
import { singleSpotThunk } from '../../store/spots';


function DeleteReviewModal (props) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

const review = props.review
const spotId= props.spotId

    const clickYes = async (e) => {
        e.preventDefault();
        await dispatch(deleteReviewThunk(review.id))
        await closeModal();
        await dispatch(loadReviewThunk(spotId));
        await dispatch(singleSpotThunk(spotId));
    }

    const clickNo = (e) => {
        e.preventDefault();
        closeModal();
    }
return(
<>
<div>
    <div>
        <h1>Confirm Delete</h1>
        <p>Are you sure you want to delete this review?</p>
    </div>
    <div>
        <div>
            <button onClick={clickYes}>Yes (Delete Review)</button>
        </div>
        <div>
            <button onClick={clickNo}>No (Keep Review)</button>
        </div>
    </div>
</div>

</>
)
}

export default DeleteReviewModal