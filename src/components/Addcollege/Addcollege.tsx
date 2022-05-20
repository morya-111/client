import React from "react";
import NavigationBar from "components/NavigationBar/NavigationBar";
import Footer from "components/Footer";
import { NavLink, Link } from "react-router-dom";
import "./Addcollege.css";

const AddCollege = () => {
	return (
		<>
			<NavigationBar />
			<div className="pattern-one"></div>
			<div className="pattern-two"></div>
			<div className="pattern-three"></div>
			<div className="addcollege-container">
				<div>
					<p className="addcollege-heading">
						Finding people with book interests same as you around
						you is difficult right?
					</p>
				</div>
				<div className="addcollege-form_container">
					<p className="addcollege-form_heading">
						Not anymore... <br></br>Add your college name below and
						we will solve that problem for you!!!
					</p>
					<select
						className="addcollege-form_select"
						name="college"
						id="college"
					>
						<option className="form-select_value" value="college">
							Please Select
						</option>
						<option value="K.K.Wagh Institute of Engineering Education and Research">
							K.K.Wagh Institute of Engineering Education and
							Research
						</option>
						<option value="Nashik District Maratha Vidya Prasarak Samaj's Karmaveer Adv. Baburao Thakare College of Engineering">
							Nashik District Maratha Vidya Prasarak Samaj's
							Karmaveer Adv. Baburao Thakare College of
							Engineering
						</option>
						<option value="Sandip Institute of Engineering & Management">
							Sandip Institute of Engineering & Management
						</option>
						<option value="R. H. Sapat College of Engineering, Management Studies & Research">
							R. H. Sapat College of Engineering, Management
							Studies & Research
						</option>
						<option value="Guru Gobind Singh College of Engineering And Research Centre, Nashik">
							Guru Gobind Singh College of Engineering And
							Research Centre, Nashik
						</option>
					</select>
					<div className="skip-btn">skip</div>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default AddCollege;
