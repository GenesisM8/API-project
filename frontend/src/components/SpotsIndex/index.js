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

                    <div className='singleSpotContainer'>
                        <div className='imgContainer'>
                            <NavLink key={spot.id} to={`/spots/${spot.id}`} >
                                <img src={spot.previewImage} alt='img' className='spotIndex' />
                            </NavLink>
                        </div> 
                       <div className='imgInfo'>
                            <div className='middleLine'>
                                <NavLink key={spot.id} to={`/spots/${spot.id}`} >
                                 <p>{spot.city}, {spot.state}</p>   
                                </NavLink>
                                <p>⭐️ {spot.avgRating}</p>
                            </div>
                            <div className='lastLine'>
                                <p>${spot.price} night</p>
                            </div>

                        </div>




                    </div>


                ))}

            </div>

        </>
    )
}

export default SpotsIndex;