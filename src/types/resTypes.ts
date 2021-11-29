export type IsLoggedInFailResType = {
	status: string;
	message: string;
};

export type IsLoggedInResType = {
	status: string;
	data: {
		user: {
			id: number;
			first_name: string;
			last_name: string;
			email: string;
			role: string;
		};
	};
};
