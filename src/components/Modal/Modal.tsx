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
			style={{ filter: "drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25))" }}
			className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-bgScreen"
			onClick={() => {
				if (disableDismiss) return;
				onClose();
			}}
		>
			<div
				{...rest}
				className="relative z-10 w-5/6 bg-white rounded-lg md:w-2/3 lg:w-1/2 dark:bg-primary-500"
				onClick={(e) => e.stopPropagation()}
			>
				{props.children}
			</div>
		</div>,
		document.getElementById("portal")!
	);
});

export default Modal;
