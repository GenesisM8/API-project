import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { loadAllSpotsThunk } from '../../store/spots';
import './SpotsIndex.css'


const SpotsIndex = () => {
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
                
                {spots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((spot) => (

                    <div className='singleSpotContainer' key={`spot/${spot.id}`}>
                        <div className='imgContainer'>
                           
                            <NavLink key={spot.id} to={`/spots/${spot.id}`} >
                                <img src={spot.previewImage} alt='img' className='spotIndex' />
                            </NavLink>
                             <div className='tooltip'>{spot.name}</div>
                        </div> 
                         
                       <div className='imgInfo'>
                            <div className='middleLine'>

                                <NavLink key={spot.id} to={`/spots/${spot.id}`} >
                                 <p className='spot-city'>{spot.city}, {spot.state}</p>   
                                </NavLink>
                               
                                <div className='avg-stars'> 
                                {!spot.avgRating ? "New" : <div><p>⭐️ {Number.parseFloat(spot.avgRating).toFixed(1)}</p></div>}
                                </div>
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