import React from "react";
import { connect } from "react-redux";
import { Line } from "react-chartjs-2";

class NutrientsThroughTime extends React.Component {
	capitalizeNutrient = () => {
		return this.props.nutrient
			.split("_")
			.map(word => word[0].toUpperCase() + word.slice(1))
			.join(" ");
	};

	filteredSum = ms => {
		const items = this.props.currentUser.food_items.filter(
			item =>
				Date.now() - Date.parse(item.date.split("T")[0]) < ms &&
				Date.now() - Date.parse(item.date.split("T")[0]) >
					ms - 1000 * 60 * 60 * 24
		);
		const arrayedItems = items.map(item => item[this.props.nutrient]);
		return arrayedItems.reduce((a, b) => a + b, 0);
	};

	nutrientValuesThroughTime = () => {
		if (this.props.nutrient.length) {
			let i = 31;
			let ms = 1000 * 60 * 60 * 24 * 30;
			let counts = [];
			while (i > 0) {
				counts.push(this.filteredSum(ms));
				i--;
				ms -= 1000 * 60 * 60 * 24;
			}
			return counts;
		} else {
			return [
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
		}
	};

	data = () => {
		return {
			labels: [
				-30,
				-29,
				-28,
				-27,
				-26,
				-25,
				-24,
				-23,
				-22,
				-21,
				-20,
				-19,
				-18,
				-17,
				-16,
				-15,
				-14,
				-13,
				-12,
				-11,
				-10,
				-9,
				-8,
				-7,
				-6,
				-5,
				-4,
				-3,
				-2,
				-1,
				0
			],
			datasets: [
				{
					label: "You",
					fill: true,
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

	maximumDailyValues = {
		beta_carotene: 15,
		caffeine: 400,
		calcium: 1000,
		calories: 2000,
		carbohydrate: 325,
		cholesterol: 300,
		fat: 78,
		fiber: 30,
		folic_acid: 400,
		iron: 20,
		niacin: 35,
		potassium: 4.7,
		protein: 60,
		riboflavin: 1,
		sodium: 2.3,
		sugars: 25,
		thiamin: 2,
		vitamin_a: 1,
		vitamin_b12: 1,
		vitamin_c: 2,
		vitamin_d: 1,
		vitamin_e: 20,
		vitamin_k: 1,
		zinc: 15
	};

	recommendedValueData = () => {
		let dataArr = [];
		for (var i = 0; i < 31; i++) {
			dataArr.push(this.maximumDailyValues[this.props.nutrient]);
		}
		return dataArr;
	};

	data2 = () => {
		return {
			labels: [
				-30,
				-29,
				-28,
				-27,
				-26,
				-25,
				-24,
				-23,
				-22,
				-21,
				-20,
				-19,
				-18,
				-17,
				-16,
				-15,
				-14,
				-13,
				-12,
				-11,
				-10,
				-9,
				-8,
				-7,
				-6,
				-5,
				-4,
				-3,
				-2,
				-1,
				0
			],
			datasets: [
				{
					label: "You",
					fill: true,
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
				},
				{
					label: "Maximum Recommended Value",
					fill: false,
					lineTension: 0.1,
					backgroundColor: "rgba(187,130,146,0.4)",
					borderColor: "rgba(187,130,146,1)",
					borderCapStyle: "butt",
					borderDash: [5],
					borderDashOffset: 0.0,
					borderJoinStyle: "miter",
					pointBorderColor: "rgba(187,130,146,1)",
					pointBackgroundColor: "#fff",
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: "rgba(187,130,146,1)",
					pointHoverBorderColor: "rgba(220,220,220,1)",
					pointHoverBorderWidth: 2,
					pointRadius: 1,
					pointHitRadius: 10,
					data: this.recommendedValueData()
				}
			]
		};
	};

	render() {
		return (
			<div>
				<h2>{this.capitalizeNutrient()} (Last 30 Days)</h2>
				{this.props.recValues ? (
					<Line data={this.data2()} />
				) : (
					<Line data={this.data()} />
				)}
			</div>
		);
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(NutrientsThroughTime);
