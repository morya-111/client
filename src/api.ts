import axios from "axios";

const api = axios.create({
	// Same-origin by default: CRA dev proxy locally, Vercel rewrite in prod.
	baseURL: `${process.env.REACT_APP_BACKEND_URL || ""}/v1/`,
	withCredentials: true,
});

export default api;
