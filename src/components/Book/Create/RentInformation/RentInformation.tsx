import Select from "components/Inputs/Select";
import TextInput from "components/Inputs/TextInput";
import { useFormikContext } from "formik";
import DURATION_UNIT from "pages/Book/Create/durationUnit";
import { CreateBookFormType } from "pages/Book/Create/types";
import React from "react";
import { FaRupeeSign } from "react-icons/fa";

const RentInformation: React.FC<{ disabled: boolean }> = ({ disabled }) => {
	const { values } = useFormikContext<CreateBookFormType>();
	if (!values.rent) return <></>;

	return (
		<div
			style={{ borderTopWidth: "1px" }}
			className="mt-12 border-opacity-50 border-dark"
		>
			<div className="mt-2 text-lg text-dark font-martel">
				Rent Information
			</div>
			<div className="flex flex-col xl:flex-row">
				<div className="flex-1 xl:mr-2">
					<TextInput
						name="deposit"
						label="Deposit"
						required
						type="number"
						disabled={disabled}
						left={
							<FaRupeeSign
								size={18}
								className="mb-3 ml-2 text-dark "
							/>
						}
					/>
				</div>
				<div className="flex flex-1 xl:ml-2">
					<div className="flex-grow mr-2">
						<TextInput
							name="duration"
							label="Duration"
							required
							disabled={disabled}
							type="number"
						/>
					</div>
					<div className="ml-2 ">
						<Select
							disabled={disabled}
							name="durationUnit"
							label="notUsed"
							labelHidden
						>
							{DURATION_UNIT.map((unit) => (
								<option key={unit} value={unit}>
									{unit}
								</option>
							))}
						</Select>
					</div>
				</div>
			</div>
			<div className="flex mt-4">
				<div>
					<TextInput
						disabled={disabled}
						name="fees"
						label={`Fees Per ${values.durationUnit.slice(0, -1)}`}
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

export default RentInformation;
