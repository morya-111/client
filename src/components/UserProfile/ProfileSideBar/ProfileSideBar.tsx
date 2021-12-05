import useAuthData from "hooks/useAuthData";
import singleQuote from "utils/quotes";

type Props = {
	showEmail?: boolean;
};
const ProfileSideBar: React.FC<Props> = ({ showEmail = true }) => {
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
					{showEmail && (
						<h3 className="text-sm text-gray-500">{email}</h3>
					)}
				</div>
				<div className="flex-col items-center hidden w-64 px-5 pt-3 mt-5 font-bold text-center border-t border-gray-500 md:flex lg:w-72">
					<div>"{singleQuote.text}"</div>
					<div className="text-sm font-semibold text-opacity-70 text-dark">
						-{singleQuote.author}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileSideBar;
