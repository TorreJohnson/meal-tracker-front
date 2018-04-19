import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class GroupTwoPercentageOfRecValues extends React.Component {
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
		let mrv = [60, 2, 2.3, 38, 2, 1, 3, 2, 1, 20, 1, 40];
		if (this.props.filter === "Weekly") {
			return mrv.map(value => value * 7);
		} else if (this.props.filter === "Monthly") {
			return mrv.map(value => value * 30);
		} else {
			return mrv;
		}
	};

	mapNutrientCountsInState(items) {
		let protein = 0;
		let riboflavin = 0;
		let sodium = 0;
		let sugars = 0;
		let thiamin = 0;
		let vitamin_a = 0;
		let vitamin_b12 = 0;
		let vitamin_c = 0;
		let vitamin_d = 0;
		let vitamin_e = 0;
		let vitamin_k = 0;
		let zinc = 0;
		items.forEach(item => {
			protein += item.protein;
			riboflavin += item.riboflavin;
			sodium += item.sodium / 1000;
			sugars += item.sugars;
			thiamin += item.thiamin;
			vitamin_a += item.vitamin_a / 10000;
			vitamin_b12 += item.vitamin_b12;
			vitamin_c += item.vitamin_c / 1000;
			vitamin_d += item.vitamin_d / 1000;
			vitamin_e += item.vitamin_e;
			vitamin_k += item.vitamin_k / 1000;
			zinc += item.zinc;
		});
		return [
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
	}

	data = () => {
		return {
			labels: [
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
})(GroupTwoPercentageOfRecValues);
