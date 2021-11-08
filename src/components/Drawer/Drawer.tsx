import React from "react";
import ReactDOM from "react-dom";

type Props = React.ComponentPropsWithoutRef<"div"> & {
	isOpen: boolean;
	onClose: () => any;
};

const Drawer = React.forwardRef<HTMLDivElement, Props>((props, ref) => {
	const { isOpen, onClose, children, ...rest } = props;

	return ReactDOM.createPortal(
		<div
			style={{ visibility: isOpen ? "visible" : "hidden" }}
			className="fixed top-0 left-0 w-screen h-screen transition-all bg-black bg-opacity-50"
			onClick={onClose}
		>
			<div
				ref={ref}
				{...rest}
				style={{ left: isOpen ? "0" : "-100%" }}
				className="absolute h-screen transition-all rounded-r-lg "
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>,
		document.getElementById("portal")!
	);
});

export default Drawer;
