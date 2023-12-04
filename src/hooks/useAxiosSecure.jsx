import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://red-drop-server-two.vercel.app'
})


const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;