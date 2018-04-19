import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class GroupOnePercentageOfRecValues extends React.Component {
	filterFoodItems = () => {
		let items;
		if (this.props.filter === "Daily" && this.props.currentUser.food_items) {
			items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 86400000
			);
		} else if (
			this.props.filter === "Weekly" &&
			this.props.currentUser.food_items
		) {
			items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 604800000
			);
		} else if (
			this.props.filter === "Monthly" &&
			this.props.currentUser.food_items
		) {
			items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 2592000000
			);
		}
		let mappedValues = this.mapNutrientCountsInState(items);
		let maxValues = this.maximumRecValues();
		return mappedValues.map((nutrient, index) =>
			Math.floor((nutrient - maxValues[index]) / maxValues[index] * 100)
		);
	};

	maximumRecValues = () => {
		let mrv = [15, 400, 2000, 400, 300, 78, 30, 0.8, 20, 35, 4.7];
		if (this.props.filter === "Weekly") {
			return mrv.map(value => value * 7);
		} else if (this.props.filter === "Monthly") {
			return mrv.map(value => value * 30);
		} else {
			return mrv;
		}
	};

	mapNutrientCountsInState(items) {
		let beta_carotene = 0;
		let caffeine = 0;
		let calcium = 0;
		let carbohydrate = 0;
		let cholesterol = 0;
		let fat = 0;
		let fiber = 0;
		let folic_acid = 0;
		let iron = 0;
		let niacin = 0;
		let potassium = 0;
		items.forEach(item => {
			beta_carotene += item.beta_carotene / 1000;
			caffeine += item.caffeine;
			calcium += item.calcium;
			carbohydrate += item.carbohydrate;
			cholesterol += item.cholesterol;
			fat += item.fat;
			fiber += item.fiber;
			folic_acid += item.folic_acid / 1000;
			iron += item.iron;
			niacin += item.niacin;
			potassium += item.potassium / 1000;
		});
		return [
			beta_carotene,
			caffeine,
			calcium,
			carbohydrate,
			cholesterol,
			fat,
			fiber,
			folic_acid,
			iron,
			niacin,
			potassium
		];
	}

	data = () => {
		return {
			labels: [
				"Beta Carotene",
				"Caffeine",
				"Calcium",
				"Carbohydrates",
				"Cholesterol",
				"Fat",
				"Fiber",
				"Iron",
				"Folic Acid",
				"Niacin",
				"Potassium"
			],
			datasets: [
				{
					label: "% of Maximum Recommended Amount",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.filterFoodItems()
				}
			]
		};
	};

	render() {
		return (
			<div>
				<Bar
					data={this.data}
					width={100}
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
	return { currentUser: state.currentUser };
})(GroupOnePercentageOfRecValues);
