import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class GroupTwoBarGraph extends React.Component {
	filterFoodItems = () => {
		let items;
		if (this.props.filter === "Daily" && this.props.currentUser.food_items) {
			items = this.props.currentUser.food_items.filter(
				item =>
					Date.now() - Date.parse(item.date.split("T")[0]) < 1000 * 60 * 60 * 24
			);
		} else if (
			this.props.filter === "Weekly" &&
			this.props.currentUser.food_items
		) {
			items = this.props.currentUser.food_items.filter(
				item =>
					Date.now() - Date.parse(item.date.split("T")[0]) <
					1000 * 60 * 60 * 24 * 7
			);
		} else if (
			this.props.filter === "Monthly" &&
			this.props.currentUser.food_items
		) {
			items = this.props.currentUser.food_items.filter(
				item =>
					Date.now() - Date.parse(item.date.split("T")[0]) <
					1000 * 60 * 60 * 24 * 30
			);
		}
		return this.mapNutrientCountsInState(items);
	};

	mapNutrientCountsInState(items) {
		let beta_carotene = 0;
		let fiber = 0;
		let iron = 0;
		let riboflavin = 0;
		let thiamin = 0;
		let vitamin_b12 = 0;
		let vitamin_e = 0;
		let zinc = 0;
		items.forEach(item => {
			beta_carotene += item.beta_carotene / 1000;
			fiber += item.fiber;
			iron += item.iron;
			riboflavin += item.riboflavin;
			thiamin += item.thiamin;
			vitamin_b12 += item.vitamin_b12;
			vitamin_e += item.vitamin_e;
			zinc += item.zinc;
		});
		return [
			beta_carotene,
			fiber,
			iron,
			riboflavin,
			thiamin,
			vitamin_b12,
			vitamin_e,
			zinc
		];
	}

	data = () => {
		return {
			labels: [
				"Beta Carotene",
				"Fiber",
				"Iron",
				"Riboflavin",
				"Thiamin",
				"Vitamin B-12",
				"Vitamin E",
				"Zinc"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(31,177,61,0.2)",
					borderColor: "rgba(31,177,61,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(31,177,61,0.2)",
					hoverBorderColor: "rgba(31,177,61,1)",
					data: this.filterFoodItems(this.props.filter)
				}
			]
		};
	};

	data2 = () => {
		let adjustedData = [15, 38, 21, 2, 2, 3, 15, 40];
		if (this.props.filter === "Weekly") {
			adjustedData = adjustedData.map(num => num * 7);
		} else if (this.props.filter === "Monthly") {
			adjustedData = adjustedData.map(num => num * 30);
		}

		return {
			labels: [
				"Beta Carotene",
				"Fiber",
				"Iron",
				"Riboflavin",
				"Thiamin",
				"Vitamin B-12",
				"Vitamin E",
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
})(GroupTwoBarGraph);
