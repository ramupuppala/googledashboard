//Actions imports
import * as allActions from './actions.const';

/**
 * Action function for getting user Details
 */
export function fetchUserDetails(data){
    return {
        type:allActions.FETCH_USER_DETAILS,
        payload:data
    }
}
export function receiveUserDetails(){
    return {
        type:allActions.RECIEVE_USER_DETAILS,
        payload:{}
    }
}

