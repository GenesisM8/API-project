import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singleSpotThunk } from '../../store/spots'
import './SpotShow.css'
import { useParams } from 'react-router-dom';

function SpotShow(){
    const {spotId} = useParams();
    const dispatch = useDispatch();
    const spot= useSelector((state) => state.spots[spotId])
    
   
    useEffect(()=>{
        dispatch(singleSpotThunk(spotId))
    },[dispatch, spotId])

    if (!spot) return null;
    return(
        <>
        <h1>{spot.name}</h1>
        </>
    )
}

export default SpotShow