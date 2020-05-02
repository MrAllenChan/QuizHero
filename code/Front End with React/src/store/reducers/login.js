/**
 * login
 */

import { ADD_USERNAME } from "../actions/loginActions";

const initialState = {
    username: null,
    instructorId: 0,
};

const setUserNameReducer = (state,action) => {
    switch (action.type) {
        case ADD_USERNAME:
            // const {userInfo} = action;
            const username=action.username || ""
            const instructorId=action.instructorId || 0


            return {
                ...state,
                username,
                instructorId
            };

        default:
            return initialState;
    }
};

export default setUserNameReducer;