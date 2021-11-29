import RentInformation from "components/Book/Create/RentInformation";
import SellInformation from "components/Book/Create/SellInformation";
import { FMCheckbox } from "components/Inputs/Checkbox";
import Select from "components/Inputs/Select";
import TextArea from "components/Inputs/TextArea";
import TextInput from "components/Inputs/TextInput";
import { Formik, Form } from "formik";
import React from "react";

const AddBook = () => {
	return (
		<div className="w-full min-h-screen bg-light">
			<div className="mx-14">
				<div className="flex ">
					<div style={{ flex: 1 }} className="hidden md:block" />
					<div
						style={{ flex: 2 }}
						className="text-5xl font-bold text-center text-dark"
					>
						Create Book
					</div>
				</div>
				<div className="flex w-full">
					<div style={{ flex: 1 }}>{/* Image Input */}</div>
					<Formik
						initialValues={{
							name: "",
							author: "",
							publisher: "",
							description: "",
							genre: "b",
							language: "a",
							sell: true,
							rent: true,
							sellPrice: "0",
							rentDeposit: "0",
							rentDuration: "0",
							rentDurationUnit: "",
							rentFees: "0",
						}}
						onSubmit={() => {}}
					>
						<Form style={{ flex: 2 }}>
							<TextInput name="name" label="Name" required />
							<div className="flex-grow pt-2">
								<TextArea
									name="description"
									label="Description"
									resizeable={false}
								/>
							</div>
							<div className="flex ">
								<div className="flex-grow mt-2 mr-2">
									<TextInput
										name="author"
										label="Author"
										required
									/>
								</div>
								<div className="flex-grow mt-2 ml-2">
									<TextInput
										name="publisher"
										label="Publisher"
										required
									/>
								</div>
							</div>
							<div className="flex ">
								<div className="flex-grow mt-2 mr-2">
									<Select name="genre" label="Genre" required>
										<option>a</option>
										<option>b</option>
										<option>Select Option</option>
									</Select>
								</div>
								<div className="flex-grow mt-2 ml-2">
									<Select
										name="language"
										label="Language"
										required
									>
										<option>a</option>
										<option>b</option>
										<option>Select Option</option>
									</Select>
								</div>
							</div>
							<div className="flex mt-3 ">
								<span className="mr-4 text-[#4E4E4E] text-sm font-bold opacity-80">
									Mode
								</span>
								<div className="mr-4">
									<FMCheckbox name="sell" label="For Sell" />
								</div>
								<div>
									<FMCheckbox name="rent" label="For Rent" />
								</div>
							</div>
							<SellInformation />
							<RentInformation />
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default AddBook;
