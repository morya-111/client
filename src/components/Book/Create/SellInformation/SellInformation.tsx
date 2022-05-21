import TextInput from "components/Inputs/TextInput";
import { useFormikContext } from "formik";
import { CreateBookFormType } from "pages/Book/Create/types";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const SellInformation: React.FC<{ disabled: boolean }> = ({ disabled }) => {
	const { values } = useFormikContext<CreateBookFormType>();
	if (!values.sell) return <></>;

	return (
		<div
			style={{ borderTopWidth: "1px" }}
			className="mt-2 border-opacity-50 border-dark"
		>
			<div className="mt-2 text-lg text-dark font-martel">
				Sell Information
			</div>
			<div className="flex ">
				<div>
					<TextInput
						disabled={disabled}
						name="price"
						label="Price"
						required
						type="number"
						left={
							<FaRupeeSign
								size={18}
								className="mb-3 ml-2 text-dark "
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default SellInformation;
