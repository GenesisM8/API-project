import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singleSpotThunk } from '../../store/spots'
import './SpotShow.css'
import { useParams } from 'react-router-dom';

const SpotShow = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.singleSpot)


    useEffect(() => {
        dispatch(singleSpotThunk(spotId))
    }, [dispatch, spotId])

    if (!spot) return null;
    console.log('Here is the spot', spot)
    if(!spot.SpotImages) return null;
    if(!spot.Owner) return (<h1>Owner not Found...</h1>)

    return (
        <>
            <div className='fullPageShow'>
                <h1>{spot.name}</h1>
                <p>{spot.city}, {spot.state}.</p>
                <div className='showContainer'>
                    <div>
                        <img  src={spot.SpotImages[0].url} alt='firstImg' className='imgShowLeft'/>
                    </div>
                    <div className='rightContainerShow'>
                        <img src={spot.SpotImages[1].url} alt='spotsImgs' className='imgShowRight'/>
                        <img src={spot.SpotImages[2].url} alt='spotsImgs' className='imgShowRight' />
                        <img src={spot.SpotImages[3].url} alt='spotsImgs' className='imgShowRight' />
                        <img src={spot.SpotImages[1].url} alt='spotsImgs' className='imgShowRight' />
                    </div>
                   
                </div>
                <div>
                    <div>
                        <h2> Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
                        <p>{spot.description}</p>
                    </div>
                    <div>
                        <div>
                            <p>${spot.price} night</p>
                            <p>⭐️ {spot.avgStarRating}</p>
                            <p>{spot.numReviews}</p>
                        </div>
                        <button>Reserve</button>
                    </div>
                </div>

            </div>

        </>
    )
}

export default SpotShow