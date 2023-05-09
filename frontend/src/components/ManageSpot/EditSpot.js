import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { singleSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import { editSpotThunk } from '../../store/spots';

const EditSpot = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(singleSpotThunk(spotId))
    },[dispatch])

    return (
        <></>
    )
}

export default EditSpot
