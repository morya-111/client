import classNames from "classnames";
import Button from "components/Buttons/Button";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdUpload } from "react-icons/md";
import { FiUpload } from "react-icons/fi";
import "./ImageDrop.css";
import ImageCropModal from "../ImageCropModal";
import { useMutation } from "react-query";
import api from "api";
import Loader from "components/Loader";

interface Props {
	setImageId: React.Dispatch<React.SetStateAction<number | null>>;
}

const ImageDrop: React.FC<Props> = ({ setImageId }) => {
	const [file, setFile] = useState<string | null>(null);
	const [isImageCropOpen, setIsImageCropOpen] = useState(false);
	const [preview, setPreview] = useState<HTMLCanvasElement | null>(null);

	const { mutate, status: uploadStatus } = useMutation(
		(imageData: FormData) => {
			return api.post("/images/newImage", imageData);
		},
		{
			onSuccess: (data) => {
				setImageId(data.data.data.newImage.id);
			},
		}
	);

	useEffect(() => {
		preview?.toBlob((blob) => {
			if (!blob) return;
			const formData = new FormData();
			formData.append("mainImage", blob);
			mutate(formData);
		});
	}, [preview]);

	const onDrop = useCallback((acceptedFiles) => {
		const reader = new FileReader();
		reader.readAsDataURL(acceptedFiles[0]);
		reader.addEventListener("load", () => {
			setFile(reader.result as string);
			setIsImageCropOpen(true);
		});
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
			{preview !== null ? (
				<div className="relative w-full ">
					{uploadStatus === "loading" && (
						<div className="absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50">
							<div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
								<Loader
									loading={uploadStatus === "loading"}
									color="semiLight"
									size="md"
									thickness="lg"
								/>
							</div>
						</div>
					)}
					<img src={preview.toDataURL("image/jpeg")} />
				</div>
			) : (
				<>
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
				</>
			)}
			{file !== null && (
				<ImageCropModal
					isOpen={isImageCropOpen}
					onClose={() => setIsImageCropOpen(false)}
					file={file}
					setPreview={setPreview}
					// disableDismiss
				/>
			)}
		</div>
	);
};

export default ImageDrop;
