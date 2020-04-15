import Axios from "axios";
import {BASE_URL} from "../../config/config"



export const ADD_USERNAME = "ADD_USERNAME";


export const userLoginAction = (username, instructorId) => {


    let userInfo = {
        // username:username,
        // instructionId:instructionId
    }

    return {
        type: ADD_USERNAME,
        instructorId:instructorId,
        username:username,
    }
};