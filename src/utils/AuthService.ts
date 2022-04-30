import { AuthDataType } from "types/authTypes";
import { SignUpFormData } from "types/formTypes";
import api from "api";
import * as yup from "yup";
class AuthService {
	// private _isLoggedIn: boolean = false;
	constructor() {
		console.log("authservice initiated");
	}
	public login = (email: string, password: string) => {
		return api.post<any>(
			"/user/login",
			{
				email: email,
				password: password,
			},
			{ withCredentials: true }
		);
	};

	public logout = () => {
		return api.post<any>("/user/logout");
	};

	public registerUser = (formData: SignUpFormData) => {
		const options = {
			...formData,
		};
		return api.post("/user/register", {
			first_name: options.firstName,
			last_name: options.lastName,
			email: options.emailId,
			password: options.password,
		});
	};

	public checkIfLoggedIn = (authData: AuthDataType, logging = false) => {
		const authDataSchema = yup.object().shape({
			email: yup.string().email().required(),
			first_name: yup.string().required(),
			last_name: yup.string().required(),
			id: yup.number().required(),
			role: yup.string().required(),
			avatarUrl: yup.string().url(), // NOTE: .url() only covers https:// urls. other formats are not supported. somethimnng like "imbb.com" will fail.
		});
		const isLoggedIn = authDataSchema.isValidSync(authData);
		if (logging) {
			console.log(
				"checking isloggedin from cached data...result is",
				isLoggedIn,
				"authdata is",
				authData,
				"current time - ",
				new Date()
			);
		}
		return isLoggedIn;
	};
	public updateUserInfo = (updatedData: any) => {
		return api.put<any>("/user/updateuser", { ...updatedData });
	};

	public delAccount = () => {
		return api.delete<any>("/user/deleteuser");
	};

	public getAuthInfo = () => {
		return api.get<any>("/user/loggedinusing");
	};
}

const authService = new AuthService();

export default authService;
