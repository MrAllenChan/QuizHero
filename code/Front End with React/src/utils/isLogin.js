/**
 * return login status
 * @returns {boolean}
 */

export const isLogin = () => {
    let isLogin = localStorage.getItem("isLogin")
    if (isLogin === "1") {
        return true;
    }else{
        console.log("Return false", isLogin)
        return false;
    }
    
}