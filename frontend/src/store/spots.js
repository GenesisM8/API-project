
const makeArray = (array) => {
    const obj = {};
    array.forEach(object => {
        obj[object.id] = object;
    })
    return obj;
}

//Type
const LOAD_ALL_SPOTS = 'spots/loadAllSpots';


//ACTION


export const loadSpots = (allSpots) => {
    return {
        type: LOAD_ALL_SPOTS,
        allSpots
    };
}


//Thunks

//Get all spots in Home
export const loadAllSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const spotsResponse = await response.json();
        // console.log(spotsResponse) // => Array of Spots
        let Spots = makeArray(spotsResponse.Spots)
        dispatch(loadSpots(Spots));
        return Spots;
    }
}

//reducer
const initialState = { allSpots: {}};
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
       case LOAD_ALL_SPOTS:
            return {...state, allSpots: {...action.allSpots}};
        default:
            return state;
    };


}

export default spotsReducer;