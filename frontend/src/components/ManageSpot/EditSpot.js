import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { singleSpotThunk } from '../../store/spots';
import { useHistory } from 'react-router-dom';
import { editSpotThunk } from '../../store/spots';

const EditSpot = () => {
    const { spotId } = useParams();
    const spot = useSelector(state => state.spots.singleSpot);
    const history = useHistory();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(singleSpotThunk(spotId))
    },[dispatch, spotId])

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
 
    
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    useEffect(() => {
        const err = {};
        if (!address) err.address = 'Address is required'
        if (!city) err.city = 'City is required'
        if (!state) err.state = 'State is required'
        if (!country) err.country = 'Country is required'
        if (!description || description.length < 30) err.description = 'Description needs a minimum of 30 characters'
        if (!name) err.name = 'Name is required'
        if (!price || price <= 0) err.price = 'Price is required and needs to be greater than 0'

        setErrors(err);
        
    }, [address, city, state, country, name, description, price])

    //Populate the inputs with original values in the form
    useEffect(()=>{
        if(spot){
           setCountry(spot.country) 
           setAddress(spot.address)
           setState(spot.state)
           setName(spot.name)
           setDescription(spot.description)
           setPrice(spot.price)
           setCity(spot.city)
        }
        
    },[spot])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setHasSubmitted(true);
        const payload = {
            ...spot,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };
        if (!Boolean(Object.values(errors).length)) {
            let updatedSpot = await dispatch(editSpotThunk(payload));
            if (!updatedSpot.errors) {
                history.push(`/spots/${updatedSpot.id}`)
                await setHasSubmitted(false);
            } 
        }
    }

    if (!spot) return (
        <h1>No spots found</h1>);

    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Update Spot</h1>
                    <div>
                        <h2>Where's your place located?</h2>
                        <p>Guests will only get your exact address once they booked a reservation.</p>
                    </div>
                    <div>
                        <div>
                            <label>Country</label>
                            {hasSubmitted ? <p className='error'>{errors.country}</p> : null}
                            <input
                                type='text'
                                name='country'
                                value={country}
                                onChange={updateCountry}
                            ></input>
                        </div>
                        <div>
                            <label>Stree Address</label>
                            {hasSubmitted ?<p className='error'>{errors.address}</p> : null}
                            <input
                                type='text'
                                name='address'
                                value={address}
                                onChange={updateAddress}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>City</label>
                            {hasSubmitted ?<p className='error'>{errors.city}</p> : null}
                            <input
                                type='text'
                                name='city'
                                value={city}
                                onChange={updateCity}
                            ></input>
                        </div>
                        <div>
                            <label>State</label>
                            {hasSubmitted ?<p className='error'>{errors.state}</p> : null}
                            <input
                                type='text'
                                name='state'
                                value={state}
                                onChange={updateState}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Latitude</label>
                            <input
                                type='text'
                                value={lat}
                                name='lat'
                                placeholder='(optional)'
                                onChange={(e) => setLat(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label>Longitude</label>
                            <input
                                type='text'
                                value={lng}
                                name='lng'
                                placeholder='(optional)'
                                onChange={(e) => setLng(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <h2>Describe your place to guests</h2>
                        <p>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</p>
                        <div>
                            <textarea
                                value={description}
                                name='description'
                                onChange={updateDescription}
                                placeholder='Please write at least 30 character'
                                rows='8'
                                cols='50'
                            ></textarea>
                            {hasSubmitted ? <p className='error'>{errors.description}</p> : null}
                        </div>
                    </div>
                    <div>
                        <h2>Create a title for your spot</h2>
                        <p>Catch guests' attention with a spot title that highlights what makes your place special.</p>
                        <input
                            type='text'
                            value={name}
                            onChange={updateName}
                            name='name'
                            placeholder='Name of your spot'
                        ></input>
                        {hasSubmitted ?<p className='error'>{errors.name}</p> : null}
                    </div>
                    <div>
                        <h2>Set a base price for your spot</h2>
                        <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
                        <div>
                            <p>$</p>
                            <input
                                value={price}
                                name='price'
                                placeholder='Price per night (USD)'
                                pattern="^\$?[0-9]+(\.[0-9]{2})?$"
                                onChange={updatePrice}
                            ></input>
                            {hasSubmitted ? <p className='error'>{errors.price}</p> : null}
                        </div>
                    </div>

                    <button type='submit'>Update Spot</button>
            </form>
        </div>
        
        </>
    )
}

export default EditSpot
