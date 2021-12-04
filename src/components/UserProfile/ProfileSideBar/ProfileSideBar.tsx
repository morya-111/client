import useAuthData from "hooks/useAuthData";
const ProfileSideBar: React.FC = () => {
	const { avatarUrl, first_name, email } = useAuthData();
	return (
		<div className="container mx-10 md:flex max-w-max">
			<div className="text-center ">
				<div className="inline-flex items-center justify-center rounded-full w-60 h-60">
					<img
						src={avatarUrl}
						className="rounded-full"
						alt="<Avatar Pic>"
					/>
				</div>
				<div className="text-center">
					<h1 className="text-2xl font-bold">{first_name}</h1>
					<h3 className="text-sm text-gray-500">{email}</h3>
				</div>
			</div>
		</div>
	);
};

export default ProfileSideBar;
