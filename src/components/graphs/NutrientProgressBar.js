import React from "react";
import { connect } from "react-redux";
import { Progress } from "semantic-ui-react";

class NutrientProgressBar extends React.Component {
	monthlySum = () => {
		const items = this.props.currentUser.food_items.filter(
			item => Date.now() - Date.parse(item.date.split("T")[0]) < 2592000000
		);
		const arrayedItems = items.map(item => item[this.props.nutrient]);
		return arrayedItems.reduce((a, b) => a + b, 0);
	};

	maximumMonthlyValues = {
		beta_carotene: 450,
		caffeine: 12000,
		calcium: 30000,
		calories: 60000,
		carbohydrate: 9750,
		cholesterol: 9000,
		fat: 2340,
		fiber: 900,
		folic_acid: 12,
		iron: 600,
		niacin: 1050,
		potassium: 141,
		protein: 1800,
		riboflavin: 30,
		sodium: 69,
		sugars: 750,
		thiamin: 60,
		vitamin_a: 30,
		vitamin_b12: 30,
		vitamin_c: 60,
		vitamin_d: 30,
		vitamin_e: 600,
		vitamin_k: 30,
		zinc: 450
	};

	determineProgressBarColor = () => {
		let percent = (
			this.monthlySum() / this.maximumMonthlyValues[this.props.nutrient]
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
				<h2>Percentage of Maximum Recommended Amount</h2>
				<Progress
					percent={
						(
							this.monthlySum() / this.maximumMonthlyValues[this.props.nutrient]
						).toFixed(2) * 100
					}
					color={this.determineProgressBarColor()}
					progress
				/>
			</div>
		);
	}
}

export default connect(state => {
	return { currentUser: state.currentUser };
})(NutrientProgressBar);
