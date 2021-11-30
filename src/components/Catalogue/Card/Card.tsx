import classNames from "classnames";
import Badge from "components/Badge";
import React from "react";
import BookIndicator from "../BookIndicator";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	description: string;
	genre: string;
	imgUrl: string;
};
const Card: React.FC<Props> = (props) => {
	const { title, description, genre, imgUrl, ...rest } = props;
	return (
		<div
			{...rest}
			className="flex flex-col col-span-2 p-3 transition-all bg-white rounded-lg shadow cursor-pointer hover:shadow-2xl"
		>
			<div className="flex flex-col justify-center flex-grow w-full px-6">
				<img src={imgUrl} alt="" className="" />
			</div>
			<div
				className={classNames(
					"mt-1 overflow-hidden text-lg font-bold text-dark  overflow-ellipsis line-clamp-1",
					{ "line-clamp-2": description === null }
				)}
			>
				{title}
			</div>
			<div className="text-sm font-light text-dark line-clamp-2">
				{description}
			</div>
			<div className="flex justify-between">
				<Badge label={genre} />
				<BookIndicator borrow={true} sell={true} />
			</div>
		</div>
	);
};

export default Card;
