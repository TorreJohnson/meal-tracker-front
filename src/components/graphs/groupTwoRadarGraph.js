import React from "react";
import { Radar } from "react-chartjs-2";
import { connect } from "react-redux";

class GroupTwoRadarGraph extends React.Component {
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

	adjustNutritionistValues = () => {
		if (this.props.filter === "Daily") {
			return [
				Math.ceil(this.props.currentUser.rec_beta_carotene / 7),
				Math.ceil(this.props.currentUser.rec_fiber / 7),
				Math.ceil(this.props.currentUser.rec_iron / 7),
				Math.ceil(this.props.currentUser.rec_riboflavin / 7),
				Math.ceil(this.props.currentUser.rec_thiamin / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_b12 / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_e / 7),
				Math.ceil(this.props.currentUser.rec_zinc / 7)
			];
		} else if (this.props.filter === "Weekly") {
			return [
				this.props.currentUser.rec_beta_carotene,
				this.props.currentUser.rec_fiber,
				this.props.currentUser.rec_iron,
				this.props.currentUser.rec_riboflavin,
				this.props.currentUser.rec_thiamin,
				this.props.currentUser.rec_vitamin_b12,
				this.props.currentUser.rec_vitamin_e,
				this.props.currentUser.rec_zinc
			];
		} else if (this.props.filter === "Monthly") {
			return [
				Math.ceil(this.props.currentUser.rec_beta_carotene * 30),
				Math.ceil(this.props.currentUser.rec_fiber * 30),
				Math.ceil(this.props.currentUser.rec_iron * 30),
				Math.ceil(this.props.currentUser.rec_riboflavin * 30),
				Math.ceil(this.props.currentUser.rec_thiamin * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_b12 * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_e * 30),
				Math.ceil(this.props.currentUser.rec_zinc * 30)
			];
		}
	};

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
					hoverBackgroundColor: "rgba(31,177,61,0.4)",
					hoverBorderColor: "rgba(31,177,61,1)",
					data: this.filterFoodItems()
				},
				{
					label: "Suggested by your nutritionist",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.adjustNutritionistValues()
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
					backgroundColor: "rgba(31,177,61,0.2)",
					borderColor: "rgba(31,177,61,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(31,177,61,0.4)",
					hoverBorderColor: "rgba(31,177,61,1)",
					data: this.filterFoodItems()
				},
				{
					label: "Suggested by your nutritionist",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.adjustNutritionistValues()
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
				<Radar data={this.props.recValues ? this.data2() : this.data()} />
			</div>
		);
	}
}

export default connect(state => {
	return { currentUser: state.currentUser };
})(GroupTwoRadarGraph);
