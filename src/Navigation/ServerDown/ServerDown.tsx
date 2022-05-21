import serverDown from "../../assets/common/it-server.gif";
import "./ServerDown.css";
const ServerDown: React.FC = () => {
	return (
		<div className="flex flex-col justify-center w-full ">
			<img
				src={serverDown}
				alt="Server Down"
				className="self-center gif-img"
			/>
			<div className="self-center text-5xl">
				Looks like our server is down ! Plz do not disturb.
			</div>
		</div>
	);
};

export default ServerDown;
