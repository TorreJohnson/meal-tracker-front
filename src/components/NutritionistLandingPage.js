import React from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";

class NutritionistLandingPage extends React.Component {
	render() {
		return (
			<div>
				<Button as={Link} to="/nutritionists/signup">
					New?
				</Button>
				<Button as={Link} to="/nutritionists/login">
					Returning?
				</Button>
			</div>
		);
	}
}

export default NutritionistLandingPage;
