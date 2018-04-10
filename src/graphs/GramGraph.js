import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import withAuth from "../components/WithAuth";

class GramGraph extends React.Component {
	filterFoodItems = filter => {
		if (filter === "Daily") {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 86400000
			);
			return this.mapNutrientCountsInState(items);
		} else if (filter === "Weekly") {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 604800000
			);
			return this.mapNutrientCountsInState(items);
		} else if (filter === "Monthly") {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 2592000000
			);
			return this.mapNutrientCountsInState(items);
		}
	};

	mapNutrientCountsInState(items) {
		let calcium = 0;
		items.forEach(item => {
			calcium += item.calcium;
		});
		let carbohydrate = 0;
		items.forEach(item => {
			carbohydrate += item.carbohydrate;
		});
		let fat = 0;
		items.forEach(item => {
			fat += item.fat;
		});
		let fiber = 0;
		items.forEach(item => {
			fiber += item.fiber;
		});
		let potassium = 0;
		items.forEach(item => {
			potassium += item.potassium;
		});
		let protein = 0;
		items.forEach(item => {
			protein += item.protein;
		});
		let sodium = 0;
		items.forEach(item => {
			sodium += item.sodium;
		});
		let sugars = 0;
		items.forEach(item => {
			sugars += item.sugars;
		});
		let vitamin_c = 0;
		items.forEach(item => {
			vitamin_c += item.vitamin_c;
		});
		return [
			carbohydrate,
			calcium,
			fat,
			fiber,
			potassium,
			protein,
			sodium,
			sugars,
			vitamin_c
		];
	}

	data = () => {
		return {
			labels: [
				"Calcium",
				"Carbohydrate",
				"Fat",
				"Fiber",
				"Potassium",
				"Protein",
				"Sodium",
				"Sugars",
				"Vitamin C"
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
		let adjustedData = [1, 325, 78, 30, 4.7, 60, 2.3, 25, 2];
		if (this.props.filter === "Weekly") {
			adjustedData = [1, 325, 78, 30, 4.7, 60, 2.3, 25, 2].map(num => num * 7);
		} else if (this.props.filter === "Monthly") {
			adjustedData = [1, 325, 78, 30, 4.7, 60, 2.3, 25, 2].map(num => num * 30);
		}
		return {
			labels: [
				"Calcium",
				"Carbohydrate",
				"Fat",
				"Fiber",
				"Potassium",
				"Protein",
				"Sodium",
				"Sugars",
				"Vitamin C"
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
					label: "Recommended Values",
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
				<h2>{this.props.filter} Totals (Grams)</h2>
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
})(withAuth(GramGraph));
