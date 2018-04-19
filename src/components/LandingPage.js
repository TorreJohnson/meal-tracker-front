import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown } from "semantic-ui-react";

class LandingPage extends React.Component {
	render() {
		return (
			<div className="landing">
				<Menu pointing className="fixed-nav-bar">
					<Menu.Item as={Link} to="/">
						<img src="./004-bars-chart.png" alt="meal tracker logo" />
						<strong> MealTracker</strong>
					</Menu.Item>
					<Dropdown item text="Client?">
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to="/login">
								Log In
							</Dropdown.Item>
							<Dropdown.Item as={Link} to="/signup">
								Sign Up
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown item text="Nutritionist?">
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to="/nutritionists/login">
								Log In
							</Dropdown.Item>
							<Dropdown.Item as={Link} to="/nutritionists/signup">
								Sign Up
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</Menu>
			</div>
		);
	}
}

export default LandingPage;
