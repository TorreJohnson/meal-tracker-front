import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import withAuth from "../authentication/WithAuth";

class CalorieGraph extends React.Component {
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
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(75,192,192,0.2)",
					hoverBorderColor: "rgba(75,192,192,1)",
					data: this.filterFoodItems(this.props.filter)
				}
			]
		};
	};

	data2 = () => {
		let adjustedData = [2000];
		if (this.props.filter === "Weekly") {
			adjustedData = [2000].map(num => num * 7);
		} else if (this.props.filter === "Monthly") {
			adjustedData = [2000].map(num => num * 30);
		}
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
					label: "Recommended Amount",
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
				<h2>Calories</h2>
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
