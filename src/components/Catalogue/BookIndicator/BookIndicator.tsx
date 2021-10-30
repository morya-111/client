import React from "react";
import { FaHandHoldingUsd, FaShoppingCart } from "react-icons/fa";

interface Props {
	borrow?: boolean;
	sell?: boolean;
}

const BookIndicator: React.FC<Props> = ({ borrow = true, sell = true }) => {
	return (
		<div className="flex">
			{borrow && <FaHandHoldingUsd className="text-dark " size={20} />}
			{sell && <FaShoppingCart className="ml-2 text-dark" size={20} />}
		</div>
	);
};

export default BookIndicator;
