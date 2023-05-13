import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotsCurrentThunk, clearSpotsAction } from '../../store/spots';
import { NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import './ManageSpot.css';
import DeleteModal from '../DeleteSpot';
import OpenModalButton from '../OpenModalButton/index'


const CurrentUserSpots = () => {
    const dispatch = useDispatch();

    const spotsObj = useSelector(state => state.spots.currentSpots);
    let spots = [];
    spots = Object.values(spotsObj);

    useEffect(() => {
        dispatch(loadSpotsCurrentThunk());
        return (() => dispatch(clearSpotsAction()))
    }, [dispatch])

    if (!spots) { return null }

    return (
        <>
            <div>
                <div className='manageContainer'>
                    <h1>Manage Your Spots</h1>
                    

                </div>
                {spots.length? 
                <div className='currentSpotContainer'>
                    <div className='eachCurrentSpot'>
                        {spots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((spot) => (
                            <div key={`${spot.id}`}>

                                <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                                    <p className='manageNames'>{spot.name}</p>
                                    <img src={spot.previewImage} alt={spot.name} className='currentSpotImg' />
                                </NavLink>
                                <div className='imgInfo'>
                                    <div className='middleLine'>
                                        <NavLink key={spot.id} to={`/spots/${spot.id}`} >
                                            <p>{spot.city}, {spot.state}</p>
                                        </NavLink>

                                        <div> {spot.avgRating === "NaN" ? "New" : <div>

                                            <p>{spot.avgRating}</p>
                                        </div>}</div>
                                    </div>
                                    <div className='lastLine2'>
                                        <p>${spot.price} night</p>
                                    </div>
                                    <div className='manageLastContainer'>

                                        <Link key={spot.id} to={`/spots/${spot.id}/edit`} >
                                            <button className='manageLastButtons'>Update</button>
                                        </Link>
                                        <div>
                                            <OpenModalButton
                                                buttonText='Delete'
                                                modalComponent={<DeleteModal spot={spot} />}
                                            />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}
                    </div>
                </div> : <NavLink exact to='/spots/new'>
                        <button className='manageButton'>Create a New Spot</button>
                    </NavLink>}
            </div>

        </>
    )
}

export default CurrentUserSpots