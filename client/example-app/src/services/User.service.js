import axios from "axios"
// axios.defaults.withCredentials=true;
const api_url = process.env.REACT_APP_URL;
export const registerUser= (data)=>{
    return axios.post(api_url,data)
}
export const loginUser = (data) => {
    return axios.post(`${api_url}/login`,data)
}
export const getSession = (id, token) =>{
    return axios.get(`${api_url}/sessions/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const logoutUser = (token) =>{
    return axios.delete(`${api_url}/logout`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
});
}
export const submitOtp = ({id,otp}) =>{
    return axios.patch(`${api_url}/otp/${id}`,{otp})
}