import { AuthDataType } from "types/authTypes";
import { SignUpFormData } from "types/formTypes";
import axiosClient from "./axiosClient";
class AuthService {
	private _isLoggedIn: boolean = false;
	constructor() {
		console.log("authservice initiated");
	}
	public login = (email: string, password: string) => {
		return axiosClient.post<any>(
			"/user/login",
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

	public registerUser = (formData: SignUpFormData) => {
		const options = {
			...formData,
		};
		return axiosClient.post("/user/register", {
			first_name: options.firstName,
			last_name: options.lastName,
			email: options.emailId,
			password: options.password,
		});
	};

	// this is useless rn
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
