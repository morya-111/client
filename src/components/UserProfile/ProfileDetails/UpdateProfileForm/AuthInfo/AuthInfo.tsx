import { useQuery } from "react-query";
import authService from "utils/AuthService";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import Loader from "components/Loader";

type props = {
	setPasswordVisibility: React.Dispatch<React.SetStateAction<boolean>>;
};
const AuthInfo: React.FC<props> = ({ setPasswordVisibility }) => {
	const authInfoQuery = useQuery(
		"getAuthInfo",
		() => {
			return authService.getAuthInfo();
		},
		{
			refetchOnWindowFocus: false,
			retry: false,
			onSuccess: (data) => {
				if (data.data.data.loggedInUsing === "BOOKEX")
					setPasswordVisibility(true);
			},
		}
	);
	const getIcon = (authUsing: string) => {
		switch (authUsing) {
			case "GOOGLE":
				return (
					<span className="inline-block mr-2">
						<FcGoogle className="h-10 w-9 " />
					</span>
				);

			case "FB":
				return (
					<span className="inline-block pt-1 mr-2">
						<AiFillFacebook className="w-10 h-10 " />
					</span>
				);

			case "BOOKEX":
				return (
					<span className="inline-block m-2 ">
						<img
							src="https://i.ibb.co/CbCd6Bv/Book-Ex-sm.png"
							alt="BookEx"
							className="w-12 "
						/>
					</span>
				);
		}
	};
	return (
		<div>
			{authInfoQuery.isLoading ? (
				<Loader size="sm" />
			) : (
				<div className="flex items-center justify-between bg-white rounded-md">
					<span className="inline-block font-imFell">
						&nbsp; &nbsp; You are logged in using -
					</span>
					{getIcon(authInfoQuery.data?.data.data.loggedInUsing)}
				</div>
			)}
		</div>
	);
};

export default AuthInfo;
