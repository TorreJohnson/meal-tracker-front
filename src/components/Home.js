import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import withAuth from "./WithAuth";

class Home extends React.Component {
	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

	mapNutrientCountsInState = () => {
		let beta_carotene = 0;
		this.props.currentUser.food_items.forEach(item => {
			beta_carotene += item.beta_carotene;
		});
		let caffeine = 0;
		this.props.currentUser.food_items.forEach(item => {
			caffeine += item.caffeine;
		});
		let calcium = 0;
		this.props.currentUser.food_items.forEach(item => {
			calcium += item.calcium;
		});
		let carbohydrate = 0;
		this.props.currentUser.food_items.forEach(item => {
			carbohydrate += item.carbohydrate;
		});
		let cholesterol = 0;
		this.props.currentUser.food_items.forEach(item => {
			cholesterol += item.cholesterol;
		});
		let calories = 0;
		this.props.currentUser.food_items.forEach(item => {
			calories += item.calories;
		});
		let fat = 0;
		this.props.currentUser.food_items.forEach(item => {
			fat += item.fat;
		});
		let fiber = 0;
		this.props.currentUser.food_items.forEach(item => {
			fiber += item.fiber;
		});
		let folic_acid = 0;
		this.props.currentUser.food_items.forEach(item => {
			folic_acid += item.folic_acid;
		});
		let iron = 0;
		this.props.currentUser.food_items.forEach(item => {
			iron += item.iron;
		});
		let niacin = 0;
		this.props.currentUser.food_items.forEach(item => {
			niacin += item.niacin;
		});
		let potassium = 0;
		this.props.currentUser.food_items.forEach(item => {
			potassium += item.potassium;
		});
		let protein = 0;
		this.props.currentUser.food_items.forEach(item => {
			protein += item.protein;
		});
		let riboflavin = 0;
		this.props.currentUser.food_items.forEach(item => {
			riboflavin += item.riboflavin;
		});
		let sodium = 0;
		this.props.currentUser.food_items.forEach(item => {
			sodium += item.sodium;
		});
		let sugars = 0;
		this.props.currentUser.food_items.forEach(item => {
			sugars += item.sugars;
		});
		let thiamin = 0;
		this.props.currentUser.food_items.forEach(item => {
			thiamin += item.thiamin;
		});
		let vitamin_a = 0;
		this.props.currentUser.food_items.forEach(item => {
			vitamin_a += item.vitamin_a;
		});
		let vitamin_b12 = 0;
		this.props.currentUser.food_items.forEach(item => {
			vitamin_b12 += item.vitamin_b12;
		});
		let vitamin_c = 0;
		this.props.currentUser.food_items.forEach(item => {
			vitamin_c += item.vitamin_c;
		});
		let vitamin_d = 0;
		this.props.currentUser.food_items.forEach(item => {
			vitamin_d += item.vitamin_d;
		});
		let vitamin_e = 0;
		this.props.currentUser.food_items.forEach(item => {
			vitamin_e += item.vitamin_e;
		});
		let vitamin_k = 0;
		this.props.currentUser.food_items.forEach(item => {
			vitamin_k += item.vitamin_k;
		});
		let zinc = 0;
		this.props.currentUser.food_items.forEach(item => {
			zinc += item.zinc;
		});
		return [
			beta_carotene,
			caffeine,
			calcium,
			carbohydrate,
			cholesterol,
			calories,
			fat,
			fiber,
			folic_acid,
			iron,
			niacin,
			potassium,
			protein,
			riboflavin,
			sodium,
			sugars,
			thiamin,
			vitamin_a,
			vitamin_b12,
			vitamin_c,
			vitamin_d,
			vitamin_e,
			vitamin_k,
			zinc
		];
	};

	data = {
		labels: [
			"Beta Carotene",
			"Caffeine",
			"Calcium",
			"Carbohydrate",
			"Cholesterol",
			"Calories",
			"Fat",
			"Fiber",
			"Folic Acid",
			"Iron",
			"Niacin",
			"Potassium",
			"Protein",
			"Riboflavin",
			"Sodium",
			"Sugars",
			"Thiamin",
			"Vitamin A",
			"Vitamin B-12",
			"Vitamin C",
			"Vitamin D",
			"Vitamin E",
			"Vitamin K",
			"Zinc"
		],
		datasets: [
			{
				label: "",
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "rgba(255,99,132,1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: this.mapNutrientCountsInState()
			}
		]
	};

	render() {
		return (
			<div>
				<h2>Daily Totals</h2>
				<Bar
					data={this.data}
					width={75}
					height={50}
					options={{
						maintainAspectRatio: true
					}}
				/>
			</div>
		);
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(withAuth(Home));
