import Badge from "components/Badge";
import React from "react";
import BookIndicator from "../BookIndicator";

const Card: React.FC = () => {
	return (
		<div className="col-span-2 p-3 transition-all bg-white rounded-lg shadow hover:shadow-lg">
			<img
				src="https://via.placeholder.com/1080x1620/eee?text=1.5:1"
				alt=""
				className="w-full px-6"
			/>
			<div className="mt-1 overflow-hidden text-lg font-bold text-dark whitespace-nowrap overflow-ellipsis">
				Book Title
			</div>
			<div className="text-sm font-light text-dark line-clamp-2">
				Lorem ipsum dolor sit amet consectetur adipisicing elit.
				Pariatur iure minima facilis sequi voluptatem totam quae enim id
				laborum et.
			</div>
			<div className="flex justify-between">
				<Badge label="Mystery" />
				<BookIndicator borrow={true} sell={true} />
			</div>
		</div>
	);
};

export default Card;
