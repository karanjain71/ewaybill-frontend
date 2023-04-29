
export async function setUserDetailsAction({commit}, userDetails) {
    console.log(JSON.stringify(userDetails) + " here user details")
    commit('setUserDetails', userDetails);      
}