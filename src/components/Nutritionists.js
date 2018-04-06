import React from "react";
import { NutritionistCard } from "./NutritionistCard";
import cuid from "cuid";

export default class Nutritionists extends React.Component {
	state = {
		nutritionists: []
	};

	componentDidMount() {
		this.fetchNutritionists();
	}

	fetchNutritionists = () => {
		fetch("http://localhost:3000/api/v1/nutritionists")
			.then(res => res.json())
			.then(json => {
				console.log(json);
				this.setState({
					nutritionists: json.data
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
