import axios from "axios"

const axiosApi = axios.create({
  baseURL: "http://localhost:8080",
})


axiosApi.defaults.headers.common["Content-Type"] = "application/json"

axiosApi.interceptors.request.use(
  config => {
    console.log(config + " is the config here")
      if(config.addToken === true)
      {
        let token = localStorage.getItem("ewaybillToken")
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
  },
  error => Promise.reject(error)
);

export default axiosApi;
