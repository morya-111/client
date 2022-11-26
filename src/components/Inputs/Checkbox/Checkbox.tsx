import React from "react";
import { FaCheck } from "react-icons/fa";

type Props = React.ComponentPropsWithoutRef<"input"> & { label?: string };

const Checkbox = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const { label, ...rest } = props;

	return (
		<label className="relative flex items-center capitalize cursor-pointer">
			<input
				ref={ref}
				{...rest}
				type="checkbox"
				style={{ borderWidth: "3px" }}
				className="flex-shrink-0 w-6 h-6 transition-colors border-black rounded-lg appearance-none cursor-pointer peer checked:bg-black hover:shadow-lg"
			/>
			<FaCheck
				className="absolute hidden transition-all transform left-1 peer-checked:block animate-scale-reveal text-light"
				size={16}
			/>
			{label && (
				<div className="ml-2 text-sm font-martel text-dark">
					{label}
				</div>
			)}
		</label>
	);
});

export default Checkbox;
