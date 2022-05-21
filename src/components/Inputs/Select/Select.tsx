import React from "react";
import classNames from "classnames";
import { MdArrowDropDown } from "react-icons/md";
import { useField } from "formik";
import "./Select.css";

type Props = Omit<React.ComponentPropsWithoutRef<"select">, "name"> & {
	label?: string;
	name: string;
	labelHidden?: boolean;
};

const Select = React.forwardRef<HTMLSelectElement, Props>((props, ref) => {
	const { label, labelHidden = false, children, ...rest } = props;

	const [field, meta] = useField(props.name);

	const isError = (meta.error && meta.touched) as boolean;

	// const { isError, field, meta } = useFieldConditionally(props.name);

	const inputErrorClass = classNames({
		"border-red-500": isError,
		"border-2": isError,
	});

	return (
		<div className="relative flex flex-col w-full group">
			<span
				className={classNames(
					"mb-1 ml-1 text-[#4E4E4E] text-sm font-bold text-opacity-80 group-focus-within:text-opacity-100",
					{ "opacity-0 mb-0": labelHidden }
				)}
			>
				{label}
				{rest.required && label && <span>*</span>}
			</span>
			<div className="relative">
				<select
					{...rest}
					{...field}
					ref={ref}
					className={`pr-7 appearance-none capitalize disabled:opacity-50 w-full focus:ring-0 ring-semiLight ring-opacity-50 px-2 py-2 text-lg sm:text-sm font-normal transition-all shadow-sm  bg-white  border-opacity-80 border-solid outline-none  focus:border-opacity-100 focus:shadow-md hover:shadow-md text-dark focus:border-b-2  border-dark font-martel ${inputErrorClass}`}
				>
					{children}
				</select>
				<MdArrowDropDown
					size={30}
					className="absolute top-0 block h-full transition-transform pointer-events-none right-1 text-dark group-focus-within:rotate-180"
				/>
			</div>

			{isError && (
				<span className="ml-1 text-sm text-red-600 ">
					{meta!.error}
				</span>
			)}
		</div>
	);
});

export default Select;
