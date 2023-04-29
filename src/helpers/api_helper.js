import axios from "axios"

const axiosApi = axios.create({
  baseURL: "http://localhost:8080",
})


const token = localStorage.getItem("token")
axiosApi.defaults.headers.common["Content-Type"] = "application/json"
axiosApi.defaults.headers.common["Authorization"] = "Bearer " + token

export default axiosApi;
