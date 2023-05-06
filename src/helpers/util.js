export const isLoggedIn = () => {
    if(localStorage.getItem('ewaybillToken') && localStorage.getItem('ewaybillToken') != ""){
        console.log(localStorage.getItem('ewaybillToken') + " here")
        return true
    }
    return false
}