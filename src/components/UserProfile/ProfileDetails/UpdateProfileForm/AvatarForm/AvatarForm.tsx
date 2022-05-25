import imgUrls from "utils/imgUrls";
import { MdCheck } from "react-icons/md";
import { useField } from "formik";

const AvatarForm: React.FC = () => {
	const [field, meta, helpers] = useField("avatarUrl");

	const handleClick = (newUrl: string) => {
		helpers.setValue(newUrl);
		helpers.setTouched(true);
	};

	return (
		<div className="p-3 py-4 m-4 bg-white rounded-md">
			<span className="ml-4 font-semibold font-martel">
				Choose An Avatar :{" "}
			</span>
			<div className="grid grid-cols-4 grid-rows-2 ml-4">
				{imgUrls.map((url, i) => {
					if (meta.value === url) {
						return (
							<div
								key={i}
								className="inline-flex items-center justify-center w-20 h-20 my-4 bg-black rounded-full"
							>
								<img
									src={url}
									className="rounded-full cursor-pointer opacity-40"
									alt="<Avatar Pic>"
								/>
								<div className="absolute z-100">
									<MdCheck size="50" color="white" />
								</div>
							</div>
						);
					}
					return (
						<div
							key={i}
							style={{
								filter: "drop-shadow(0px 7px 3px rgba(0, 0, 0, 0.31))",
							}}
							className="inline-flex items-center justify-center w-20 h-20 my-4 rounded-full"
						>
							<img
								src={url}
								className="rounded-full cursor-pointer"
								alt="<Avatar Pic>"
								onClick={() => {
									handleClick(url);
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
};
export default AvatarForm;
