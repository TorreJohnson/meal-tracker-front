import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import withAuth from "../components/WithAuth";

class CalorieGraph extends React.Component {
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
		let calories = 0;
		items.forEach(item => {
			calories += item.calories;
		});
		return [calories];
	}

	data = () => {
		return {
			labels: ["Calories"],
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
		return {
			labels: ["Calories"],
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
					data: [2000]
				}
			]
		};
	};

	render() {
		return (
			<div>
				<h2>Horizontal Bar Example</h2>
				<HorizontalBar
					data={this.props.recValues ? this.data2() : this.data()}
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
})(withAuth(CalorieGraph));
