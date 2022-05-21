import React, { useState } from "react";
import { ReactComponent as DeleteIcon } from "assets/common/delete-icon.svg";
import { ReactComponent as EditIcon } from "assets/common/edit-icon.svg";
import DeleteBookConfirmation from "./DeleteBookConfirmation";
import { useQueryClient } from "react-query";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	description: string | null;
	genre: string;
	imgUrl: string;
	bookId: number;
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
		bookId,
		...rest
	} = props;
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);

	const openDelConfirmation = () => {
		setIsModalOpen(true);
	};
	const closeModal = () => {
		setIsModalOpen(false);
	};
	const handleDeletion = () => {
		setIsDeleted(true);
	};

	if (isDeleted) {
		return (
			<>
				<div
					className="flex justify-center py-2 text-xl text-center bg-white rounded-md text-dark xs:text-xs hover:cursor-default font-imFell"
					style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
				>
					<span>
						<b>{title}</b> book deleted from your collection.
					</span>
				</div>
			</>
		);
	}
	return (
		<div
			{...rest}
			className="relative flex p-5 bg-white rounded-lg shadow md:py-5 md:pl-5 md:pr-3 hover:scale-[101%]"
			style={{ boxShadow: "0px 4px 0px rgba(0, 0, 0, 0.25)" }}
		>
			<div className="flex flex-col items-center w-full lg:items-start lg:flex-row">
				<div className="mx-auto my-auto shadow md:flex-shrink-0">
					<img
						style={{
							filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.25))",
						}}
						alt="bookImage"
						className="w-auto h-44 sm:h-60 md:h-36"
						src={imgUrl}
					/>
				</div>
				<div className="flex flex-col w-full pr-3 ml-5">
					<div className="relative">
						<h1 className="inline-block text-2xl font-bold text-dark line-clamp-1 font-imFell">
							{title}
						</h1>
						<div className="flex justify-end">
							<h2
								style={{
									boxShadow:
										"0px 3px 0px rgba(0, 0, 0, 0.25)",
								}}
								className="px-2 mb-1 text-xs leading-relaxed capitalize rounded-full bg-bgGrey100 text-light font-martel"
							>
								{genre}
							</h2>
						</div>
					</div>
					<div className="text-base border-b border-gray-400 2xl:line-clamp-2 line-clamp-1 text-dark font-martel">
						{description}
					</div>
					<div className="flex flex-col mt-1 border-collapse">
						{sell && (
							<div className="flex border-b border-gray-400">
								<span className="mt-1 text-gray-500 font-martel">
									For Sell
								</span>
								<span className="mt-1 ml-auto capitalize text-dark font-martel">
									&#x20B9;{price}
								</span>
							</div>
						)}
						{borrow && (
							<div>
								<div className="flex border-b border-gray-400">
									<span className="mt-1 text-gray-500 font-martel">
										For Rent
									</span>
									<span className="mt-1 ml-auto capitalize text-dark font-martel">
										&#x20B9;{fees} /{" "}
										{durationUnit?.slice(
											0,
											durationUnit.length - 1
										)}
									</span>
								</div>
								<div className="flex mt-1 border-b border-gray-400 font-martel">
									<span className="text-gray-500">
										Available For
									</span>
									<span className="mt-1 ml-auto capitalize text-dark font-martel">
										{duration} {durationUnit}
									</span>
								</div>
								<div className="flex mt-1 border-b border-gray-400 font-martel">
									<span className="text-gray-500">
										Deposit
									</span>
									<span className="mt-1 ml-auto capitalize text-dark font-martel">
										&#x20B9;{deposit}
									</span>
								</div>
							</div>
						)}
					</div>
				</div>

				<div className="absolute top-0 right-0 items-center p-5 space-x-2 lg:p-0 lg:pr-1 lg:static lg:flex lg:flex-row">
					{/* <button
						className="hover:scale-125"
						onClick={(e: any) => {
							console.log("editClicked");
							e.stopPropagation();
						}}
					>
						<EditIcon />
					</button> */}
					<button
						className="hover:scale-125"
						onClick={(e: any) => {
							openDelConfirmation();
							e.stopPropagation();
						}}
					>
						<DeleteIcon />
					</button>
					{isModalOpen ? (
						<div>
							<DeleteBookConfirmation
								bookId={bookId}
								closeModal={closeModal}
								handleParentDeletion={handleDeletion}
							/>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default MyBookCard;
