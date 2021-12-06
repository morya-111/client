import NavigationBar from "components/NavigationBar";
import UserProfile from "components/UserProfile";
const UserProfilePage: React.FC = () => {
	return (
		<div className="bg-red-500">
			<NavigationBar />
			<UserProfile />
		</div>
	);
};

export default UserProfilePage;
