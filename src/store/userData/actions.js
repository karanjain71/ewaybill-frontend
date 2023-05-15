import { getUserDetails } from "./../../helpers/backend_helper";

export async function setUserDetailsAction({commit}) {
    const userDetails = await getUserDetails()
    commit('setUserDetails', userDetails);      
}