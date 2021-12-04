import { Field, ErrorMessage, FieldAttributes } from "formik";

type props = FieldAttributes<any> & {
	labelName: string;
	labelFor: string;
	ref: React.MutableRefObject<any>;
};
const FormikFieldWithErrMsg: React.FC<props> = ({
	labelName = "Label Name",
	labelFor,
	...rest
}) => {
	return (
		<>
			<label htmlFor="" className="std-label">
				{labelName}
			</label>
			<Field className="std-input" {...rest} />
			<div className="validation-msg">
				<ErrorMessage name={rest.name} />
			</div>
		</>
	);
};

export default FormikFieldWithErrMsg;
