import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class MilligramGraph extends React.Component {
	filterFoodItems = filter => {
		if (filter === "Daily" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 86400000
			);
			return this.mapNutrientCountsInState(items);
		} else if (filter === "Weekly" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 604800000
			);
			return this.mapNutrientCountsInState(items);
		} else if (filter === "Monthly" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 2592000000
			);
			return this.mapNutrientCountsInState(items);
		}
	};

	mapNutrientCountsInState(items) {
		let beta_carotene = 0;
		let caffeine = 0;
		let cholesterol = 0;
		let folic_acid = 0;
		let iron = 0;
		let niacin = 0;
		let riboflavin = 0;
		let thiamin = 0;
		let vitamin_a = 0;
		let vitamin_b12 = 0;
		let vitamin_d = 0;
		let vitamin_e = 0;
		let vitamin_k = 0;
		let zinc = 0;
		items.forEach(item => {
			beta_carotene += item.beta_carotene;
			caffeine += item.caffeine;
			cholesterol += item.cholesterol;
			folic_acid += item.folic_acid;
			iron += item.iron;
			niacin += item.niacin;
			riboflavin += item.riboflavin;
			thiamin += item.thiamin;
			vitamin_a += item.vitamin_a;
			vitamin_b12 += item.vitamin_b12;
			vitamin_d += item.vitamin_d;
			vitamin_e += item.vitamin_e;
			vitamin_k += item.vitamin_k;
			zinc += item.zinc;
		});
		return [
			beta_carotene,
			caffeine,
			cholesterol,
			folic_acid,
			iron,
			niacin,
			riboflavin,
			thiamin,
			vitamin_a,
			vitamin_b12,
			vitamin_d,
			vitamin_e,
			vitamin_k,
			zinc
		];
	}

	data = () => {
		return {
			labels: [
				"Beta Carotene",
				"Caffeine",
				"Cholesterol",
				"Folic Acid",
				"Iron",
				"Niacin",
				"Riboflavin",
				"Thiamin",
				"Vitamin A",
				"Vitamin B-12",
				"Vitamin D",
				"Vitamin E",
				"Vitamin K",
				"Zinc"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.filterFoodItems(this.props.filter)
				}
			]
		};
	};

	data2 = () => {
		let adjustedData = [15, 400, 300, 0.4, 20, 35, 1, 2, 1, 1, 1, 20, 1, 15];
		if (this.props.filter === "Weekly") {
			adjustedData = [15, 400, 300, 0.4, 20, 35, 1, 2, 1, 1, 1, 20, 1, 15].map(
				num => num * 7
			);
		} else if (this.props.filter === "Monthly") {
			adjustedData = [15, 400, 300, 0.4, 20, 35, 1, 2, 1, 1, 1, 20, 1, 15].map(
				num => num * 30
			);
		}

		return {
			labels: [
				"Beta Carotene",
				"Caffeine",
				"Cholesterol",
				"Folic Acid",
				"Iron",
				"Niacin",
				"Riboflavin",
				"Thiamin",
				"Vitamin A",
				"Vitamin B-12",
				"Vitamin D",
				"Vitamin E",
				"Vitamin K",
				"Zinc"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.filterFoodItems(this.props.filter)
				},
				{
					label: "Maximum Recommended Amount",
					backgroundColor: "rgba(54,162,235,0.2)",
					borderColor: "rgba(54,162,235,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(54,162,235,0.4)",
					hoverBorderColor: "rgba(54,162,235,1)",
					data: adjustedData
				}
			]
		};
	};

	render() {
		return (
			<div>
				<h2>{this.props.filter} Totals (Milligrams)</h2>
				<Bar
					data={this.props.recValues ? this.data2() : this.data()}
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
})(MilligramGraph);
