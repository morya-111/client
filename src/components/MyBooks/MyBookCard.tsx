import React, { useState } from "react";
import { ReactComponent as DeleteIcon } from "assets/common/delete-icon.svg";
import { ReactComponent as EditIcon } from "assets/common/edit-icon.svg";
import DeleteBookConfirmation from "./DeleteBookConfirmation";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	description: string | null;
	genre: string;
	imgUrl: string;
	bookId: number;
};
const MyBookCard: React.FC<Props> = (props) => {
	const { title, description, genre, imgUrl, bookId, ...rest } = props;
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
				<div className="flex justify-center text-xl text-red-800 rounded-md xs:text-xs bg-semiLight">
					<span>Book deleted from your collection.</span>
				</div>
			</>
		);
	}

	return (
		<div
			{...rest}
			className="p-5 bg-white rounded-lg shadow hover:shadow-xl"
		>
			<div className="flex flex-row">
				<div className="shadow">
					<img src={imgUrl} alt="Book" />
				</div>
				<div className="flex flex-col w-full pr-3 ml-5">
					<div className="relative">
						<h1 className="inline-block text-2xl font-bold text-dark">
							{title}
						</h1>
						<h2 className="absolute right-0 inline-block px-2 text-sm leading-relaxed capitalize rounded-full bg-semiLight text-light ">
							{genre}
						</h2>
					</div>
					<div className="text-base text-dark">{description}</div>
					<div className="flex border-t border-gray-400">
						<span className="text-gray-500">For Sell</span>
						<span className="ml-auto capitalize text-dark">
							Amount
						</span>
					</div>
					<div className="flex border-t border-gray-400">
						<span className="text-gray-500">For Rent</span>
						<span className="ml-auto capitalize text-dark">
							Amount
						</span>
					</div>
					<div className="flex border-t border-b border-gray-400">
						<span className="text-gray-500">Deposit</span>
						<span className="ml-auto capitalize text-dark">
							Amount
						</span>
					</div>
				</div>
				<div className="flex justify-center space-x-2">
					<button className="inline-flex">
						<EditIcon />
					</button>
					<button
						className="inline-flex"
						onClick={openDelConfirmation}
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
