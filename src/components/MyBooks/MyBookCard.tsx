import React, { useState } from "react";
import { ReactComponent as DeleteIcon } from "assets/common/delete-icon.svg";
import { ReactComponent as EditIcon } from "assets/common/edit-icon.svg";
import useDeleteBookQuery from "hooks/useDeleteBookQuery";
import Modal from "components/Modal";
import Button from "components/Buttons/Button";
import Loader from "components/Loader";

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
							<DelBookConfirmation
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

type props = {
	bookId: number;
	closeModal: () => any;
	handleParentDeletion: Function;
};
const DelBookConfirmation = ({
	bookId,
	closeModal,
	handleParentDeletion,
}: props) => {
	const { triggerDelQuery, status } = useDeleteBookQuery({
		bookId,
		onSuccess: () => {
			handleParentDeletion();
		},
	});

	const handleClickOnYes = () => {
		triggerDelQuery();
		closeModal();
	};

	return (
		<Modal isOpen={true} onClose={closeModal} className="">
			<div className="w-full h-full pb-3 rounded-md bg-semiLight">
				<div className="flex justify-between">
					<span className="pt-2 pl-3 lg:text-lg">
						You sure you want to delete this book?
					</span>
					<span
						className="pl-3 pr-2 cursor-pointer"
						onClick={closeModal}
					>
						X
					</span>
				</div>
				<div className="flex justify-around m-3">
					<div className="">
						<Button
							value="Yes"
							color="error"
							onClick={handleClickOnYes}
							left={
								status === "loading" ? (
									<Loader size="sm" />
								) : null
							}
						></Button>
					</div>
					<div className="">
						<Button
							value="Cancel"
							color="semiDark"
							onClick={closeModal}
						></Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default MyBookCard;
