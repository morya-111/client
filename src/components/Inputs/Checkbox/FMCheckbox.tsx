import { useField } from "formik";
import React from "react";
import Checkbox from ".";

type Props = Omit<React.ComponentPropsWithoutRef<"input">, "name"> & {
	label?: string;
	name: string;
};

const FMCheckbox = React.forwardRef<HTMLInputElement, Props>((props, ref) => {
	const [field] = useField(props.name);

	// const isError = (meta.error && meta.touched) as boolean;

	return <Checkbox ref={ref} {...props} {...field} checked={field.value} />;
});

export default FMCheckbox;
