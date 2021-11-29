import { AuthDataType } from "types/authTypes";
import { SignUpFormData } from "types/formTypes";
import axiosClient from "./axiosClient";
import * as yup from "yup";
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

	public checkIfLoggedIn = (authData: AuthDataType) => {
		const authDataSchema = yup.object().shape({
			email: yup.string().email().required(),
			first_name: yup.string().required(),
			last_name: yup.string().required(),
			id: yup.number().required(),
			role: yup.string().required(),
		});

		const isLoggedIn = authDataSchema.isValidSync(authData);
		console.log(
			"checking isloggedin from cached data...result is",
			isLoggedIn,
			"authdata is",
			authData
		);

		return isLoggedIn;
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
