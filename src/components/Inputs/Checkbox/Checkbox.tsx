import React from "react";
import { FaCheck } from "react-icons/fa";

type Props = React.ComponentPropsWithoutRef<"input"> & { label?: string };

const Checkbox = React.forwardRef<HTMLInputElement, Props>(
	({ label, ...rest }, ref) => {
		return (
			<label className="relative flex items-center capitalize cursor-pointer">
				<input
					ref={ref}
					{...rest}
					type="checkbox"
					style={{ borderWidth: "3px" }}
					className="flex-shrink-0 w-6 h-6 transition-colors rounded-lg appearance-none cursor-pointer peer border-semiDark checked:bg-semiDark hover:shadow-lg"
				/>
				<FaCheck
					className="absolute hidden transition-all transform left-1 peer-checked:block animate-scale-reveal text-light"
					size={16}
				/>
				{label && (
					<div className="ml-2 font-thin text-dark">{label}</div>
				)}
			</label>
		);
	}
);

export default Checkbox;
