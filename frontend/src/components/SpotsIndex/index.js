import React from 'react';
import { Link } from 'react-router-dom'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, NavLink } from 'react-router-dom';
import { loadAllSpots } from '../../store/spots';
import './SpotsIndex.css'
import * as sessionActions from "../../store/session";



function SpotsIndex() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);


    useEffect(() => {
        dispatch(loadAllSpots());
    }, [dispatch])

    if (!spotsObj) return null;
    
    return(
       <>
       {spots.map(spot =>(
           <NavLink key={spot.id} to={`/spots/${spot.id}`} >
               <h4>{spot.name}</h4>
           </NavLink>
       ))}
       </>
    )
}

export default SpotsIndex;