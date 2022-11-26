import useDeleteBookQuery from "hooks/useDeleteBookQuery";
import Modal from "components/Modal";
import Button from "components/Buttons/Button";
import Loader from "components/Loader";
import { ReactComponent as CloseIcon } from "assets/common/close-icon.svg";
import DeleteDialog from "assets/2.0/deletedialog.png";
import { useQueryClient } from "react-query";

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
	const queryClient = useQueryClient();
	const { triggerDelQuery, status } = useDeleteBookQuery({
		bookId,
		onSuccess: () => {
			handleParentDeletion();
			queryClient.resetQueries();
		},
	});

	const handleClickOnYes = () => {
		triggerDelQuery();
		closeModal();
	};

	return (
		<Modal isOpen={true} onClose={closeModal} className="">
			<div className="w-full h-full py-5 bg-white rounded-md drop-shadow-xl">
				<div className="flex flex-col items-center">
					<span className="flex pt-6 text-base font-semibold md:text-lg sm:pt-4 lg:text-2xl font-martel">
						Are you sure you want to delete this book?
					</span>
					<img src={DeleteDialog} alt="del" className="my-1" />
					<span
						className="absolute top-0 right-0 pt-2 pr-3 cursor-pointer hover:animate-scale-reveal"
						onClick={closeModal}
					>
						<CloseIcon className="w-6 h-auto" />
					</span>
				</div>
				<div className="flex justify-around m-3">
					<div className="">
						<Button
							value="Yes"
							color="error-black"
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
							color="black"
							onClick={closeModal}
						></Button>
					</div>
				</div>
			</div>
		</Modal>
	);
};

export default DeleteBookConfirmation;
