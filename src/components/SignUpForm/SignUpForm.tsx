import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import "./SignUpForm.css";
import { useMutation } from "react-query";

import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
	validateEmailId,
	validateFirstName,
	validateLastName,
	validatePassword,
	validateSignUpForm,
} from "./validators";

import { FormMessageType, SignUpFormData, formMsgsTypeEnum } from "./types";

const SignUpForm: React.FC = () => {
	const [formMsg, setFormMsg] = React.useState<FormMessageType>({
		msg: "",
		type: formMsgsTypeEnum.None,
	});
	const registerUser = (formData: SignUpFormData) => {
		const options = {
			...formData,
		};
		console.log("sending axios req");

		return axios.post("http://localhost:4000/v1/user/register", {
			first_name: options.firstName,
			last_name: options.lastName,
			email: options.emailId,
			password: options.password,
		});
	};

	const signUpMutation = useMutation(
		(formData: SignUpFormData) => {
			return registerUser(formData);
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
			onSettled: (error: any) => {
				console.log("Request Settled. Relax Boyys");
			},
		}
	);

	return (
		<div className="signupform-main">
			<div className="m-50">
				<div className="flex justify-center m-auto text-xl font-bold ">
					Sign Up To BookEx
				</div>
				<div className="flex justify-center">
					<div className="std-icon-wrapper">
						<FcGoogle className="w-12 h-12 " />
					</div>
					<div className="std-icon-wrapper">
						<AiFillFacebook className="w-12 h-12 " />
					</div>
				</div>
				<div className="flex justify-center my-2">
					<div className="">
						<span className="line-span">xxxxxxxxxxx</span>
						<span className="">or do it via E-mail</span>
						<span className="line-span">xxxxxxxxxxx</span>
					</div>
				</div>
			</div>
			<Formik
				initialValues={{
					firstName: "",
					lastName: "",
					emailId: "",
					password: "",
					confirmPassword: "",
				}}
				onSubmit={(values: SignUpFormData) => {
					console.log("running submit");
					const res = signUpMutation.mutate(values);
					console.log("submit done");
					console.log(res);
				}}
				validate={validateSignUpForm}
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
									validate={validateFirstName}
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
									validate={validateLastName}
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
								validate={validateEmailId}
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
								validate={validatePassword}
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
						<div className="flex justify-center mt-5">
							<button type="submit" className="std-btn">
								Join BookEx
							</button>
						</div>
						<div className="my-4 text-center">
							<div className={formMsg.type}>{formMsg.msg}</div>
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
