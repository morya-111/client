import Checkbox from "components/Inputs/Checkbox";
import React, { useState } from "react";

const Catalogue: React.FC = () => {
	const [checked, setChecked] = useState(false);

	return (
		<div className="flex w-full h-screen bg-light ">
			<div className="">
				<Checkbox
					checked={checked}
					onChange={(e) => setChecked(!checked)}
					label="For Sale"
				/>
			</div>
			<div></div>
		</div>
	);
};

export default Catalogue;
