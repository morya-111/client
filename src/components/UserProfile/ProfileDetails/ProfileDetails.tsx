import UpdateProfileForm from "./UpdateProfileForm";

const ProfileDetails = () => {
	return (
		<div className="flex min-h-screen ">
			<div className="left-0 w-full min-h-screen mb-10 border-l-2 border-gray-400 ">
				<div className="flex justify-center w-full">
					<UpdateProfileForm />
				</div>
			</div>
		</div>
	);
};

export default ProfileDetails;
