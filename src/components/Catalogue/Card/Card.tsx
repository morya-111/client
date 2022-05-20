import classNames from "classnames";
import Badge from "components/Badge";
import React, { useState } from "react";
import { boolean } from "yup";
import BookIndicator from "../BookIndicator";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	description: string;
	genre: string;
	imgUrl: string;
	borrow: boolean;
	sell: boolean;
};
const Card: React.FC<Props> = (props) => {
	const { title, description, genre, imgUrl, borrow, sell, ...rest } = props;
	const [cardHovered, setCardHovered] = useState(false);
	return (
		<div
			onMouseEnter={() => {
				setCardHovered(true);
			}}
			onMouseLeave={() => {
				setCardHovered(false);
			}}
			style={{
				filter: cardHovered
					? "drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.5))"
					: "drop-shadow(0px 4px 11px rgba(0, 0, 0, 0.25))",
			}}
			{...rest}
			className="md:w-60 flex flex-col col-span-2 p-3 transition-all bg-white rounded-lg hover:cursor-pointer hover:scale-[102%]"
		>
			<div className="relative flex flex-col justify-center flex-grow w-full px-6">
				<div className="absolute top-0 left-0 flex items-center justify-center w-full h-full ">
					<div
						className={
							cardHovered
								? "absolute w-full h-[100%] rounded-t-[10px] rounded-b-[10px] duration-[500ms] bg-bgGrey50  z-0"
								: "absolute w-0 h-[100%] rounded-t-[0px] bg-bgGrey45 z-0 duration-[1000ms] opacity-0"
						}
					></div>
				</div>

				<img
					src={imgUrl}
					alt=""
					className=""
					style={{
						filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
					}}
				/>
			</div>
			<div
				className={classNames(
					"mt-1 overflow-hidden text-lg font-bold text-dark  overflow-ellipsis line-clamp-1 z-10 font-imFell",
					{ "line-clamp-2": description === null }
				)}
			>
				{title}
			</div>
			<div className="z-10 text-sm font-light text-dark line-clamp-2 font-martel">
				{description}
			</div>
			<div className="z-10 flex justify-between">
				<Badge label={genre} />
				<BookIndicator borrow={borrow} sell={sell} />
			</div>
		</div>
	);
};

export default Card;
