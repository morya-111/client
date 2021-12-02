import ProfileSideBar from "./ProfileSideBar";
import ProfileDetails from "./ProfileDetails";
import Loader from "components/Loader";
import Footer from "components/Footer";
import { NavLink } from "react-router-dom";

const UserProfile: React.FC = () => {
	return (
		<>
			<div className="flex min-w-full min-h-screen bg-light">
				<>
					<div>
						<ProfileSideBar />
					</div>
					<div className="w-full">
						<ProfileDetails />
					</div>
				</>
			</div>
			<Footer />
		</>
	);
};

export default UserProfile;

// <div className="flex flex-row justify-center">
// 	<ProfileSideBar />
// 	<ProfileDetails />
// </div>
