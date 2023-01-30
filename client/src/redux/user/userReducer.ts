import { userActionTypes } from "./action";
import { UserActionTypes } from "./actionTypes";

const initialState = {};

function userReducer(state = initialState, action: userActionTypes) {
    switch (action.type) {
        case UserActionTypes.LOGIN:
            return action.payload;

        default:
            return state;
    }
}

export default userReducer;
