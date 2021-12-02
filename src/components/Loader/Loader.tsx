import React from "react";
import classNames from "classnames";

interface Props {
	size?: "xs" | "sm" | "md" | "lg";
	thickness?: "sm" | "md" | "lg";
	color?: "dark" | "semiDark" | "semiLight" | "light";
	loading?: boolean;
}

const sizeMap = {
	xs: "w-4 h-4 ",
	sm: "w-6 h-6",
	md: "w-12 h-12",
	lg: "w-16 h-16",
};

const thicknessMap = {
	sm: "border-2",
	md: "border-4",
	lg: "border-8",
};

const colorMap = {
	dark: "border-t-dark",
	semiDark: "border-t-semiDark",
	semiLight: "border-t-semiLight",
	light: "border-t-light",
};

const Loader: React.FC<Props> = ({
	size = "md",
	thickness = "md",
	color = "semiDark",
	loading = true,
}) => {
	if (!loading) return <></>;

	return (
		<div className="flex items-center justify-center ">
			<div
				className={classNames(
					"z-20 border-transparent rounded-full animate-spin ",
					thicknessMap[thickness],
					sizeMap[size],
					colorMap[color]
				)}
			/>
			<div
				className={classNames(
					"absolute border-opacity-40 border-solid rounded-full ",
					thicknessMap[thickness],
					sizeMap[size],
					{ "border-dark": color === "dark" },
					{ "border-semiLight": color === "semiLight" },
					{ "border-semiDark": color === "semiDark" },
					{ "border-light": color === "light" }
				)}
			></div>
		</div>
	);
};

export default Loader;
