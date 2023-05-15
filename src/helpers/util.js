export const isLoggedIn = () => {
    if(localStorage.getItem('ewaybillToken') && localStorage.getItem('ewaybillToken') != ""){
        return true
    }
    return false
}