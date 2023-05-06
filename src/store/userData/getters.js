export function getUserDetails(state) {
    console.log(JSON.stringify(state) + " state")
    return state.userDetails;
}