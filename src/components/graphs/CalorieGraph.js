import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";

class CalorieGraph extends React.Component {
	filterFoodItems = () => {
		if (this.props.filter === "Daily" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item =>
					Date.now() - Date.parse(item.date.split("T")[0]) < 1000 * 60 * 60 * 24
			);
			return this.mapNutrientCountsInState(items);
		} else if (
			this.props.filter === "Weekly" &&
			this.props.currentUser.food_items
		) {
			const items = this.props.currentUser.food_items.filter(
				item =>
					Date.now() - Date.parse(item.date.split("T")[0]) <
					1000 * 60 * 60 * 24 * 7
			);
			return this.mapNutrientCountsInState(items);
		} else if (
			this.props.filter === "Monthly" &&
			this.props.currentUser.food_items
		) {
			const items = this.props.currentUser.food_items.filter(
				item =>
					Date.now() - Date.parse(item.date.split("T")[0]) <
					1000 * 60 * 60 * 24 * 30
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
					backgroundColor: "rgba(31,177,61,0.2)",
					borderColor: "rgba(31,177,61,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(31,177,61,0.2)",
					hoverBorderColor: "rgba(31,177,61,1)",
					data: this.filterFoodItems()
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

	determineTotalRecommendedCalories = () => {
		switch (this.props.filter) {
			case "Weekly":
				return 14000;
			case "Monthly":
				return 60000;
			default:
				return 2000;
		}
	};

	determineProgressBarColor = () => {
		let percent = (
			this.filterFoodItems(this.props.filter)[0] /
			this.determineTotalRecommendedCalories()
		).toFixed(2);
		if (percent < 0.4) {
			return "green";
		} else if (percent < 0.7) {
			return "yellow";
		} else {
			return "red";
		}
	};

	render() {
		return (
			<div>
				<h2>{this.props.filter} Calories</h2>
				<Progress
					percent={Math.floor(
						this.filterFoodItems(this.props.filter)[0] /
							this.determineTotalRecommendedCalories() *
							100
					)}
					color={this.determineProgressBarColor()}
					progress
				/>
				<HorizontalBar
					data={this.props.recValues ? this.data2() : this.data()}
					width={100}
					height={25}
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
})(CalorieGraph);
