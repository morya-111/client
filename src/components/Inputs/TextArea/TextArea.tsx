import React from "react";
import classNames from "classnames";
import { useField } from "formik";

type Props = Omit<React.ComponentPropsWithoutRef<"textarea">, "name"> & {
	label?: string;
	resizeable?: boolean;
	name: string;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, Props>((props, ref) => {
	const { label, resizeable = true, ...rest } = props;

	const [field, meta] = useField(props.name);

	const isError = (meta.error && meta.touched) as boolean;

	const inputErrorClass = classNames({
		"border-red-500": isError,
		"border-2": isError,
		"resize-none": !resizeable,
	});

	return (
		<div className="relative flex flex-col w-full group">
			<span className="mb-1 ml-1 text-[#4E4E4E] text-sm font-bold text-opacity-80 group-focus-within:text-opacity-100">
				{label}
				{rest.required && <span>*</span>}
			</span>
			<textarea
				{...rest}
				{...field}
				ref={ref}
				className={`disabled:opacity-50 focus:ring-2 ring-semiLight ring-opacity-50 w-full px-2 py-2 text-xl font-normal transition-all shadow-sm  bg-white  border-opacity-80 border-solid rounded-lg outline-none  focus:border-opacity-100 text-dark focus:shadow-md hover:shadow-md ${inputErrorClass}`}
			/>
			{isError && (
				<span className="ml-1 text-sm text-red-600 ">
					{meta!.error}
				</span>
			)}
		</div>
	);
});
export default TextArea;
