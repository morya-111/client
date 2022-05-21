import useAuthData from "hooks/useAuthData";

const MyProfile: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
	onClick,
}) => {
	const { avatarUrl } = useAuthData();
	return (
		<button
			className="relative font-bold text-white rounded-full top-0.3 bg-light "
			onClick={onClick}
		>
			<img
				src={avatarUrl}
				alt="P"
				className="duration-[300ms] rounded-full bg-light "
				style={{ height: "40px" }}
			/>
		</button>
	);
};

export default MyProfile;
