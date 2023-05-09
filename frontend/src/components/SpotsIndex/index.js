import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadAllSpotsThunk } from '../../store/spots';
import './SpotsIndex.css'


function SpotsIndex() {
    const dispatch = useDispatch();
    const spotsObj = useSelector(state => state.spots.allSpots);
    const spots = Object.values(spotsObj);


    useEffect(() => {
        dispatch(loadAllSpotsThunk());
    }, [dispatch])

    if (!spotsObj) return null;

    return (
        <>
            <div className='spotsContainer'>
                {spots.map(spot => (
                    <NavLink key={spot.id} to={`/spots/${spot.id}`} >
                        <div className='singleSpotContainer'>
                        <div>
                          <p>{spot.previewImage}</p>  
                        </div>
                        <h4>{spot.name}</h4>   
                        <div className='middleLine'>
                         <p>{spot.city}, {spot.state}</p>   
                         <p>⭐️{spot.avgRating}</p>
                        </div>
                        <div>
                            <p>${spot.price} night</p>
                        </div>
                        
                        </div>
                        
                    </NavLink>
                ))}

            </div>

        </>
    )
}

export default SpotsIndex;