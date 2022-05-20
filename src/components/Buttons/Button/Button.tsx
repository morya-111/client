import classNames from "classnames";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
	left?: React.ReactNode;
	right?: React.ReactNode;
	full?: boolean;
	color?:
		| "error-black"
		| "black"
		| "dark"
		| "semiDark"
		| "semiLight"
		| "error";
};

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const { left, right, full = false, color = "semiDark", ...rest } = props;

	return (
		<button
			ref={ref}
			{...rest}
			className={classNames(
				"flex text-light items-center justify-center px-16 py-1.5 text-base md:text-lg lg:text-lg font-bold align-text-top rounded-md hover:shadow-xl transition font-martel ",
				{ "w-full": full },
				{ "bg-black hover:bg-opacity-75": color === "black" },
				{ "hover:bg-red-500 bg-black": color === "error-black" },
				{ "bg-dark": color === "dark" },
				{ "bg-semiDark": color === "semiDark" },
				{ "bg-semiLight": color === "semiLight" },
				{ "hover:bg-red-500 bg-semiDark": color === "error" }
			)}
		>
			{left}
			{props.value}
			{right}
		</button>
	);
});
export default Button;
