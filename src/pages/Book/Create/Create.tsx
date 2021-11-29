import ImageDrop from "components/Book/Create/ImageDrop";
import RentInformation from "components/Book/Create/RentInformation";
import SellInformation from "components/Book/Create/SellInformation";
import Button from "components/Buttons/Button";
import { FMCheckbox } from "components/Inputs/Checkbox";
import Select from "components/Inputs/Select";
import TextArea from "components/Inputs/TextArea";
import TextInput from "components/Inputs/TextInput";
import { BiBook } from "react-icons/bi";
import { Formik, Form } from "formik";
import React from "react";

const AddBook = () => {
	return (
		<div className="w-full bg-light">
			<div className="flex flex-col min-h-screen mx-14">
				<div className="flex ">
					<div style={{ flex: 1 }} className="hidden lg:block" />
					<div
						style={{ flex: 2 }}
						className="text-4xl font-bold text-center md:text-5xl text-dark"
					>
						Create Book
					</div>
				</div>
				<div className="flex flex-col flex-grow w-full lg:flex-row">
					<div
						style={{ flex: 1 }}
						className="flex items-center justify-center mt-2 lg:mt-0"
					>
						<ImageDrop />
					</div>
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
							<div className="mt-2 lg:mt-0">
								<TextInput name="name" label="Name" required />
							</div>
							<div className="flex-grow pt-2">
								<TextArea
									name="description"
									label="Description"
									resizeable={false}
								/>
							</div>
							<div className="flex flex-col lg:flex-row">
								<div className="flex-grow mt-2 lg:mr-2">
									<TextInput
										name="author"
										label="Author"
										required
									/>
								</div>
								<div className="flex-grow mt-2 lg:ml-2">
									<TextInput
										name="publisher"
										label="Publisher"
										required
									/>
								</div>
							</div>
							<div className="flex flex-col lg:flex-row">
								<div className="flex-grow mt-2 lg:mr-2">
									<Select name="genre" label="Genre" required>
										<option>a</option>
										<option>b</option>
										<option>Select Option</option>
									</Select>
								</div>
								<div className="flex-grow mt-2 lg:ml-2">
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
							<div className="flex justify-center mt-4">
								<Button
									value="Create"
									color="semiLight"
									left={<BiBook size={25} className="mr-2" />}
								/>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default AddBook;
