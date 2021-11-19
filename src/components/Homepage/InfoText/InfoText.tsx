import React from "react";

interface Props {
	title: string;
	subTitle: string;
}

const InfoText: React.FC<Props> = ({ title, subTitle }) => {
	return (
		<div className="flex flex-col justify-center text-left">
			<span className="text-large text-dark ">{title}</span>
			<span className="text-semiLarge text-dark">{subTitle}</span>
		</div>
	);
};
export default InfoText;
