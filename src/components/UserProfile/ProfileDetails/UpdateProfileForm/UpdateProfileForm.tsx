import { Formik, Form } from "formik";

import { useContext, useState } from "react";
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
import { AuthDataActionsTypeEnum } from "types/authTypes";
import AuthDataContext from "contexts/AuthDataContext";
import ServerDown from "Navigation/NotFound";

type UpdateUserData = {
	first_name?: string;
	last_name?: string;

	avatarUrl?: string;
	password?: string;
	confirmPassword?: string;
};
const UpdateProfileForm: React.FC = () => {
	const { first_name, last_name, email, avatarUrl } = useAuthData();
	const { authDataDispatch } = useContext(AuthDataContext);

	const [isAuthBookEx, setIsAuthBookEx] = useState(false);

	const [formMsg, setFormMsg] = useState<FormMessageType>({
		msg: "",
		type: formMsgsTypeEnum.None,
	});

	const checkIfFormChanged = (formValues: UpdateUserData) => {
		let changed: string[] = [];
		if (formValues.first_name !== first_name) {
			changed.push("First Name");
		}
		if (formValues.password) {
			changed.push("Password");
		}
		if (formValues.last_name !== last_name) {
			changed.push("Last Name");
		}
		if (formValues.avatarUrl !== avatarUrl) {
			changed.push("Avatar Url");
		}
		if (changed.length > 0) {
			// console.log(
			// 	"Save Changes is popping Up Due To : ",
			// 	changed.join(", ")
			// );
			return true;
		}

		return false;
	};

	const { isError, isLoading, error, mutate, data } = useMutation(
		(formData: UpdateUserData) => {
			return authService.updateUserInfo(formData);
		},
		{
			onError: (err: any) => {
				console.log(err.response.status);

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
					msg: `Fields updated successfully - ${data.data.changedFields.join(
						", "
					)}`,
					type: formMsgsTypeEnum.Success,
				});

				authDataDispatch({
					type: AuthDataActionsTypeEnum.PROFILE_UPDATE,
					payload: { ...data.data.data.newUser },
				});
			},
		}
	);

	const SaveVsLoader = (formValues: UpdateUserData) => {
		if (isLoading) {
			return (
				<>
					<div className="flex items-center justify-center w-48 mb-1 ml-2">
						<Loader size="sm" thickness="md" />
					</div>
				</>
			);
		} else if (checkIfFormChanged(formValues)) {
			return (
				<div>
					<Button type="submit" value="Save Changes"></Button>
				</div>
			);
		}
	};

	if (isError) {
		if (error.message === "Network Error") return <ServerDown />;
	}
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
					onSubmit={(values: UpdateUserData, { resetForm }) => {
						mutate(values);
						resetForm({
							values: {
								password: "",
								confirmPassword: "",
								avatarUrl: values.avatarUrl,
								first_name: values.first_name,
								last_name: values.last_name,
							},
						});
					}}
					validationSchema={updateProfileSchema}
					validateOnChange={true}
				>
					{({ resetForm, initialValues, values }) => (
						<Form autoComplete="false">
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
									<div className="mx-4">
										<div
											className={
												values.password !==
												initialValues.password
													? ""
													: "hidden"
											}
										>
											<FormikFieldWithErrMsg
												id="confirmPassword"
												name="confirmPassword"
												type="password"
												labelName="Confirm Password :"
												labelFor="confirmPassword"
											/>
										</div>
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
								<div>{SaveVsLoader(values)}</div>
							</div>
							{checkIfFormChanged(values) ? null : (
								<div className="flex mt-2 ml-4 text-xl font-semibold ">
									<div className={formMsg.type}>
										{formMsg.msg}
									</div>
								</div>
							)}
						</Form>
					)}
				</Formik>

				<div className="m-4">
					<DeleteAccountBtn />
				</div>
			</div>
		</div>
	);
};

export default UpdateProfileForm;
