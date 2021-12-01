const MyProfile: React.FC<React.ComponentPropsWithoutRef<"button">> = ({
	onClick,
}) => {
	return (
		<button
			className="relative font-bold text-white rounded-full top-3 bg-light"
			onClick={onClick}
		>
			<img
				src="https://i.ibb.co/rt9TSY7/8740db0e7e05.png"
				alt="P"
				className="bg-light "
				style={{ height: "40px" }}
			/>
		</button>
	);
};

export default MyProfile;
