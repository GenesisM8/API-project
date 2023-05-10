import React from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { deleteSpotThunk,loadSpotsCurrentThunk } from '../../store/spots';

function DeleteSpot ({spot}){
const dispatch= useDispatch();
const {closeModal} = useModal();
const history = useHistory()

const clickYes = async (e) =>{
    e.preventDefault();
    await dispatch(deleteSpotThunk(spot.id))
    await closeModal()
    await dispatch(loadSpotsCurrentThunk());
    history.push(`/spots/current`)
};

const clickNo = async (e) =>{
    e.preventDefault();
    closeModal()
};

return(
    <>
    <div>
        <div>
           <h1>Confirm Delete</h1>
        <p>Are you sure you want to remove this spot from the listing?</p>  
        </div>
       <div>
        <button onClick={clickYes}>Yes (Delete Spot)</button>

        <button onClick={clickNo}>NO (Keep Spot)</button>
       </div>

    </div>
    </>
)
}

export default DeleteSpot