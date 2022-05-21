import React, { useState, useContext } from "react";

import "./../SignUpForm/SignUpForm.css";
import "./SignInForm.css";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, Redirect } from "react-router-dom";
import { useMutation } from "react-query";

import { FormMessageType, formMsgsTypeEnum } from "types/formTypes";
import authService from "utils/AuthService";
import { SignInSchema } from "utils/authFormsValidators";
import AuthDataContext from "contexts/AuthDataContext";
import { AuthDataActionsTypeEnum } from "types/authTypes";
import { SignInFormData } from "types/formTypes";
import OAuthLinks from "components/OAuthLinks";

import Loader from "components/Loader";
import useCachedLoginStatus from "hooks/useCachedLoginStatus";

const SignInForm: React.FC = () => {
	const isLoggedIn = useCachedLoginStatus();
	const { authDataDispatch } = useContext(AuthDataContext);

	const [formMsg, setFormMsg] = React.useState<FormMessageType>({
		msg: "",
		type: formMsgsTypeEnum.None,
	});
	const [showPassword, setShowPassword] = useState<Boolean>(false);

	const handleShowPassClick = () => {
		if (showPassword) {
			setShowPassword(false);
		} else {
			setShowPassword(true);
		}
	};
	const signInMutation = useMutation(
		(formData: SignInFormData) => {
			return authService.login(formData.emailId, formData.password);
		},
		{
			onError: (err: any) => {
				if (err.response.status === 400) {
					setFormMsg({
						msg: `Email and password is required`,
						type: formMsgsTypeEnum.Fail,
					});
				} else if (err.response.status === 403) {
					setFormMsg({
						msg: `Email is associated with social login`,
						type: formMsgsTypeEnum.Fail,
					});
				} else if (err.response.status === 401) {
					setFormMsg({
						msg: `Incorrect email or password`,
						type: formMsgsTypeEnum.Fail,
					});
				} else {
					setFormMsg({
						msg: "Looks like an unhandled error occurred. Plz check browser console.",
						type: formMsgsTypeEnum.Fail,
					});
				}
			},
			onSuccess: (data) => {
				console.log(data.data.data.user);
				setFormMsg({
					msg: `Sign In Successful. Redirecting To Home Page...`,
					type: formMsgsTypeEnum.Success,
				});
				authDataDispatch({
					payload: data.data.data.user,
					type: AuthDataActionsTypeEnum.LOGIN_SUCCESS,
				});
			},
			onSettled: (error: any) => {
				console.log("Request Settled.");
			},
		}
	);

	if (isLoggedIn) {
		return <Redirect exact to="/" />;
	}
	return (
		<div className="bg-bgGrey100 signupform-main">
			<OAuthLinks titleText="Sign In to BookEx" />
			<Formik
				initialValues={{
					emailId: "",
					password: "",
				}}
				onSubmit={(values: SignInFormData) => {
					signInMutation.mutate(values);
				}}
				validationSchema={SignInSchema}
			>
				{({ errors, touched, isSubmitting }) => (
					<Form>
						<div className="flex"></div>
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
								className="bg-white std-input font-martel"
							/>
							<div className="text-right validation-msg font-martel">
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
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								className="std-input font-martel"
							/>
							<span
								className="cursor-pointer eye-span"
								onClick={handleShowPassClick}
							>
								{showPassword ? <FaEye /> : <FaEyeSlash />}
							</span>
							<div className="text-right validation-msg pass-validation-msg font-martel">
								<ErrorMessage name="password" />
							</div>
						</div>

						<div className="flex justify-center mt-0">
							{signInMutation.isLoading ? (
								//TODO: this is not rotating  @athhb
								<Loader size="sm" />
							) : (
								<button type="submit" className="std-btn">
									Log In
								</button>
							)}
						</div>
						<div className="my-4 text-center">
							<div
								className={formMsg.type}
								style={{
									backgroundColor: "#A8A8A8",
								}}
							>
								{formMsg.msg}
							</div>

							<span className="mr-1 font-imFell">
								Don't Have An Account ?
							</span>
							<span className="font-bold underline font-imFell">
								<Link to="/signup">Sign Up</Link>
							</span>
							<br />
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default SignInForm;
