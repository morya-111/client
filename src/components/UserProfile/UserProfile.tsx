import ProfileSideBar from "./ProfileSideBar";
import ProfileDetails from "./ProfileDetails";
import Footer from "components/Footer";

const UserProfile: React.FC = () => {
	return (
		<>
			<div className="flex items-center min-w-full min-h-screen pt-5 md:items-start md:flex-row bg-bgGrey45">
				<>
					<div>
						<ProfileSideBar page="Profile" />
					</div>
					<div className="flex flex-col w-full  lg:mr-10 lg:w-4/5">
						<ProfileDetails />
					</div>
				</>
			</div>
			<Footer />
		</>
	);
};

export default UserProfile;
