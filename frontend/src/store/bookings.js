// import { csrfFetch } from "./csrf";

// const SET_CHECK_IN_DATE = 'booking/setCheckInDate';
// const SET_CHECK_OUT_DATE = 'booking/setCheckOutDate';
// const SUBMIT_BOOKING_REQUEST = 'booking/submitBookingRequest';
// const SUBMIT_BOOKING_SUCCESS = 'booking/submitBookingSuccess';
// const SUBMIT_BOOKING_FAILURE = 'booking/submitBookingFailure';

// const FETCH_BOOKINGS_REQUEST = 'booking/fetchBookingsRequest';
// const FETCH_BOOKINGS_SUCCESS = 'booking/fetchBookingsSuccess';
// const FETCH_BOOKINGS_FAILURE = 'booking/fetchBookingsFailure';

// export const fetchBookingsRequest = () => ({
//   type: FETCH_BOOKINGS_REQUEST,
// });

// export const fetchBookingsSuccess = (bookedDates) => ({
//   type: FETCH_BOOKINGS_SUCCESS,
//   payload: bookedDates,
// });

// export const fetchBookingsFailure = (error) => ({
//   type: FETCH_BOOKINGS_FAILURE,
//   payload: error,
// });

// ////////// Actions /////////////////////
// export const setCheckInDate = (date) => ({
//   type: SET_CHECK_IN_DATE,
//   payload: date,
// });

// export const setCheckOutDate = (date) => ({
//   type: SET_CHECK_OUT_DATE,
//   payload: date,
// });

// export const submitBookingRequest = () => ({
//   type: SUBMIT_BOOKING_REQUEST,
// });

// export const submitBookingSuccess = (booking) => ({
//   type: SUBMIT_BOOKING_SUCCESS,
//   payload: booking,
// });

// export const submitBookingFailure = (error) => ({
//   type: SUBMIT_BOOKING_FAILURE,
//   payload: error,
// });

// ////////// Thunks ///////////////////////

// export const submitBooking = (spotId, startDate, endDate) => async (dispatch) => {
//   dispatch(submitBookingRequest());

//   try {
//     const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ startDate, endDate }),
//     });

//     if (response.ok) {
//       const booking = await response.json();
//       dispatch(submitBookingSuccess(booking));
//     } else {
//       const error = await response.json();
//       dispatch(submitBookingFailure(error));
//     }
//   } catch (error) {
//     dispatch(submitBookingFailure(error.message));
//   }
// };

// export const fetchBookingsForSpot = (spotId) => async (dispatch) => {
//   dispatch(fetchBookingsRequest());

//   try {
//     const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message);
//     }

//     const data = await response.json();
//     const bookedDates = data.Bookings.map((booking) => ({
//       startDate: booking.startDate,
//       endDate: booking.endDate,
//     }));
//     dispatch(fetchBookingsSuccess(bookedDates));
//   } catch (error) {
//     dispatch(fetchBookingsFailure(error.message));
//   }
// };


// const initialState = {
//   checkInDate: new Date().toISOString().slice(0, 10), // Set to the current date
//   checkOutDate: new Date().toISOString().slice(0, 10), // Set to the current date
//     bookedDates: [],
//   loading: false,
//   error: null,
// };

// const bookingReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_CHECK_IN_DATE:
//       return {
//         ...state,
//         checkInDate: action.payload,
//       };
//     case SET_CHECK_OUT_DATE:
//       return {
//         ...state,
//         checkOutDate: action.payload,
//       };
//     case SUBMIT_BOOKING_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null,
//       };
//     case SUBMIT_BOOKING_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         error: null,
//          bookedDates: [...state.bookedDates, action.payload.startDate, action.payload.endDate],
//       };
//     case SUBMIT_BOOKING_FAILURE:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default bookingReducer;

import { csrfFetch } from "./csrf";

const SET_CHECK_IN_DATE = 'booking/setCheckInDate';
const SET_CHECK_OUT_DATE = 'booking/setCheckOutDate';
const SUBMIT_BOOKING_REQUEST = 'booking/submitBookingRequest';
const SUBMIT_BOOKING_SUCCESS = 'booking/submitBookingSuccess';
const SUBMIT_BOOKING_FAILURE = 'booking/submitBookingFailure';
const FETCH_BOOKINGS_REQUEST = 'booking/fetchBookingsRequest';
const FETCH_BOOKINGS_SUCCESS = 'booking/fetchBookingsSuccess';
const FETCH_BOOKINGS_FAILURE = 'booking/fetchBookingsFailure';

////////// Actions /////////////////////
export const setCheckInDate = (date) => ({
  type: SET_CHECK_IN_DATE,
  payload: date,
});

export const setCheckOutDate = (date) => ({
  type: SET_CHECK_OUT_DATE,
  payload: date,
});

export const submitBookingRequest = () => ({
  type: SUBMIT_BOOKING_REQUEST,
});

export const submitBookingSuccess = (booking) => ({
  type: SUBMIT_BOOKING_SUCCESS,
  payload: booking,
});

export const submitBookingFailure = (error) => ({
  type: SUBMIT_BOOKING_FAILURE,
  payload: error,
});

export const fetchBookingsRequest = () => ({
  type: FETCH_BOOKINGS_REQUEST,
});

export const fetchBookingsSuccess = (bookedDates) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: bookedDates,
});

export const fetchBookingsFailure = (error) => ({
  type: FETCH_BOOKINGS_FAILURE,
  payload: error,
});

////////// Thunks ///////////////////////

export const submitBooking = ({ spotId, startDate, endDate }) => async (dispatch) => {
  dispatch(submitBookingRequest());

  try {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate: new Date(startDate), endDate: new Date(endDate) }), // Parse date strings to Date objects
    });

    if (response.ok) {
      const booking = await response.json();
      dispatch(submitBookingSuccess(booking));
    } else {
      const error = await response.json();
      dispatch(submitBookingFailure(error));
    }
  } catch (error) {
    dispatch(submitBookingFailure(error.message));
  }
};

export const fetchBookingsForSpot = (spotId) => async (dispatch) => {
  dispatch(fetchBookingsRequest());

  try {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    const bookedDates = data.Bookings.map((booking) => ({
      startDate: booking.startDate,
      endDate: booking.endDate,
    }));
    dispatch(fetchBookingsSuccess(bookedDates));
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message));
  }
};

const initialState = {
  checkInDate: new Date().toISOString().slice(0, 10), // Set to the current date
  checkOutDate: new Date().toISOString().slice(0, 10), // Set to the current date
  bookedDates: [],
  loading: false,
  error: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHECK_IN_DATE:
      return {
        ...state,
        checkInDate: action.payload,
      };
    case SET_CHECK_OUT_DATE:
      return {
        ...state,
        checkOutDate: action.payload,
      };
    case SUBMIT_BOOKING_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case SUBMIT_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        bookedDates: [...state.bookedDates, action.payload.startDate, action.payload.endDate],
      };
    case SUBMIT_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_BOOKINGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_BOOKINGS_SUCCESS:
      return {
        ...state,
        bookedDates: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_BOOKINGS_FAILURE:
      return {
        ...state,
        bookedDates: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;

