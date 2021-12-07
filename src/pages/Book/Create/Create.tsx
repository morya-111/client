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
import NavigationBar from "components/NavigationBar";
import Footer from "components/Footer";

import React from "react";
import createBookValidation from "./validation";
import { useMutation, useQuery } from "react-query";
import api from "api";
import Loader from "components/Loader";
import GENRES from "components/Catalogue/Sidebar/genres";
import DURATION_UNIT from "./durationUnit";
import { useHistory } from "react-router";

const AddBook = () => {
	const history = useHistory();

	const language = useQuery(
		["languages"],
		() =>
			api.get("/languages", {
				params: { order: "-priority" },
			}),
		{
			select: (data) => data.data.data,
			refetchOnWindowFocus: false,
		}
	);

	const upload = useMutation((data: any) => api.post("/books", data), {
		onSuccess: () => {
			history.push("/myBooks");
		},
	});

	if (language.isLoading) {
		return (
			<div className="flex items-center justify-center w-screen h-screen ite bg-light">
				<div>
					<Loader loading={language.isLoading} />
				</div>
			</div>
		);
	}

	return (
		<>
			<NavigationBar />
			<Formik
				initialValues={{
					name: "",
					author: "",
					publisher: "",
					description: "",
					genre: GENRES[0],
					language: language.data.languages[0].id,
					sell: false,
					rent: false,
					price: "0",
					deposit: "0",
					duration: "0",
					durationUnit: DURATION_UNIT[0],
					fees: "0",
					image: "",
				}}
				onSubmit={(formData) => {
					console.log(formData);
					const {
						name,
						description,
						author,
						image,
						genre,
						language,
						publisher,
						deposit,
						duration,
						durationUnit,
						fees,
						price,
						rent,
						sell,
					} = formData;
					upload.mutate({
						name,
						description,
						author,
						image,
						genre,
						language,
						publisher,
						...(sell && { price }),
						...(rent && { deposit, duration, durationUnit, fees }),
					});
				}}
				validationSchema={createBookValidation}
			>
				<div className="w-full pt-4 bg-light">
					<Form className="flex flex-col min-h-screen mx-14">
						<div className="flex ">
							<div
								style={{ flex: 1 }}
								className="hidden md:block"
							/>
							<div
								style={{ flex: 2 }}
								className="text-4xl font-bold text-center md:text-5xl text-dark"
							>
								Create Book
							</div>
						</div>
						<div className="flex flex-col flex-grow w-full md:flex-row">
							<div
								style={{ flex: 1 }}
								className="flex justify-center mt-2 md:mt-0"
							>
								<ImageDrop />
							</div>

							<div style={{ flex: 2 }}>
								<div className="mt-4 md:mt-0">
									<TextInput
										disabled={upload.isLoading}
										name="name"
										label="Name"
										required
									/>
								</div>
								<div className="flex-grow pt-2">
									<TextArea
										disabled={upload.isLoading}
										name="description"
										label="Description"
										resizeable={false}
									/>
								</div>
								<div className="flex flex-col md:flex-row">
									<div className="flex-grow mt-2 md:mr-2">
										<TextInput
											disabled={upload.isLoading}
											name="author"
											label="Author"
											required
										/>
									</div>
									<div className="flex-grow mt-2 md:ml-2">
										<TextInput
											disabled={upload.isLoading}
											name="publisher"
											label="Publisher"
											required
										/>
									</div>
								</div>
								<div className="flex flex-col md:flex-row">
									<div className="flex-grow mt-2 md:mr-2">
										<Select
											disabled={upload.isLoading}
											name="genre"
											label="Genre"
											required
										>
											{GENRES.map((genre) => (
												<option key={genre}>
													{genre}
												</option>
											))}
										</Select>
									</div>
									<div className="flex-grow mt-2 md:ml-2">
										<Select
											name="language"
											label="Language"
											required
											disabled={upload.isLoading}
										>
											{language.data.languages.map(
												(language: any) => (
													<option
														value={language.id}
														key={language.id}
													>
														{language.name}
													</option>
												)
											)}
										</Select>
									</div>
								</div>
								<div className="flex mt-3 ">
									<span className="mr-4 text-[#4E4E4E] text-sm font-bold opacity-80">
										Mode
									</span>
									<div className="mr-4">
										<FMCheckbox
											disabled={upload.isLoading}
											name="sell"
											label="For Sell"
										/>
									</div>
									<div>
										<FMCheckbox
											disabled={upload.isLoading}
											name="rent"
											label="For Rent"
										/>
									</div>
								</div>
								<SellInformation disabled={upload.isLoading} />
								<RentInformation disabled={upload.isLoading} />
								<div className="flex justify-center mt-4 pb-9">
									<Button
										type="submit"
										value="Create"
										color="semiLight"
										disabled={upload.isLoading}
										left={
											upload.isLoading ? (
												<div className="mr-2">
													<Loader
														size="sm"
														color="light"
													/>
												</div>
											) : (
												<BiBook
													size={25}
													className="mr-2"
												/>
											)
										}
									/>
								</div>
							</div>
						</div>
					</Form>
				</div>
			</Formik>
			<Footer />
		</>
	);
};

export default AddBook;
