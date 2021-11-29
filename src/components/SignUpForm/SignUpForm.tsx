import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "./SignUpForm.css";
import { useMutation } from "react-query";

import { Link } from "react-router-dom";
import axiosClient from "utils/axiosClient";
import { SignUpSchema } from "utils/authFormsValidators";

import {
	FormMessageType,
	SignUpFormData,
	formMsgsTypeEnum,
} from "types/formTypes";
import OAuthLinks from "components/OAuthLinks";
import Loader from "components/Loader";
import authService from "utils/AuthService";

const SignUpForm: React.FC = () => {
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
				setFormMsg({
					msg: `Sign Up Successful. You may now Sign In.`,
					type: formMsgsTypeEnum.Success,
				});
			},
		}
	);

	return (
		<div className="signupform-main">
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
									className="std-label"
								>
									First Name :
								</label>
								<Field
									id="firstName"
									name="firstName"
									type="text"
									placeholder="First Name"
									className="std-input"
									// validate={validateFirstName}
								/>
								<div className="validation-msg">
									<ErrorMessage
										className="validation-msg"
										name="firstName"
									/>
								</div>
							</div>
							<div className="mx-4 ">
								<label htmlFor="lastName" className="std-label">
									Last Name :
								</label>
								<Field
									id="lastName"
									name="lastName"
									type="text"
									placeholder="Last Name"
									className="std-input"
								/>
								<div className="validation-msg">
									<ErrorMessage name="lastName" />
								</div>
							</div>
						</div>
						<div className="mx-4 ">
							<label htmlFor="emailid" className="std-label">
								Email :
							</label>
							<Field
								id="emailId"
								name="emailId"
								type="text"
								placeholder="Email ID"
								className="std-input"
							/>
							<div className="validation-msg">
								<ErrorMessage name="emailId" />
							</div>
						</div>
						<div className="mx-4 ">
							<label htmlFor="password" className="std-label">
								Password :
							</label>
							<Field
								id="password"
								name="password"
								type="password"
								placeholder="Password"
								className="std-input"
							/>
							<div className="validation-msg">
								<ErrorMessage name="password" />
							</div>
						</div>
						<div className="mx-4 ">
							<label
								htmlFor="confirmPassword"
								className="std-label"
							>
								Confirm Password :
							</label>
							<Field
								id="confirmPassword"
								name="confirmPassword"
								type="password"
								placeholder="Confirm Password"
								className="std-input"
							/>
							<div className="validation-msg">
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
							<div className={formMsg.type}>{}</div>
							<span className="mr-1">
								Already Have An Account ?
							</span>
							<span className="font-bold underline">
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
