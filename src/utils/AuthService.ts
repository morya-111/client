import axios from "axios";
import { AuthDataType } from "types/authTypes";
class AuthService {
	private _isLoggedIn: boolean = false;
	constructor() {
		console.log("authservice initiated");
	}
	public login = (email: string, password: string) => {
		return axios.post(
			"http://localhost:4000/v1/user/login",
			{
				email: email,
				password: password,
			},
			{ withCredentials: true }
		);
	};

	// all the rituals we need to perform after log in is successful
	public logInSuccessful = (userData: AuthDataType) => {
		const userDataCopy = { ...userData };
		localStorage.setItem("user", JSON.stringify(userDataCopy));
		this._isLoggedIn = true;
	};

	public isUserLoggedIn = () => {
		if (localStorage.getItem("user") && this._isLoggedIn) {
			console.log(JSON.parse(localStorage.getItem("user")!));

			console.log("yes yes user is logged in");

			return true;
		}
	};
}

const authService = new AuthService();

export default authService;
