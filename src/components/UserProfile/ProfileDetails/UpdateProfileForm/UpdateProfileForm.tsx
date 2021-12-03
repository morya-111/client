import { Formik, Form } from "formik";

import { useState } from "react";
import { FormMessageType } from "types/formTypes";
import { formMsgsTypeEnum } from "types/formTypes";
import authService from "utils/AuthService";
import { useMutation } from "react-query";
import { updateProfileSchema } from "utils/authFormsValidators";
import useAuthData from "hooks/useAuthData";
import AvatarForm from "./AvatarForm";
import Button from "components/Buttons/Button";
import FormikFieldWithErrMsg from "components/FormikFieldWithErrMsg";
import Loader from "components/Loader";
import DeleteAccountBtn from "./DeleteAccountBtn";
import AuthInfo from "../UpdateProfileForm/AuthInfo";

type UpdateUserData = {
	first_name?: string;
	last_name?: string;
	avatarUrl?: string;
	password?: string;
};
const UpdateProfileForm: React.FC = () => {
	const { first_name, last_name, email, avatarUrl } = useAuthData();

	const [isAuthBookEx, setIsAuthBookEx] = useState(false);

	const [formMsg, setFormMsg] = useState<FormMessageType>({
		msg: "",
		type: formMsgsTypeEnum.None,
	});

	const checkIfFormChanged = (formValues: UpdateUserData) => {
		if (formValues.first_name !== first_name) {
			return true;
		}
		if (formValues.password) {
			return true;
		}
		if (formValues.last_name !== last_name) {
			return true;
		}
		if (formValues.avatarUrl !== avatarUrl) {
			return true;
		}
		return false;
	};
	const updateProfileMutation = useMutation(
		(formData: UpdateUserData) => {
			return authService.updateUserInfo(formData);
		},
		{
			onError: (err: any) => {
				if (
					err.response.status === 401 ||
					err.response.status === 404
				) {
					setFormMsg({
						msg: "The Field you request to change can not be changed",
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
				setFormMsg({
					msg: `Profile Updated Successfully ${data.data.changedFields.join(
						", "
					)}`,
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
						first_name: first_name || "",
						last_name: last_name || "",
						emailId: email || "",
						password: "",
						confirmPassword: "",
						avatarUrl: avatarUrl,
					}}
					onSubmit={(values: UpdateUserData) => {
						updateProfileMutation.mutate(values);
					}}
					validationSchema={updateProfileSchema}
					validateOnChange={true}
				>
					{({ touched, initialTouched, initialValues, values }) => (
						<Form>
							<div className="flex">
								<div className="mx-4  mr-0.5">
									<FormikFieldWithErrMsg
										id="first_name"
										name="first_name"
										type="first_name"
										labelName="First Name :"
										labelFor="first_name"
									/>
								</div>
								<div className="mx-4 ">
									<FormikFieldWithErrMsg
										id="last_name"
										name="last_name"
										type="last_name"
										labelName="Last Name :"
										labelFor="last_name"
									/>
								</div>
							</div>
							<div className="mx-4 ">
								<label htmlFor="emailid" className="std-label">
									Email
								</label>
								<input
									id="emailId"
									name="emailId"
									type="text"
									placeholder={email}
									className="std-input"
									disabled
								/>
							</div>
							{isAuthBookEx ? (
								<>
									<div className="mx-4 ">
										<FormikFieldWithErrMsg
											id="password"
											name="password"
											type="password"
											labelName="Password :"
											labelFor="password"
										/>
									</div>
									<div className="mx-4 ">
										{values.password !==
										initialValues.password ? (
											<FormikFieldWithErrMsg
												id="confirmPassword"
												name="confirmPassword"
												type="password"
												placeholder={"&#8226;".repeat(
													10
												)}
												labelName="Confirm Password :"
												labelFor="confirmPassword"
											/>
										) : null}
									</div>
								</>
							) : null}
							<div className="mt-4 mb-4 ml-4 w-96">
								<AuthInfo
									setPasswordVisibility={setIsAuthBookEx}
								/>
							</div>
							<div>
								<AvatarForm />
							</div>
							<div className="flex mt-5 ml-4">
								<div>
									{checkIfFormChanged(values) ? (
										<Button
											type="submit"
											value="Save Changes"
											right={
												updateProfileMutation.isLoading ? (
													<div className="ml-2">
														<Loader size="xs" />
													</div>
												) : null
											}
										></Button>
									) : null}
								</div>
							</div>
						</Form>
					)}
				</Formik>
				<div className="h-full mt-4 ml-4 bg-dark">
					<div className={formMsg.type}>{formMsg.msg}</div>
				</div>
				<div className="m-4">
					<DeleteAccountBtn />
				</div>
			</div>
		</div>
	);
};

export default UpdateProfileForm;
