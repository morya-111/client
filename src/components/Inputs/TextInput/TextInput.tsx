import React from "react";
import classNames from "classnames";
import { useField } from "formik";

type Props = Omit<React.ComponentPropsWithoutRef<"input">, "name"> & {
	placeholder?: string;
	label?: string;
	right?: React.ReactNode;
	left?: React.ReactNode;
	name: string;
};

const TextInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { placeholder, label, right, left, ...rest } = props;

	const [field, meta] = useField(props.name);

	const isError = (meta.error && meta.touched) as boolean;

	const inputErrorClass = classNames({
		"border-red-500": isError,
		"border-b-2": isError,
	});

	const inputMargins = classNames({
		"pl-8": left,
	});

	return (
		<div className="relative flex flex-col w-full group h-[35px]">
			{label && (
				<span className="mb-1 ml-1 text-[#4E4E4E] text-sm font-bold text-opacity-80 group-focus-within:text-opacity-100">
					{label}
					{rest.required && <span>*</span>}
				</span>
			)}
			<div className="absolute top-9">{left}</div>
			<input
				placeholder={placeholder}
				style={{ height: "35px", width: "100%" }}
				{...rest}
				{...field}
				ref={ref}
				className={`disabled:opacity-50  min-w-full focus:border-b-2 focus:ring-0 ring-semiLight ring-opacity-50 px-2 py-2 text-lg sm:text-sm font-normal transition-all shadow-sm  bg-white  border-opacity-80 border-solid border-black outline-none font-martel text-dark  ${inputErrorClass} ${inputMargins}`}
			/>
			<div className="absolute right-2 top-10">{right}</div>
			{isError && (
				<span className="ml-1 text-sm text-red-600 ">{meta.error}</span>
			)}
		</div>
	);
});

export default TextInput;
