import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://red-drop-server-two.vercel.app'
})


const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;