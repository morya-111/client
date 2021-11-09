import axios from "axios";

class AuthService {
	constructor() {
		console.log("authservice initiated");
	}
	public login = (email: string, password: string) => {
		return axios.post("http://localhost:4000/v1/user/login", {
			email: email,
			password: password,
		});
	};
}

const authService = new AuthService();

export default authService;
