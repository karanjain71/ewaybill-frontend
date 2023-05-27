import { getUserDetails } from "./../../helpers/backend_helper";

export async function setUserDetailsAction({ commit }) {
  const userDetails = await getUserDetails();
  userDetails.emailTime = userDetails.emailTime[0] + ":00";
  commit("setUserDetails", userDetails);
}
