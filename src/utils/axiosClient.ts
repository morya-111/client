import axios from "axios";

const axiosClient = axios.create({
	baseURL: "http://localhost:4000/v1",
});

export default axiosClient;
