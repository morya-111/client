import Select from "components/Inputs/Select";
import TextInput from "components/Inputs/TextInput";
import { useFormikContext } from "formik";
import { CreateBookFormType } from "pages/Book/Create/types";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const RentInformation: React.FC = () => {
	const { values } = useFormikContext<CreateBookFormType>();
	if (!values.rent) return <></>;

	return (
		<div
			style={{ borderTopWidth: "1px" }}
			className="mt-2 border-opacity-50 border-dark"
		>
			<div className="mt-2 text-lg text-dark">Rent Information</div>
			<div className="flex flex-col xl:flex-row">
				<div className="flex-1 xl:mr-2">
					<TextInput
						name="rentDeposit"
						label="Deposit"
						required
						type="number"
						left={
							<FaRupeeSign
								size={20}
								className="mb-3 ml-2 text-dark "
							/>
						}
					/>
				</div>
				<div className="flex flex-1 xl:ml-2">
					<div className="flex-grow mr-2">
						<TextInput
							name="rentDuration"
							label="Duration"
							required
							type="number"
						/>
					</div>
					<div className="ml-2">
						<Select
							name="rentDurationUnit"
							label="notUsed"
							labelHidden
						>
							<option>Days</option>
							<option>Months</option>
							<option>Years</option>
						</Select>
					</div>
				</div>
			</div>
			<div className="flex mt-2">
				<div>
					<TextInput
						name="rentFees"
						label={`Price Per ${values.rentDurationUnit}`}
						required
						type="number"
						left={
							<FaRupeeSign
								size={20}
								className="mb-3 ml-2 text-dark "
							/>
						}
					/>
				</div>
			</div>
		</div>
	);
};

export default RentInformation;
