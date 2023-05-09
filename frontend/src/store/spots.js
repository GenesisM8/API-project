import { csrfFetch } from './csrf';

//Type
const LOAD_ALL_SPOTS = 'spots/loadAllSpots';
const SINGLE_SPOT = 'spots/singleSpot'
const ADD_SPOT = 'spots/addSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const LOAD_CURRENT_SPOTS = 'spots/loadCurrentSpots'
//ACTION

export const loadSpots = (allSpots) => {
    return {
        type: LOAD_ALL_SPOTS,
        allSpots
    };
}

export const loadSingleSpot = (singleSpot) => {
    return {
        type: SINGLE_SPOT,
        singleSpot
    }
}

export const createSpot = (singleSpot) => {
    return {
        type: ADD_SPOT,
        singleSpot
    }
}

export const deleteSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}

export const loadCurrentSpots = (current) => {
    return {
        type: LOAD_CURRENT_SPOTS,
        current
    }
}

//Thunks

//Helper function
const makeObj = (array) => {
    const obj = {};
    array.forEach(object => {
        obj[object.id] = object;
    })
    return obj;
}

//Get all spots in Home
export const loadAllSpotsThunk = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const spotsResponse = await response.json();
        // console.log(spotsResponse) // => Array of Spots
        let Spots = makeObj(spotsResponse.Spots)
        dispatch(loadSpots(Spots));
        return Spots;
    }
}

//Get single spot
export const singleSpotThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSingleSpot(spot))
        return spot
    }
}

//Create a Spot Thunk
export const createSpotThunk = (payload, images) => async (dispatch) => {
    //post a spot
    const response1 = await csrfFetch('/api/spots', {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const spot = await response1.json();

    //post an img
    for (let i of images) {
        let imgObj = {
            url: i,
            preview: true
        }
        await csrfFetch(`/api/spots/${spot.id}/images`, {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify(imgObj)
        })
    }
    const response2 = await csrfFetch(`/api/spots/${spot.id}`);
    const newSpot = response2.json();
    dispatch(createSpot(newSpot))
    return newSpot

}
//spots of current user
export const loadSpotsCurrentThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const spotsRes = await response.json();
        let Spots = spotsRes.Spots;
        if (Spots) {
            Spots = makeObj(Spots)
            dispatch(loadCurrentSpots(Spots));
        }
        return Spots;
    }
}

export const deleteSpotThunk = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const deleteMessage = await response.json()
        dispatch(deleteSpot(id));
        return deleteMessage;
    }
}



//reducer
const initialState = { allSpots: {}, currentSpots: {}, };
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_SPOTS:
            return { ...state, allSpots: { ...action.allSpots } };
        case LOAD_CURRENT_SPOTS:
            return { ...state, currentSpots: { ...action.current } };
        case SINGLE_SPOT:
            return { ...state, singleSpot: action.singleSpot };
        case ADD_SPOT:
            return { ...state, singleSpot: action.singleSpot, allSpots: action.singleSpot }
        case DELETE_SPOT:
            const newState = { ...state, allSpots: { ...action.allSpots }, currentSpots: { ...action.currentSpots } }
            delete newState.allSpots[action.id]
            delete newState.currentSpots[action.id]
            return newState;
        default:
            return state;
    };


}

export default spotsReducer;