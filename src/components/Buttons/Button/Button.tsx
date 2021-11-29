import classNames from "classnames";
import React from "react";

type Props = React.ComponentPropsWithoutRef<"button"> & {
	left?: React.ReactNode;
	right?: React.ReactNode;
	full?: boolean;
	color?: "dark" | "semiDark" | "semiLight";
};

const Button = React.forwardRef<HTMLButtonElement, Props>((props, ref) => {
	const { left, right, full = false, color = "semiDark", ...rest } = props;

	return (
		<button
			ref={ref}
			{...rest}
			className={classNames(
				"flex text-light items-center justify-center px-8 py-1 text-xl align-text-top rounded-lg hover:shadow-lg transition",
				{ "w-full": full },
				{ "bg-dark": color === "dark" },
				{ "bg-semiDark": color === "semiDark" },
				{ "bg-semiLight": color === "semiLight" }
			)}
		>
			{left}
			{props.value}
			{right}
		</button>
	);
});
export default Button;
