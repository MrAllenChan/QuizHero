import Axios from "axios";
import BASE_URL from "../../config/config"






export const userLogin = (email, password) => {
    let params = {
        email : email,
        pswd: password
    }

    const response = await Axios.post(BASE_URL+"/login",params)
    
    return {
        type: ADD_USERNAME,
        username: response
    }
};