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
		<div className="mt-4 ml-4 bg-white rounded-sm ">
			<span className="m-4 ">Choose An Avatar: </span>
			<div className="grid grid-cols-4 grid-rows-2 ml-6 ">
				{imgUrls.map((url, i) => {
					if (meta.value === url) {
						return (
							<div
								key={i}
								className="inline-flex items-center justify-center w-20 h-20 my-4 bg-black rounded-full"
							>
								<img
									src={url}
									className="rounded-full opacity-40"
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
							className="inline-flex items-center justify-center w-20 h-20 my-4 rounded-full"
						>
							<img
								src={url}
								className="rounded-full"
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
