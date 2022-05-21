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
			<label htmlFor="" className="std-label font-martel">
				{labelName}
			</label>
			<Field className=" std-input font-martel" {...rest} />
			<div className="text-right validation-msg font-martel">
				<ErrorMessage name={rest.name} />
			</div>
		</>
	);
};

export default FormikFieldWithErrMsg;
