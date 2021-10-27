import React from "react";
import Checkbox from "components/Inputs/Checkbox";

import "./Sidebar.css";

const Sidebar: React.FC = () => {
	return (
		<div className="flex flex-col">
			<div className="sidebar-element">
				<Checkbox label="For Sale" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="For Rent" />
			</div>
			<span className="title">Language</span>
			<div className="sidebar-element">
				<Checkbox label="English" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Hindi" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Marathi" />
			</div>
			<span className="title">Genre</span>
			<div className="sidebar-element">
				<Checkbox label="Fiction" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Narrative" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Mystery" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Thriller" />
			</div>
			<div className="sidebar-element">
				<Checkbox label="Horror" />
			</div>
		</div>
	);
};

export default Sidebar;
