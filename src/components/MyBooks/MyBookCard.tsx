import React from "react";

const MyBookCard = () => {
	return (
		<div className="p-5 bg-white rounded-lg shadow cursor-pointer hover:shadow-xl">
			<div className="flex flex-row">
				<div className="shadow">
					<img src="https://via.placeholder.com/128x173" />
				</div>
				<div className="flex flex-col w-full pr-3 ml-5">
					<div className="relative">
						<h1 className="inline-block text-2xl font-bold text-dark">
							Book Title
						</h1>
						<h2 className="absolute right-0 inline-block px-2 text-sm leading-relaxed capitalize rounded-full bg-semiLight text-light ">
							Genre
						</h2>
					</div>
					<div className="text-base text-dark">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.
						Itaque illo quod voluptas alias eos dolorem enim error
						harum odio exercitationem! Voluptates, iusto eligendi
						tenetur quod fugiat explicabo sit sunt hic.
					</div>
					<div className="flex border-t border-gray-400">
						<span className="text-gray-500">For Sell</span>
						<span className="ml-auto capitalize text-dark">
							Amount
						</span>
					</div>
					<div className="flex border-t border-gray-400">
						<span className="text-gray-500">For Rent</span>
						<span className="ml-auto capitalize text-dark">
							Amount
						</span>
					</div>
					<div className="flex border-t border-b border-gray-400">
						<span className="text-gray-500">Deposit</span>
						<span className="ml-auto capitalize text-dark">
							Amount
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};
export default MyBookCard;
