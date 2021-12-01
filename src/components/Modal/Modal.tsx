import React from "react";
import ReactDOM from "react-dom";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	isOpen: boolean;
	onClose: () => any;
	disableDismiss?: boolean;
};

const Modal = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { isOpen, onClose, disableDismiss = false, ...rest } = props;

	if (!isOpen) return <></>;

	return ReactDOM.createPortal(
		<div
			className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50"
			onClick={() => {
				if (disableDismiss) return;
				onClose();
			}}
		>
			<div
				{...rest}
				className="relative z-10 w-3/4 bg-white rounded-lg sm:w-1/2 dark:bg-primary-500"
				onClick={(e) => e.stopPropagation()}
			>
				{props.children}
			</div>
		</div>,
		document.getElementById("portal")!
	);
});

export default Modal;
