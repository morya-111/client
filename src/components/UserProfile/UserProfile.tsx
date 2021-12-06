import ProfileSideBar from "./ProfileSideBar";
import ProfileDetails from "./ProfileDetails";
import Footer from "components/Footer";

const UserProfile: React.FC = () => {
	return (
		<>
			<div className="flex flex-col items-center min-w-full min-h-screen md:items-start md:flex-row bg-light">
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
