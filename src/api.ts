import axios from "axios";

const api = axios.create({
	baseURL: `${
		process.env.REACT_APP_BACKEND_URL || "http://localhost:4000"
	}/v1/`,
	withCredentials: true,
});

export default api;
