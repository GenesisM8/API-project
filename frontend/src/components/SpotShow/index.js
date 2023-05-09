import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { singleSpotThunk } from '../../store/spots'
import './SpotShow.css'
import { useParams } from 'react-router-dom';

function SpotShow() {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spots.singleSpot)
    //console.log("SPOT HERE", spot) //SpotsIages in an array of obj

    useEffect(() => {
        dispatch(singleSpotThunk(spotId))
    }, [dispatch, spotId])
    if (!spot) return null;

    // console.log(spot.SpotImages)
    if(!spot.SpotImages) return null
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

            </div>

        </>
    )
}

export default SpotShow