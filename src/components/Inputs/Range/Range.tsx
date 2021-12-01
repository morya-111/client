import React, { useRef, useState } from "react";

interface Props {
	minVal: number;
	maxVal: number;
	setVal: any;
	val: number;
}

const Range: React.FC<Props> = ({ maxVal, minVal, setVal, val }) => {
	const rootRef = useRef<HTMLDivElement | null>(null);
	const cursorRef = useRef<HTMLSpanElement | null>(null);
	const [move, setMove] = useState(false);

	const onMouseDown = (e: React.MouseEvent) => {
		setMove(true);
	};

	const onMouseUp = (e: React.MouseEvent) => {
		setMove(false);
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!move || !rootRef.current || !cursorRef.current) return;

		const rootX = rootRef.current.getBoundingClientRect().x;
		const rootW = rootRef.current.getBoundingClientRect().width;

		const mouseX = e.clientX;

		const percent = (rootX - mouseX) / rootW;
		console.log(percent);

		// setVal(minVal + (maxVal - minVal) * percent);
	};

	const valToPercent = ((val - minVal) / (maxVal - minVal)) * 100;

	return (
		<div
			ref={rootRef}
			className="w-full px-6"
			onMouseUp={onMouseUp}
			onMouseMove={onMouseMove}
		>
			<div className="relative w-full h-2 bg-gray-300 rounded-full">
				<span
					ref={cursorRef}
					onMouseDown={onMouseDown}
					className="absolute top-0 z-10 w-4 h-4 -mt-1 -ml-2 bg-white rounded-full shadow cursor-pointer "
					style={{ left: `${valToPercent}%` }}
				></span>
				<span
					className="absolute top-0 left-0 h-2 bg-green-500 rounded-full"
					style={{ width: `${valToPercent}%` }}
				></span>
			</div>
			<div className="flex justify-between mt-2 text-xs text-gray-600"></div>
		</div>
	);
};

export default Range;
