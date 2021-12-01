import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:4000/v1",
	// NOTE: now every request is by default using credentails
	withCredentials: true,
});

export default axiosClient;
