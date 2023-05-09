import { csrfFetch } from './csrf';

//Type
const LOAD_ALL_SPOTS = 'spots/loadAllSpots';
const SINGLE_SPOT = 'spots/singleSpot'
const ADD_SPOT= 'spots/addSpot'

//ACTION

export const loadSpots = (allSpots) => {
    return {
        type: LOAD_ALL_SPOTS,
        allSpots
    };
}

export const loadSingleSpot = (singleSpot) =>{
    return{
        type:SINGLE_SPOT,
        singleSpot
    }
}

export const createSpot = (singleSpot) =>{
    return{
        type:ADD_SPOT,
        singleSpot
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
export const singleSpotThunk = (spotId) =>async (dispatch) =>{
    const response = await fetch(`/api/spots/${spotId}`)

    if(response.ok){
        const spot = await response.json();
        dispatch(loadSingleSpot(spot))
        return spot
    }
}

//Create a Spot
export const createSpotThunk = (payload) => async (dispatch) =>{
    const response = await csrfFetch('/api/spots',{
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    if (response.ok){
        const newSpot = await response.json();
        dispatch(createSpot(newSpot))
        return newSpot
    }

}



//reducer
const initialState = { allSpots: {}};
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
       case LOAD_ALL_SPOTS:
            return {...state, allSpots: {...action.allSpots}};
        case SINGLE_SPOT:
            return{...state, [action.singleSpot.id]: action.singleSpot};
            case ADD_SPOT:
                return{...state, singleSpot:action.singleSpot, allSpots:action.singleSpot}
        default:
            return state;
    };


}

export default spotsReducer;