import React from 'react';
import { useDispatch} from 'react-redux';
import { useModal } from "../../context/Modal";
import { useHistory } from 'react-router-dom';
import { deleteSpotThunk,loadSpotsCurrentThunk } from '../../store/spots';
import './DeleteSpot.css'

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
    <div className='mainContainer'> 
        <div className='deleteText'>
           <h1 className='h1Delete'>Confirm Delete</h1>
        <p className='pDelete'>Are you sure you want to remove this spot from the listing?</p>  
        </div>
       <div className='YN'>
        <button onClick={clickYes} className='Ybutton'>Yes (Delete Spot)</button>

        <button onClick={clickNo} className='Nbutton'>NO (Keep Spot)</button>
       </div>

    </div>
    </>
)
}

export default DeleteSpot