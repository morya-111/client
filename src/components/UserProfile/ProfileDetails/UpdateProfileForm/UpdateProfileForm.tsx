import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import Loader from "components/Loader";
import { FormMessageType } from "types/formTypes";
import { formMsgsTypeEnum } from "types/formTypes";
import authService from "utils/AuthService";
import { Link } from "react-router-dom";
import { SignUpFormData } from "types/formTypes";
import { useMutation } from "react-query";
import * as Yup from "yup";
import useAuthData from "hooks/useAuthData";

import Button from "components/Buttons/Button";

const UpdateProfileForm: React.FC = () => {
	const { first_name, last_name, email } = useAuthData();
	const [formMsg, setFormMsg] = useState<FormMessageType>({
		msg: "",
		type: formMsgsTypeEnum.None,
	});
	const updateProfileMutation = useMutation(
		(formData: SignUpFormData) => {
			// NEXTCOMMIT:
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
					msg: "Profile Updated Successfully",
					type: formMsgsTypeEnum.Success,
				});
			},
		}
	);
	return (
		<div>
			<div>
				<Formik
					initialValues={{
						firstName: first_name || "",
						lastName: last_name || "",
						emailId: email || "",
						password: "",
						confirmPassword: "",
					}}
					onSubmit={(values: SignUpFormData) => {
						updateProfileMutation.mutate(values);
					}}
					validationSchema={updateProfileSchema}
				>
					{({ errors, touched, isSubmitting }) => (
						<Form>
							<div className="flex">
								<div className="mx-4  mr-0.5">
									<label
										htmlFor="firstName"
										className="std-label"
									>
										First Name
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
									<label
										htmlFor="lastName"
										className="std-label"
									>
										Last Name
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
									Email
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
									Password
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
							{touched.password ? (
								<div className="mx-4 ">
									<label
										htmlFor="confirmPassword"
										className="std-label"
									>
										Confirm Password
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
							) : null}
							<div className="flex mt-5 ml-4">
								<div>
									{touched.firstName ||
									touched.lastName ||
									touched.emailId ||
									touched.password ||
									touched.confirmPassword ? (
										<Button
											type="submit"
											value="Save Changes"
										></Button>
									) : null}
								</div>
								<div className="ml-4 mr-4">
									<Button
										type="submit"
										value="Delete Account"
										color="error"
										right={
											updateProfileMutation.isLoading ? (
												<div className="ml-2">
													<Loader size="xs" />
												</div>
											) : null
										}
									></Button>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export const updateProfileSchema = Yup.object().shape({
	firstName: Yup.string(),
	lastName: Yup.string(),
	password: Yup.string().min(
		8,
		"Password should atleast be longer than 8 characters"
	),
	confirmPassword: Yup.string().oneOf(
		[Yup.ref("password")],
		"Passwords must match !"
	),
});

export default UpdateProfileForm;
