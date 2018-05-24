import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class GroupThreeBarGraph extends React.Component {
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
		let calcium = 0;
		let carbohydrate = 0;
		let cholesterol = 0;
		let potassium = 0;
		let sodium = 0;
		let vitamin_a = 0;
		let vitamin_k = 0;
		items.forEach(item => {
			calcium += item.calcium;
			carbohydrate += item.carbohydrate;
			cholesterol += item.cholesterol;
			potassium += item.potassium;
			sodium += item.sodium;
			vitamin_a += item.vitamin_a;
			vitamin_k += item.vitamin_k;
		});
		return [
			calcium,
			carbohydrate,
			cholesterol,
			potassium,
			sodium,
			vitamin_a,
			vitamin_k
		];
	}

	data = () => {
		return {
			labels: [
				"Calcium",
				"Carbohydrates",
				"Cholesterol",
				"Potassium",
				"Sodium",
				"Vitamin A",
				"Vitamin K"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(31,177,61,0.2)",
					borderColor: "rgba(31,177,61,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.filterFoodItems()
				}
			]
		};
	};

	data2 = () => {
		let adjustedData = [2000, 500, 300, 5000, 2300, 900, 200];
		if (this.props.filter === "Weekly") {
			adjustedData = adjustedData.map(num => num * 7);
		} else if (this.props.filter === "Monthly") {
			adjustedData = adjustedData.map(num => num * 30);
		}
		return {
			labels: [
				"Calcium",
				"Carbohydrates",
				"Cholesterol",
				"Potassium",
				"Sodium",
				"Vitamin A",
				"Vitamin K"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.filterFoodItems()
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
})(GroupThreeBarGraph);
