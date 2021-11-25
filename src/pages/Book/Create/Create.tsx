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
						className="text-5xl font-bold text-center"
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
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};

export default AddBook;
