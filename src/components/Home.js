import React from "react";
import { Bar, HorizontalBar } from "react-chartjs-2";
import { connect } from "react-redux";
import withAuth from "./WithAuth";
import { Dropdown, Header, Icon } from "semantic-ui-react";
import CalorieGraph from "../graphs/CalorieGraph";

class Home extends React.Component {
	state = {
		filter: "Daily",
		recommendedValuesClicked: false
	};
	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

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
		let beta_carotene = 0;
		items.forEach(item => {
			beta_carotene += item.beta_carotene;
		});
		let caffeine = 0;
		items.forEach(item => {
			caffeine += item.caffeine;
		});
		let calcium = 0;
		items.forEach(item => {
			calcium += item.calcium;
		});
		let carbohydrate = 0;
		items.forEach(item => {
			carbohydrate += item.carbohydrate;
		});
		let cholesterol = 0;
		items.forEach(item => {
			cholesterol += item.cholesterol;
		});
		let calories = 0;
		items.forEach(item => {
			calories += item.calories;
		});
		let fat = 0;
		items.forEach(item => {
			fat += item.fat;
		});
		let fiber = 0;
		items.forEach(item => {
			fiber += item.fiber;
		});
		let folic_acid = 0;
		items.forEach(item => {
			folic_acid += item.folic_acid;
		});
		let iron = 0;
		items.forEach(item => {
			iron += item.iron;
		});
		let niacin = 0;
		items.forEach(item => {
			niacin += item.niacin;
		});
		let potassium = 0;
		items.forEach(item => {
			potassium += item.potassium;
		});
		let protein = 0;
		items.forEach(item => {
			protein += item.protein;
		});
		let riboflavin = 0;
		items.forEach(item => {
			riboflavin += item.riboflavin;
		});
		let sodium = 0;
		items.forEach(item => {
			sodium += item.sodium;
		});
		let sugars = 0;
		items.forEach(item => {
			sugars += item.sugars;
		});
		let thiamin = 0;
		items.forEach(item => {
			thiamin += item.thiamin;
		});
		let vitamin_a = 0;
		items.forEach(item => {
			vitamin_a += item.vitamin_a;
		});
		let vitamin_b12 = 0;
		items.forEach(item => {
			vitamin_b12 += item.vitamin_b12;
		});
		let vitamin_c = 0;
		items.forEach(item => {
			vitamin_c += item.vitamin_c;
		});
		let vitamin_d = 0;
		items.forEach(item => {
			vitamin_d += item.vitamin_d;
		});
		let vitamin_e = 0;
		items.forEach(item => {
			vitamin_e += item.vitamin_e;
		});
		let vitamin_k = 0;
		items.forEach(item => {
			vitamin_k += item.vitamin_k;
		});
		let zinc = 0;
		items.forEach(item => {
			zinc += item.zinc;
		});
		return [
			beta_carotene,
			caffeine,
			calcium,
			carbohydrate,
			cholesterol,
			calories,
			fat,
			fiber,
			folic_acid,
			iron,
			niacin,
			potassium,
			protein,
			riboflavin,
			sodium,
			sugars,
			thiamin,
			vitamin_a,
			vitamin_b12,
			vitamin_c,
			vitamin_d,
			vitamin_e,
			vitamin_k,
			zinc
		];
	}

	data = () => {
		return {
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
					label: "You",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.filterFoodItems(this.state.filter)
				}
			]
		};
	};

	data2 = () => {
		return {
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
					label: "You",
					backgroundColor: "rgba(255,99,132,0.2)",
					borderColor: "rgba(255,99,132,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(255,99,132,0.4)",
					hoverBorderColor: "rgba(255,99,132,1)",
					data: this.filterFoodItems(this.state.filter)
				},
				{
					label: "Recommended Values",
					backgroundColor: "rgba(54,162,235,0.2)",
					borderColor: "rgba(54,162,235,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(54,162,235,0.4)",
					hoverBorderColor: "rgba(54,162,235,1)",
					data: [15, 400, 1000, 325, 300, 2000, 78, 15, 400, 19, 35]
				}
			]
		};
	};

	options = [
		{
			key: "today",
			text: "today",
			value: "Daily",
			content: "Today"
		},
		{
			key: "this week",
			text: "this week",
			value: "Weekly",
			content: "This Week"
		},
		{
			key: "this month",
			text: "this month",
			value: "Monthly",
			content: "This Month"
		}
	];

	handleFilterChange = (e, v) => {
		this.setState({
			Filter: v.value,
			items: this.filterFoodItems(v.value)
		});
	};

	handleRecClick = () => {
		this.setState({
			recommendedValuesClicked: !this.state.recommendedValuesClicked
		});
	};

	render() {
		return (
			<div>
				<Header as="h4">
					<Icon name="calendar" />
					<Header.Content>
						Show{" "}
						<Dropdown
							inline
							options={this.options}
							defaultValue={this.options[0].value}
							onChange={this.handleFilterChange}
						/>
					</Header.Content>
				</Header>
				<button onClick={this.handleRecClick}>Show Rec Values</button>
				<CalorieGraph
					filter={this.state.filter}
					recValues={this.state.recommendedValuesClicked}
				/>

				<h2>{this.state.filter} Totals</h2>
				<Bar
					data={
						this.state.recommendedValuesClicked ? this.data2() : this.data()
					}
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
})(withAuth(Home));
