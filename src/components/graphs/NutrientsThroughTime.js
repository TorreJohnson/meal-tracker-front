import React from "react";
import { connect } from "react-redux";
import withAuth from "../authentication/WithAuth";
import { Line } from "react-chartjs-2";
import { Dropdown } from "semantic-ui-react";

class NutrientsThroughTime extends React.Component {
	state = {
		filter: "",
		text: "Select Value"
	};

	handleChange = (e, v) => {
		const capitalizedValue = v.value
			.split("_")
			.map(word => word[0].toUpperCase() + word.slice(1))
			.join(" ");
		this.setState({
			filter: v.value,
			text: capitalizedValue
		});
	};

	filteredSum = ms => {
		const items = this.props.currentUser.food_items.filter(
			item =>
				Date.now() - Date.parse(item.date.split("T")[0]) < ms &&
				Date.now() - Date.parse(item.date.split("T")[0]) > ms - 86400000
		);
		const arrayedItems = items.map(item => item[this.state.filter]);
		return arrayedItems.reduce((a, b) => a + b, 0);
	};

	nutrientValuesThroughTime = () => {
		let i = 30;
		let ms = 2592000000;
		let counts = [];
		while (i > 0) {
			counts.push(this.filteredSum(ms));
			i--;
			ms -= 86400000;
		}
		return counts;
	};

	data = () => {
		return {
			labels: [
				30,
				29,
				28,
				27,
				26,
				25,
				24,
				23,
				22,
				21,
				20,
				19,
				18,
				17,
				16,
				15,
				14,
				13,
				12,
				11,
				10,
				9,
				8,
				7,
				6,
				5,
				4,
				3,
				2,
				1
			],
			datasets: [
				{
					label: "You",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(75,192,192,0.4)",
					borderColor: "rgba(75,192,192,1)",
					borderCapStyle: "butt",
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: "miter",
					pointBorderColor: "rgba(75,192,192,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(75,192,192,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.nutrientValuesThroughTime()
				}
			]
		};
	};

	nutrientOptions = [
		{ key: "Beta Carotene", text: "Beta Carotene", value: "beta_carotene" },
		{ key: "Caffeine", text: "Caffeine", value: "caffeine" },
		{ key: "Calcium", text: "Calcium", value: "calcium" },
		{ key: "Carbohydrates", text: "Carbohydrates", value: "carbohydrate" },
		{ key: "Cholesterol", text: "Cholesterol", value: "cholesterol" },
		{ key: "Calories", text: "Calories", value: "calories" },
		{ key: "Fat", text: "Fat", value: "fat" },
		{ key: "Fiber", text: "Fiber", value: "fiber" },
		{ key: "Folic Acid", text: "Folic Acid", value: "folic_acid" },
		{ key: "Iron", text: "Iron", value: "iron" },
		{ key: "Niacin", text: "Niacin", value: "niacin" },
		{ key: "Potassium", text: "Potassium", value: "potassium" },
		{ key: "Protein", text: "Protein", value: "protein" },
		{ key: "Riboflavin", text: "Riboflavin", value: "riboflavin" },
		{ key: "Sodium", text: "Sodium", value: "sodium" },
		{ key: "Sugars", text: "Sugars", value: "sugars" },
		{ key: "Thiamin", text: "Thiamin", value: "thiamin" },
		{ key: "Vitamin A", text: "Vitamin A", value: "vitamin_a" },
		{ key: "Vitamin B12", text: "Vitamin B12", value: "vitamin_b12" },
		{ key: "Vitamin C", text: "Vitamin C", value: "vitamin_c" },
		{ key: "Vitamin D", text: "Vitamin D", value: "vitamin_d" },
		{ key: "Vitamin E", text: "Vitamin E", value: "vitamin_e" },
		{ key: "Vitamin K", text: "Vitamin K", value: "vitamin_k" },
		{ key: "Zinc", text: "Zinc", value: "zinc" }
	];

	render() {
		this.nutrientValuesThroughTime();
		return (
			<div>
				<h2>{this.state.text}</h2>
				<Dropdown
					button
					className="icon"
					floating
					labeled
					icon="line chart"
					options={this.nutrientOptions}
					search
					text="Values"
					onChange={this.handleChange}
				/>
				<Line data={this.data} />
			</div>
		);
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(withAuth(NutrientsThroughTime));
