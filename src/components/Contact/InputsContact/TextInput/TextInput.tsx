import React from "react";
import { ErrorMessage, Field, useField } from "formik";

// type InputTypes =  Omit<React.ComponentPropsWithoutRef<"input">, "name"> & {
// 	label?: string;
// 	name: string;
// };

// const TextInput = React.forwardRef<HTMLInputElement,InputTypes>({ props, ref }) => {
// 	const{label, ...rest} = props;
// 	const [field, meta] = useField(props.name);
// 	return (
// 		<div>
// 			<label htmlFor={field.name}>{label}</label>
// 			<input {...field} {...props} autoComplete="off" />
// 			<ErrorMessage component="div" name={field.name} className="error" />
// 		</div>
// 	);
// };
const TextInput = () => {
	return <div>This is Text Input</div>;
};

export default TextInput;
