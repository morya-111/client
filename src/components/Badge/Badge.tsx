import React from "react";

interface Props {
	label: string;
}

const Badge: React.FC<Props> = ({ label }) => {
	return (
		<div className="px-4 py-[0.125rem] text-xs text-center rounded-xl bg-bgGrey100 text-white capitalize font-martel">
			{label}
		</div>
	);
};

export default Badge;
