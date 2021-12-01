import React, { useCallback, useState } from "react";
import Modal from "components/Modal";
import Cropper from "react-easy-crop";
import getCroppedImg from "utils/getCroppedImg";
import Button from "components/Buttons/Button";
import { IoCropOutline } from "react-icons/io5";
import { TiCancel } from "react-icons/ti";

type Props = React.ComponentPropsWithoutRef<typeof Modal> & {
	file: string;
	setPreview: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
};

const ImageCropModal: React.FC<Props> = (props) => {
	const { file, setPreview, ...rest } = props;

	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedArea, setCroppedArea] = React.useState(null);

	const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
		setCroppedArea(croppedAreaPixels);
	}, []);

	const onCropClosed = async () => {
		const croppedImage = await getCroppedImg(file, croppedArea);
		setPreview(croppedImage);
		props.onClose();
	};

	return (
		<Modal
			{...rest}
			isOpen={props.isOpen && file !== null}
			onClose={onCropClosed}
			disableDismiss
		>
			<div className="relative top-0 left-0 right-0 m-4 h-60 md:h-80 bg-light">
				<Cropper
					image={file}
					crop={crop}
					zoom={zoom}
					aspect={3 / 4}
					onCropChange={setCrop}
					onCropComplete={onCropComplete}
					onZoomChange={setZoom}
					minZoom={1}
					maxZoom={4}
				/>
			</div>
			<div className="flex flex-col items-center justify-center pb-3 md:flex-row">
				{/* <Range minVal={1} maxVal={4} val={zoom} setVal={setZoom} /> 
				TODO: Range based zooming skipping for now */}
				<div className="mb-2 md:mb-0 md:mr-2">
					<Button
						value="Crop"
						color="semiLight"
						left={<IoCropOutline size={30} className="mr-2" />}
						onClick={onCropClosed}
					/>
				</div>
				<div className="mt-2 md:mt-0 md:ml-2">
					<Button
						value="Cancel"
						color="error"
						left={<TiCancel size={30} className="mr-2" />}
						onClick={props.onClose}
					/>
				</div>
			</div>
		</Modal>
	);
};

export default ImageCropModal;
