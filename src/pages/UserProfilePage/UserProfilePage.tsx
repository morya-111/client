import NavigationBar from "components/NavigationBar";
import UserProfile from "components/UserProfile";
const UserProfilePage: React.FC = () => {
	return (
		<div className="bg-white">
			<NavigationBar />
			<UserProfile />
		</div>
	);
};

export default UserProfilePage;
