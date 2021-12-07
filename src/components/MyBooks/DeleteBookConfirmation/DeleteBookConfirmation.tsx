import useDeleteBookQuery from "hooks/useDeleteBookQuery";
import Modal from "components/Modal";
import Button from "components/Buttons/Button";
import Loader from "components/Loader";
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

export default DeleteBookConfirmation;
