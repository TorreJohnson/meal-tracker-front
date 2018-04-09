import React from "react";
import { Bar } from "react-chartjs-2";
import { connect } from "react-redux";
import withAuth from "./WithAuth";

class Home extends React.Component {
	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

	// mapNutrientCountsInState = () => {
	// 	this.props.currentUser.food_items.map(item => )
	// }

	data = {
		labels: [
			"Beta Carotene",
			"Caffeine",
			"Calcium",
			"Carbohydrate",
			"Cholesterol",
			"Calories",
			"Fat",
			"Fiber",
			"Folic Acid",
			"Iron",
			"Niacin",
			"Potassium",
			"Protein",
			"Riboflavin",
			"Sodium",
			"Sugars",
			"Thiamin",
			"Vitamin A",
			"Vitamin B-12",
			"Vitamin C",
			"Vitamin D",
			"Vitamin E",
			"Vitamin K",
			"Zinc"
		],
		datasets: [
			{
				label: "",
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "rgba(255,99,132,1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(255,99,132,0.4)",
				hoverBorderColor: "rgba(255,99,132,1)",
				data: [65, 59, 80, 81, 56, 55, 40]
			}
		]
	};

	render() {
		return (
			<div>
				<h2>Daily Totals</h2>
				<Bar
					data={this.data}
					width={100}
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
		item: state.items,
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(withAuth(Home));
