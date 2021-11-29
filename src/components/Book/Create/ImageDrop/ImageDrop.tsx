import classNames from "classnames";
import Button from "components/Buttons/Button";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { MdUpload } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import "./ImageDrop.css";

const ImageDrop = () => {
	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
		console.log(acceptedFiles);
	}, []);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragAccept,
		isDragReject,
		open,
	} = useDropzone({
		onDrop,
		maxFiles: 1,
		accept: "image/jpeg, image/png",
	});

	const dropZoneStyle = classNames(
		"dropzone",
		{ "dropzone-active": isDragActive },
		{ "dropzone-accept": isDragAccept },
		{ "dropzone-reject": isDragReject }
	);

	const dropZoneTextStyle = classNames(
		"dropzone-text",
		{ "dropzone-text-accept": isDragAccept },
		{ "dropzone-text-reject": isDragReject }
	);

	return (
		<div className="flex flex-col w-2/3 h-2/3">
			<div className={dropZoneStyle} {...getRootProps({})}>
				<input {...getInputProps()} />
				<div className={dropZoneTextStyle}>
					<div>
						<FiUpload size={50} />
					</div>
					<div className="text-center">
						Drag N Drop Image Here To Upload
					</div>
				</div>
			</div>
			<div className="flex justify-center mt-3">
				<Button
					value="Upload"
					color="semiLight"
					left={<MdUpload size={25} className="mr-2" />}
					onClick={open}
				/>
			</div>
		</div>
	);
};

export default ImageDrop;
