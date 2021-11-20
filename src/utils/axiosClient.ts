import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:4000/v1",
	// TODO: now every request is default using credentails
	withCredentials: true,
});

export default axiosClient;
