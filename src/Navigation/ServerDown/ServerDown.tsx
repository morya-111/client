import serverDown from "../../assets/common/it-server.gif";

const ServerDown: React.FC = () => {
	return (
		<div>
			<img src={serverDown} alt="Server Down" className="w-full" />
			<div className="m-auto text-5xl">
				Looks like our server is down ! Plz do not disturb.
			</div>
		</div>
	);
};

export default ServerDown;
