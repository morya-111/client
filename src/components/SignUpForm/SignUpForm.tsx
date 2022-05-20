import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "./SignUpForm.css";
import { useMutation } from "react-query";

import { Link, Redirect, useHistory } from "react-router-dom";
import { SignUpSchema } from "utils/authFormsValidators";

import {
	FormMessageType,
	SignUpFormData,
	formMsgsTypeEnum,
} from "types/formTypes";
import OAuthLinks from "components/OAuthLinks";
import Loader from "components/Loader";
import authService from "utils/AuthService";
import AuthDataContext from "contexts/AuthDataContext";

const SignUpForm: React.FC = () => {
	const { authData } = React.useContext(AuthDataContext);
	const history = useHistory();
	const [formMsg, setFormMsg] = React.useState<FormMessageType>({
		msg: "",
		type: formMsgsTypeEnum.None,
	});

	const signUpMutation = useMutation(
		(formData: SignUpFormData) => {
			return authService.registerUser(formData);
		},
		{
			onError: (err: any) => {
				if (err.response.status === 409) {
					setFormMsg({
						msg: `Email Already Exists. Sign In instead ?`,
						type: formMsgsTypeEnum.Fail,
					});
				} else {
					setFormMsg({
						msg: "Looks like an unhandled error occurred. Plz check browser console.",
						type: formMsgsTypeEnum.Fail,
					});
				}
			},
			onSuccess: () => {
				// NOTE: Redirecting to sign in
				history.push("/signin");
			},
		}
	);

	if (authService.checkIfLoggedIn(authData)) {
		return <Redirect to="/" />;
	}
	return (
		<div className="signupform-main bg-bgGrey100 ">
			<OAuthLinks titleText="Sign Up To BookEx" />
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					emailId: "",
					password: "",
					confirmPassword: "",
				}}
				onSubmit={(values: SignUpFormData) => {
					signUpMutation.mutate(values);
				}}
				validationSchema={SignUpSchema}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form>
						<div className="flex">
							<div className="mx-4  mr-0.5">
								<label
									htmlFor="firstName"
									className="text-base std-label font-martel"
								>
									First Name :
								</label>
								<Field
									id="firstName"
									name="firstName"
									type="text"
									placeholder="First Name"
									className="std-input font-martel"
									// validate={validateFirstName}
								/>
								<div className="text-xs text-right validation-msg font-martel">
									<ErrorMessage
										className="validation-msg"
										name="firstName"
									/>
								</div>
							</div>
							<div className="mx-4 ">
								<label
									htmlFor="lastName"
									className="text-base std-label font-martel"
								>
									Last Name :
								</label>
								<Field
									id="lastName"
									name="lastName"
									type="text"
									placeholder="Last Name"
									className="std-input font-martel"
								/>
								<div className="text-xs text-right validation-msg font-martel">
									<ErrorMessage name="lastName" />
								</div>
							</div>
						</div>
						<div className="mx-4 ">
							<label
								htmlFor="emailid"
								className="text-base std-label font-martel"
							>
								Email :
							</label>
							<Field
								id="emailId"
								name="emailId"
								type="text"
								placeholder="Email ID"
								className="std-input font-martel"
							/>
							<div className="text-xs text-right validation-msg font-martel">
								<ErrorMessage name="emailId" />
							</div>
						</div>
						<div className="mx-4 ">
							<label
								htmlFor="password"
								className="text-base std-label font-martel"
							>
								Password :
							</label>
							<Field
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								className="std-input font-martel"
							/>
							<div className="text-xs text-right validation-msg font-martel">
								<ErrorMessage name="password" />
							</div>
						</div>
						<div className="mx-4 ">
							<label
								htmlFor="confirmPassword"
								className="text-base std-label font-martel"
							>
								Confirm Password :
							</label>
							<Field
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								className="std-input font-martel"
							/>
							<div className="text-xs text-right validation-msg font-martel">
								<ErrorMessage name="confirmPassword" />
							</div>
						</div>
						<div className="flex justify-center mt-5 ">
							{signUpMutation.isLoading ? (
								//TODO: this is not rotating  @athhb
								<Loader size="md" />
							) : (
								<button type="submit" className="std-btn">
									Join BookEx
								</button>
							)}
						</div>
						<div className="my-4 text-center">
							<div className={formMsg.type}>{formMsg.msg}</div>
							<span className="mr-1 font-imFell">
								Already Have An Account ?
							</span>
							<span className="font-bold underline font-imFell">
								<Link to="/signin">Sign In</Link>
							</span>
							<br />
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SignUpForm;
