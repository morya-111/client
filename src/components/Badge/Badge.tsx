import React from "react";

interface Props {
	label: string | number;
}

const Badge: React.FC<Props> = ({ label }) => {
	return (
		<div
			style={{ boxShadow: "0px 3px 0px rgba(0, 0, 0, 0.25)" }}
			className={`px-4 py-[0.2rem] flex items-center text-xs text-center bg-bgGrey100 rounded-xl text-white capitalize font-martel`}
		>
			{label}
		</div>
	);
};

export default Badge;
