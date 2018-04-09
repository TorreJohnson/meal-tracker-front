import React from "react";
import { NutritionistCard } from "./NutritionistCard";
import { connect } from "react-redux";
import withAuth from "./WithAuth";
import cuid from "cuid";

class Nutritionists extends React.Component {
	state = {
		nutritionists: []
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
		this.fetchNutritionists();
	}

	fetchNutritionists = () => {
		fetch("http://localhost:3000/api/v1/nutritionists")
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.setState({
					nutritionists: json
				});
			});
	};

	createNutritionistCards = () => {
		return this.state.nutritionists.map(nutritionist => (
			<NutritionistCard nutritionist={nutritionist} key={cuid()} />
		));
	};
	render() {
		return <div>{this.createNutritionistCards()}</div>;
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(withAuth(Nutritionists));
