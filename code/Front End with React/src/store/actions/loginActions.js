/**
 * Define standard login actions
 * @type {string}
 */

export const ADD_USERNAME = "ADD_USERNAME";

export const userLoginAction = (username, instructorId) => {

    return {
        type: ADD_USERNAME,
        instructorId:instructorId,
        username:username,
    }
};