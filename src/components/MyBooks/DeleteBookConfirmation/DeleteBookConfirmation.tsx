import useDeleteBookQuery from "hooks/useDeleteBookQuery";
import Modal from "components/Modal";
import Button from "components/Buttons/Button";
import Loader from "components/Loader";
import { ReactComponent as CloseIcon } from "assets/common/close-icon.svg";
type props = {
	bookId: number;
	closeModal: () => any;
	handleParentDeletion: Function;
};
const DeleteBookConfirmation = ({
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
			<div className="w-full h-full pb-3 rounded-md bg-semiLight drop-shadow-xl">
				<div className="flex flex-col items-center">
					<span className="flex pt-6 text-base font-semibold md:text-lg sm:pt-4 lg:text-xl">
						Are you sure you want to delete this book?
					</span>
					<span
						className="absolute top-0 right-0 pt-2 pr-3 cursor-pointer"
						onClick={closeModal}
					>
						<CloseIcon />
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

export default DeleteBookConfirmation;
