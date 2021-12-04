import React from "react";
import { ReactComponent as DeleteIcon } from "assets/common/delete-icon.svg";
import { ReactComponent as EditIcon } from "assets/common/edit-icon.svg";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	description: string | null;
	genre: string;
	imgUrl: string;
	sell: boolean;
	borrow: boolean;
	price?: number;
	fees?: number;
	deposit?: number;
	duration?: number;
	durationUnit?: string;
};
const MyBookCard: React.FC<Props> = (props) => {
	const {
		title,
		description,
		genre,
		imgUrl,
		price,
		sell,
		borrow,
		fees,
		deposit,
		duration,
		durationUnit,
		...rest
	} = props;
	return (
		<div
			{...rest}
			className="relative flex p-5 bg-white rounded-lg shadow md:py-5 md:pl-5 md:pr-3 hover:shadow-xl "
		>
			<div className="flex flex-col items-center w-full md:items-start md:flex-row">
				<div className="mx-auto my-auto shadow md:flex-shrink-0">
					<img className="w-auto h-44 sm:h-60 md:h-36" src={imgUrl} />
				</div>
				<div className="flex flex-col w-full pr-3 ml-5">
					<div className="relative">
						<h1 className="inline-block text-2xl font-bold text-dark line-clamp-1">
							{title}
						</h1>
						<div className="flex justify-end">
							<h2 className="px-2 mb-1 text-xs leading-relaxed capitalize rounded-full bg-semiLight text-light">
								{genre}
							</h2>
						</div>
					</div>
					<div className="text-base border-b border-gray-400 2xl:line-clamp-2 line-clamp-1 text-dark">
						{description}
					</div>
					<div className="flex flex-col border-collapse">
						{sell && (
							<div className="flex border-b border-gray-400">
								<span className="text-gray-500">For Sell</span>
								<span className="ml-auto capitalize text-dark">
									&#x20B9;{price}
								</span>
							</div>
						)}
						{borrow && (
							<div>
								<div className="flex border-b border-gray-400">
									<span className="text-gray-500">
										For Rent
									</span>
									<span className="ml-auto capitalize text-dark">
										&#x20B9;{fees} /{" "}
										{durationUnit?.slice(
											0,
											durationUnit.length - 1
										)}
									</span>
								</div>
								<div className="flex border-b border-gray-400">
									<span className="text-gray-500">
										Available For
									</span>
									<span className="ml-auto capitalize text-dark">
										{duration} {durationUnit}
									</span>
								</div>
								<div className="flex border-b border-gray-400">
									<span className="text-gray-500">
										Deposit
									</span>
									<span className="ml-auto capitalize text-dark">
										&#x20B9;{deposit}
									</span>
								</div>
							</div>
						)}
					</div>
				</div>
				<div className="absolute top-0 right-0 h-6 mx-3 my-5 md:m-0 w-14 md:w-[90px] md:relative md:flex md:h-auto">
					<div className="container absolute top-0 right-0 space-x-2">
						<button className="inline-flex">
							<EditIcon />
						</button>
						<button className="inline-flex">
							<DeleteIcon />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MyBookCard;
