import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class LandingPage extends React.Component {
	render() {
		return (
			<div>
				<Button as={Link} to="/signup">
					Sign Up
				</Button>
				<Button as={Link} to="/login">
					Log In
				</Button>
				<Button as={Link} to="/nutritionists">
					Nutritionist?
				</Button>
			</div>
		);
	}
}

export default LandingPage;
