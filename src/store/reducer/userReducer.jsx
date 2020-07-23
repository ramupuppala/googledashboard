//Action imports
import * as allActions from '../actions/actions.const';

const intialState = {
    userDetails: [],
    googleMapLoaded:false
}

/**
 * Reducers for user operations.
 */
export default function userReducer(state = intialState, action) {
   
    switch (action.type) {
        case allActions.FETCH_USER_DETAILS:
            return {
                ...state,
                userDetails: action.payload,
                googleMapLoaded:true
            }
        case allActions.RECIEVE_USER_DETAILS:
            return state;
        default:
            return state;
    }
}