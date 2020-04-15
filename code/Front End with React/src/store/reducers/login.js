import { ADD_USERNAME } from "../actions/loginActions";


const initialState = {
    username: null,
    instructorId: null,
};

const setUserNameReducer = (state,action) => {
    switch (action.type) {
        case ADD_USERNAME:
           

            return {
                ...state,
                username:action.userInfo.username,
                instructorId:action.userInfo.instructorId
            };

        default:
            return initialState;
    }
};

export default setUserNameReducer;