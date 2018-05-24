import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";

class GroupOneBarGraph extends React.Component {
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
		let caffeine = 0;
		let fat = 0;
		let folic_acid = 0;
		let niacin = 0;
		let protein = 0;
		let sugars = 0;
		let vitamin_c = 0;
		let vitamin_d = 0;
		items.forEach(item => {
			caffeine += item.caffeine;
			fat += item.fat;
			folic_acid += item.folic_acid;
			niacin += item.niacin;
			protein += item.protein;
			sugars += item.sugars;
			vitamin_c += item.vitamin_c;
			vitamin_d += item.vitamin_d;
		});
		return [
			caffeine,
			fat,
			folic_acid,
			niacin,
			protein,
			sugars,
			vitamin_c,
			vitamin_d
		];
	}

	data = () => {
		return {
			labels: [
				"Caffeine",
				"Fat",
				"Folic Acid",
				"Niacin",
				"Protein",
				"Sugars",
				"Vitamin C",
				"Vitamin D"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(31,177,61,0.2)",
					borderColor: "rgba(31,177,61,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(31,177,61,0.4)",
					hoverBorderColor: "rgba(31,177,61,1)",
					data: this.filterFoodItems()
				}
			]
		};
	};

	data2 = () => {
		let adjustedData = [400, 200, 400, 16, 250, 38, 90, 400];
		if (this.props.filter === "Weekly") {
			adjustedData = adjustedData.map(num => num * 7);
		} else if (this.props.filter === "Monthly") {
			adjustedData = adjustedData.map(num => num * 30);
		}
		return {
			labels: [
				"Caffeine",
				"Fat",
				"Folic Acid",
				"Niacin",
				"Protein",
				"Sugars",
				"Vitamin C",
				"Vitamin D"
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
				<h2>{this.props.filter} Totals</h2>
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
})(GroupOneBarGraph);
