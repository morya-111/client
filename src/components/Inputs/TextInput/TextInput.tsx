import React from "react";
import classNames from "classnames";
import { useField } from "formik";

type Props = React.ComponentPropsWithoutRef<"input"> & {
	label?: string;
	right?: React.ReactNode;
};

const TextInput = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { label, right, ...rest } = props;

	const [field, meta] = useField(props.name!);

	const isError = (meta.error && meta.touched) as boolean;

	const inputErrorClass = classNames({
		"border-red-500": isError,
		"border-2": isError,
	});

	return (
		<div className="relative flex flex-col w-full group">
			<span className="mb-1 ml-1 text-[#4E4E4E] text-sm font-bold text-opacity-80 group-focus-within:text-opacity-100">
				{label}
				{rest.required && <span>*</span>}
			</span>
			<input
				{...rest}
				{...field}
				ref={ref}
				className={`disabled:opacity-50 w-full px-2 py-2 text-xl font-normal transition-all shadow-sm  bg-white  border-opacity-80 border-solid rounded-lg outline-none  focus:border-opacity-100 focus:shadow-md hover:shadow-md ${inputErrorClass}`}
			/>
			<div className="absolute right-2 top-8">{right}</div>
			{isError && (
				<span className="ml-1 text-sm text-red-600 ">{meta.error}</span>
			)}
		</div>
	);
});

export default TextInput;
