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

    //    console.log("SPOT HERE", spot) => (It has an array of SpotImages)

    useEffect(() => {
        dispatch(singleSpotThunk(spotId))
    }, [dispatch, spotId])
    if (!spot) return null;

    //helper function for imgs
    const imagesRender = (images) => {
        for (let i of images) {
            images[i] = `img${i}`
        }
        return images;
    }
    let images = spot.SpotImages;
    images = imagesRender(images);

    const firstImg= images[0];

    console.log("Img info here",images)
    return (
        <>
            <div className='fullPageShow'>
                <h1>{spot.name}</h1>
                <p>{spot.city}, {spot.state}.</p>
                <div className='showContainer'>
                    <div>
                    {<img key={firstImg.id} src={firstImg.url} alt='firstImg' className='imgShowLeft'/>}
                    </div>
                    <div className='rightContainerShow'>
                      {images.map((image) => (
                        <img key={image.id} src={image.url} alt='spotsImgs' className='imgShowRight'/>
                    ))}   
                    </div>
                   
                </div>

            </div>

        </>
    )
}

export default SpotShow