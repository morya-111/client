import React, { useState } from "react";

import "./../SignUpForm/SignUpForm.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignInForm: React.FC = () => {
	const [showPassword, setShowPassword] = useState<Boolean>(false);

	return (
		<div className="signupform-main">
			<div className="m-50">
				<div className="flex justify-center m-auto text-xl font-bold ">
					Sign In To BookEx
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
				onSubmit={() => {
					// console.log("running submit");
					// const res = signUpMutation.mutate(values);
					// console.log("submit done");
					// console.log(res);
				}}
				// validate={validateSignUpForm}
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
								<div></div>
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
									// validate={validateLastName}
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
								// validate={validateEmailId}
							/>
							<div className="validation-msg">
								<ErrorMessage name="emailId" />
							</div>
						</div>
						<div className="mx-4 bg-red-100">
							<label htmlFor="password" className="std-label">
								Password :
							</label>
							<Field
								id="password"
								name="password"
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								className="std-input"
								// validate={validatePassword}
							/>
							<span className="inline-block">
								<FaEye />
							</span>
							<div className="validation-msg">
								<ErrorMessage name="password" />
							</div>
						</div>

						<div className="flex justify-center mt-5">
							<button type="submit" className="std-btn">
								Log In
							</button>
						</div>
						<div className="my-4 text-center">
							{/* <div className={formMsg.type}>{formMsg.msg}</div> */}
							<span className="mr-1">
								Don't Have An Account ?
							</span>
							<span className="font-bold underline">
								<Link to="/signin">Sign Up</Link>
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
