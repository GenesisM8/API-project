import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadSpotsCurrentThunk} from '../../store/spots';
import { NavLink, Link } from 'react-router-dom';
import { useEffect } from 'react';
import './ManageSpot.css';
import DeleteModal from '../DeleteSpot';
import OpenModalButton from '../OpenModalButton/index'


const CurrentUserSpots = () =>{
const dispatch= useDispatch();

    const spotsObj = useSelector(state => state.spots.currentSpots);
    let spots = [];
    spots = Object.values(spotsObj);

    useEffect(() => {
        dispatch(loadSpotsCurrentThunk());
    }, [dispatch])

    if (!spots) {return null }

    const clickUpdate = (e) => {
        e.preventDefault();
    }
    const clickCreate = (e) => {
        e.preventDefault();
    }

    return(
        <>
        <div>
            <div>
               <h1>Manage Your Spots</h1>  
                    <button onClick={clickCreate}><NavLink exact to='/spots/new'>Create a New Spot
                        </NavLink></button>
            </div>
            <div className='currentSpotContainer'>
                    <div className='eachCurrentSpot'>
                    {spots.map((spot)=>(
                        <div  key={`${spot.id}`}>
                            <p>{spot.name}</p>
                            <NavLink key={spot.id} to={`/spots/${spot.id}`}>
                            <img src={spot.previewImage} alt={spot.name} className='currentSpotImg'/> 
                            </NavLink>
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
                            <div>
                                <button onClick={clickUpdate}>
                                    <Link key={spot.id} to={`/spots/${spot.id}/edit`}>
                                        Update
                                    </Link> 
                                </button>
                                <OpenModalButton
                                buttonText='Delete'
                                modalComponent={<DeleteModal spot={spot}/>}
                                />
                            </div>
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
       
        </>
    )
}

export default CurrentUserSpots