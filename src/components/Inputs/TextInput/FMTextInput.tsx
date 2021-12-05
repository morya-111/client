import { useField } from "formik";
import React from "react";
import TextInput from "./TextInput";

type Props = Omit<React.ComponentPropsWithoutRef<typeof TextInput>, "name"> & {
	name: string;
};

const FMTextInput: React.FC<Props> = (props) => {
	const [field, meta] = useField(props.name);

	return <div></div>;
};

export default FMTextInput;
