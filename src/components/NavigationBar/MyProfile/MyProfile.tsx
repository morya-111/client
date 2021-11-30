const MyProfile: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
	onClick,
}) => {
	return (
		<button
			className="relative font-bold text-white rounded-full top-3 bg-light"
			onClick={onClick}
		>
			<img
				src="https://i.ibb.co/svPq37Q/62c39aa27b5f.png"
				alt="P"
				className="bg-light "
				style={{ height: "40px" }}
			/>
			{/* <ProfilePopUp className=" z-100" /> */}
		</button>
	);
};

export default MyProfile;
