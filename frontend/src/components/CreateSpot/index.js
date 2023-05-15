import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createSpotThunk } from '../../store/spots';
import './CreateSpot.css'

const CreateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [image2, setImage2] = useState('');
    const [image3, setImage3] = useState('');
    const [image4, setImage4] = useState('');
    const [image5, setImage5] = useState('');
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [resErrors, setResErrors] = useState({});



    useEffect(() => {
        const err = [];
        if (!address.length) err.address = 'Address is required'
        if (!city.length) err.city = 'City is required'
        if (!state.length) err.state = 'State is required'
        if (!country.length) err.country = 'Country is required'
        if (description.length < 30) err.description = 'Description needs a minimum of 30 characters'
        if (!name.length) err.name = 'Name is required'
        if (!price || price <= 0) err.price = 'Price is required and needs to be greater than 0'
        if (!previewImage.length) err.imageMin = 'Preview image is required'
        if (previewImage && !previewImage.includes('.png') &&
            !previewImage.includes('.jpg') &&
            !previewImage.includes('.jpeg')) err.image1 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (image2 && !image2.includes('.png') &&
            !image2.includes('.jpg') &&
            !image2.includes('.jpeg')) err.image2 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (image3 && !image3.includes('.png') &&
            !image3.includes('.jpg') &&
            !image3.includes('.jpeg')) err.image3 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (image4 && !image4.includes('.png') &&
            !image4.includes('.jpg') &&
            !image4.includes('.jpeg')) err.image4 = 'Image URL must end in .png, .jpg, or .jpeg'
        if (image5 && !image5.includes('.png') &&
            !image5.includes('.jpg') &&
            !image5.includes('.jpeg')) err.image5 = 'Image URL must end in .png, .jpg, or .jpeg'
        setErrors(err);
    }, [address, city, state, country, name, description, price, previewImage, image2, image3, image4, image5])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setHasSubmitted(true);
        await setResErrors({});

        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price,
        };

        let images = [];
        images.push(previewImage);
        if (image2) images.push(image2);
        if (image3) images.push(image3);
        if (image4) images.push(image4);
        if (image5) images.push(image5);



        if (!Boolean(Object.values(errors).length)) {
            let createdSpot = await dispatch(createSpotThunk(payload, images))
            if (!createdSpot.errors) {
                history.push(`/spots/${createdSpot.id}`)
            } else {
                await setResErrors(createdSpot.error)

            }
        }
    }

    return (
        <>
            <div className='formContainer'>

                <form onSubmit={handleSubmit} className='formCss'>
                    <h1>Create a New Spot</h1>
                    {hasSubmitted && Boolean(Object.values(resErrors).length) ? <li>{Object.values(resErrors)}</li> : null}
                    <div>
                        <h2>Where's your place located?</h2>
                        <p>Guests will only get your exact address once they booked a reservation.</p>
                    </div>
                    <div className='smallContainerForm'>
                        <div>
                            <div className='errosH'>
                                <label>Country </label>
                                {hasSubmitted ?
                                    <p className='err'>{errors.country}</p> : null
                                }
                            </div>

                            <input
                                type='text'
                                name='country'
                                className='formImputs'
                                value={country}
                                placeholder='country'
                                onChange={(e) => setCountry(e.target.value)}
                            ></input>

                        </div>
                        <div>
                            <div className='errosH'>
                                  <label>Stree Address</label>
                             {hasSubmitted ?
                                <p className='err'>{errors.address}</p> : null
                            } 
                            </div>
                         
                            <input
                                type='text'
                                name='address'
                                className='formImputs'
                                value={address}
                                placeholder='stree Address'
                                onChange={(e) => setAddress(e.target.value)}
                            ></input>
                           
                        </div>
                        <div className='errosH2'>
                            <div>
                                <div className='errosH'>
                                     <label>City</label>
                                  {hasSubmitted ?
                                    <p className='err'>{errors.city}</p> : null
                                } 
                                </div>
                              
                                <input
                                    type='text'
                                    className='smallInputCity'
                                    name='city'
                                    placeholder='city'
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                ></input>
                              
                            </div>
                            <div>
                                <div className='errosH'>
                                  <label>State</label>
                                 {hasSubmitted ?
                                    <p className='err'>{errors.state}</p> : null
                                }   
                                </div>
                               
                                <input
                                    type='text'
                                    name='state'
                                    placeholder='state'
                                    className='smallInputState'
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                ></input>
                               
                            </div>

                        </div>
                        {/* <div>
                            <div>
                                <label>Latitude</label>
                                <input
                                    type='text'
                                    value='47.7646758'
                                    name='lat'
                                    placeholder='(optional)'
                                    onChange={(e) => setLat(e.target.value)}
                                ></input>
                            </div>
                            <div>
                                <label>Longitude</label>
                                <input
                                    type='text'
                                    value='-133.4530327'
                                    name='lng'
                                    placeholder='(optional)'
                                    onChange={(e) => setLng(e.target.value)}
                                ></input>
                            </div>
                        </div> */}
                    </div>
                    <div className='smallContainerForm'>
                        <h2>Describe your place to guests</h2>
                        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <div>
                            <textarea
                                value={description}
                                name='description'
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Please write at least 30 character'
                                rows='8'
                                cols='48.5'
                            ></textarea>
                            {hasSubmitted ?
                                <p className='err'>{errors.description}</p> : null
                            }
                        </div>
                    </div>
                    <div className='smallContainerForm'>
                        <h2>Create a title for your spot</h2>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name='name'
                            className='formImputs'
                            placeholder='Name of your spot'
                        ></input>
                        {hasSubmitted ?
                            <p className='err'>{errors.name}</p> : null
                        }
                    </div>
                    <div className='smallContainerForm'>
                        <h2>Set a base price for your spot</h2>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <div className='errosH'>
                            <p>$</p>
                            <input
                                value={price}
                                name='price'
                                className='formImputs'
                                pattern="^\$?[0-9]+(\.[0-9]{2})?$"
                                title="Please enter a valid price in USD (numerical values only)."
                                placeholder='Price per night (USD)'
                                onChange={(e) => setPrice(e.target.value)}
                            ></input>
                           
                        </div>
                         {hasSubmitted ?
                                <p className='err'>{errors.price}</p> : null
                            }
                    </div>

                    <div >
                        <h2>Liven up your spot with photos</h2>
                        <p>Submit a link to at least one photo to publish your spot.</p>
                        <div>
                            <input
                                type='text'
                                placeholder='Preview Image URL'
                                className='formImputs'
                                value={previewImage}
                                onChange={(e) => setPreviewImage(e.target.value)}
                            ></input>

                            {hasSubmitted ?
                                <p className='imgErrors'>{errors.imageMin}</p> : null
                            }
                            {hasSubmitted ?
                                <p className='imgErrors'>{errors.image1}</p> : null
                            }
                            <input
                                type='text'
                                placeholder='Image URL'
                                className='formImputs'
                                value={image2}
                                onChange={(e) => setImage2(e.target.value)}
                            ></input>
                            {hasSubmitted ?
                                <p className='imgErrors'>{errors.image2}</p> : null
                            }

                            <input
                                type='text'
                                placeholder='Image URL'
                                className='formImputs'
                                value={image3}
                                onChange={(e) => setImage3(e.target.value)}
                            ></input>
                            {hasSubmitted ?
                                <p className='imgErrors'>{errors.image3}</p> : null
                            }

                            <input
                                type='text'
                                placeholder='Image URL'
                                className='formImputs'
                                value={image4}
                                onChange={(e) => setImage4(e.target.value)}
                            ></input>
                            {hasSubmitted ?
                                <p className='imgErrors'>{errors.image4}</p> : null

                            }

                            <input
                                type='text'
                                placeholder='Image URL'
                                className='formImputs'
                                value={image5}
                                onChange={(e) => setImage5(e.target.value)}
                            ></input>
                            {hasSubmitted ?
                                <p className='imgErrors'>{errors.image5}</p> : null
                            }

                        </div>
                    </div>
                    <button type='submit' className='createButton'>Create Spot</button>
                </form>
            </div>
        </>
    )
}

export default CreateSpot