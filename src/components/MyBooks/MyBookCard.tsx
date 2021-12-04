import React from "react";
import { ReactComponent as DeleteIcon } from "assets/common/delete-icon.svg";
import { ReactComponent as EditIcon } from "assets/common/edit-icon.svg";
import useDeleteBookQuery from "hooks/useDeleteBookQuery";
import Modal from "components/Modal";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	title: string;
	description: string | null;
	genre: string;
	imgUrl: string;
	bookId: number;
};
const MyBookCard: React.FC<Props> = (props) => {
	const { title, description, genre, imgUrl, bookId, ...rest } = props;

	// NOTE: Delete Book Logic
	const { triggerDelQuery, isSuccess, resolveConfirmation } =
		useDeleteBookQuery({ bookId });
	if (isSuccess) {
		return null;
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
					<button className="inline-flex" onClick={triggerDelQuery}>
						<DeleteIcon />
					</button>
				</div>
			</div>
		</div>
	);
};
// TODO: last working on, 5-12-21, 3:53 AM
const DelBookConfirmation = () => {
	return;
};

export default MyBookCard;
