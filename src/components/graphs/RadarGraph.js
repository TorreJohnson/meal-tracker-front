import React from "react";
import { Radar } from "react-chartjs-2";
import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";

class RadarGraph extends React.Component {
	filterMgFoodItems = filter => {
		if (filter === "Daily" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 86400000
			);
			return this.mapMgNutrientCountsInState(items);
		} else if (filter === "Weekly" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 604800000
			);
			return this.mapMgNutrientCountsInState(items);
		} else if (filter === "Monthly" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 2592000000
			);
			return this.mapMgNutrientCountsInState(items);
		}
	};

	mapMgNutrientCountsInState(items) {
		let beta_carotene = 0;
		let caffeine = 0;
		let cholesterol = 0;
		let folic_acid = 0;
		let iron = 0;
		let niacin = 0;
		let riboflavin = 0;
		let thiamin = 0;
		let vitamin_a = 0;
		let vitamin_b12 = 0;
		let vitamin_d = 0;
		let vitamin_e = 0;
		let vitamin_k = 0;
		let zinc = 0;
		items.forEach(item => {
			beta_carotene += item.beta_carotene;
			caffeine += item.caffeine;
			cholesterol += item.cholesterol;
			folic_acid += item.folic_acid;
			iron += item.iron;
			niacin += item.niacin;
			riboflavin += item.riboflavin;
			thiamin += item.thiamin;
			vitamin_a += item.vitamin_a;
			vitamin_b12 += item.vitamin_b12;
			vitamin_d += item.vitamin_d;
			vitamin_e += item.vitamin_e;
			vitamin_k += item.vitamin_k;
			zinc += item.zinc;
		});
		return [
			beta_carotene,
			caffeine,
			cholesterol,
			folic_acid,
			iron,
			niacin,
			riboflavin,
			thiamin,
			vitamin_a,
			vitamin_b12,
			vitamin_d,
			vitamin_e,
			vitamin_k,
			zinc
		];
	}

	adjustNutritionistMgValues = filter => {
		if (filter === "Daily") {
			return [
				Math.ceil(this.props.currentUser.rec_beta_carotene / 7),
				Math.ceil(this.props.currentUser.rec_caffeine / 7),
				Math.ceil(this.props.currentUser.rec_cholesterol / 7),
				Math.ceil(this.props.currentUser.rec_folic_acid / 7),
				Math.ceil(this.props.currentUser.rec_iron / 7),
				Math.ceil(this.props.currentUser.rec_niacin / 7),
				Math.ceil(this.props.currentUser.rec_riboflavin / 7),
				Math.ceil(this.props.currentUser.rec_thiamin / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_a / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_b12 / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_d / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_e / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_k / 7),
				Math.ceil(this.props.currentUser.rec_zinc / 7)
			];
		} else if (filter === "Weekly") {
			return [
				this.props.currentUser.rec_beta_carotene,
				this.props.currentUser.rec_caffeine,
				this.props.currentUser.rec_cholesterol,
				this.props.currentUser.rec_folic_acid,
				this.props.currentUser.rec_iron,
				this.props.currentUser.rec_niacin,
				this.props.currentUser.rec_riboflavin,
				this.props.currentUser.rec_thiamin,
				this.props.currentUser.rec_vitamin_a,
				this.props.currentUser.rec_vitamin_b12,
				this.props.currentUser.rec_vitamin_d,
				this.props.currentUser.rec_vitamin_e,
				this.props.currentUser.rec_vitamin_k,
				this.props.currentUser.rec_zinc
			];
		} else if (filter === "Monthly") {
			return [
				Math.ceil(this.props.currentUser.rec_beta_carotene * 30),
				Math.ceil(this.props.currentUser.rec_caffeine * 30),
				Math.ceil(this.props.currentUser.rec_cholesterol * 30),
				Math.ceil(this.props.currentUser.rec_folic_acid * 30),
				Math.ceil(this.props.currentUser.rec_iron * 30),
				Math.ceil(this.props.currentUser.rec_niacin * 30),
				Math.ceil(this.props.currentUser.rec_riboflavin * 30),
				Math.ceil(this.props.currentUser.rec_thiamin * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_a * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_b12 * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_d * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_e * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_k * 30),
				Math.ceil(this.props.currentUser.rec_zinc * 30)
			];
		}
	};

	mgData = () => {
		return {
			labels: [
				"Beta Carotene",
				"Caffeine",
				"Cholesterol",
				"Folic Acid",
				"Iron",
				"Niacin",
				"Riboflavin",
				"Thiamin",
				"Vitamin A",
				"Vitamin B-12",
				"Vitamin D",
				"Vitamin E",
				"Vitamin K",
				"Zinc"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(122,198,195,0.2)",
					borderColor: "rgba(122,198,195,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(122,198,195,0.4)",
					hoverBorderColor: "rgba(122,198,195,1)",
					data: this.filterMgFoodItems(this.props.filter)
				},
				{
					label: "Suggested by your nutritionist",
					backgroundColor: "rgba(229,158,113,0.2)",
					borderColor: "rgba(229,158,113,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(229,158,113,0.4)",
					hoverBorderColor: "rgba(229,158,113,1)",
					data: this.adjustNutritionistMgValues(this.props.filter)
				}
			]
		};
	};

	mgData2 = () => {
		let adjustedData = [15, 400, 300, 0.4, 20, 35, 1, 2, 1, 1, 1, 20, 1, 15];
		if (this.props.filter === "Weekly") {
			adjustedData = [15, 400, 300, 0.4, 20, 35, 1, 2, 1, 1, 1, 20, 1, 15].map(
				num => num * 7
			);
		} else if (this.props.filter === "Monthly") {
			adjustedData = [15, 400, 300, 0.4, 20, 35, 1, 2, 1, 1, 1, 20, 1, 15].map(
				num => num * 30
			);
		}

		return {
			labels: [
				"Beta Carotene",
				"Caffeine",
				"Cholesterol",
				"Folic Acid",
				"Iron",
				"Niacin",
				"Riboflavin",
				"Thiamin",
				"Vitamin A",
				"Vitamin B-12",
				"Vitamin D",
				"Vitamin E",
				"Vitamin K",
				"Zinc"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(122,198,195,0.2)",
					borderColor: "rgba(122,198,195,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(122,198,195,0.4)",
					hoverBorderColor: "rgba(122,198,195,1)",
					data: this.filterMgFoodItems(this.props.filter)
				},
				{
					label: "Suggested by your nutritionist",
					backgroundColor: "rgba(229,158,113,0.2)",
					borderColor: "rgba(229,158,113,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(229,158,113,0.4)",
					hoverBorderColor: "rgba(229,158,113,1)",
					data: this.adjustNutritionistMgValues(this.props.filter)
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

	filterGramFoodItems = filter => {
		if (filter === "Daily" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 86400000
			);
			return this.mapGramNutrientCountsInState(items);
		} else if (filter === "Weekly" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 604800000
			);
			return this.mapGramNutrientCountsInState(items);
		} else if (filter === "Monthly" && this.props.currentUser.food_items) {
			const items = this.props.currentUser.food_items.filter(
				item => Date.now() - Date.parse(item.date.split("T")[0]) < 2592000000
			);
			return this.mapGramNutrientCountsInState(items);
		}
	};

	mapGramNutrientCountsInState(items) {
		let calcium = 0;
		let carbohydrate = 0;
		let fat = 0;
		let fiber = 0;
		let potassium = 0;
		let protein = 0;
		let sodium = 0;
		let sugars = 0;
		let vitamin_c = 0;
		items.forEach(item => {
			calcium += item.calcium;
			carbohydrate += item.carbohydrate;
			fat += item.fat;
			fiber += item.fiber;
			potassium += item.potassium;
			protein += item.protein;
			sodium += item.sodium / 1000;
			vitamin_c += item.vitamin_c;
		});
		return [
			calcium,
			carbohydrate,
			fat,
			fiber,
			potassium,
			protein,
			sodium,
			sugars,
			vitamin_c
		];
	}

	adjustNutritionistGramValues = filter => {
		if (filter === "Daily") {
			return [
				Math.ceil(this.props.currentUser.rec_calcium / 7),
				Math.ceil(this.props.currentUser.rec_carbohydrate / 7),
				Math.ceil(this.props.currentUser.rec_fat / 7),
				Math.ceil(this.props.currentUser.rec_fiber / 7),
				Math.ceil(this.props.currentUser.rec_potassium / 7),
				Math.ceil(this.props.currentUser.rec_sodium / 7),
				Math.ceil(this.props.currentUser.rec_sugars / 7),
				Math.ceil(this.props.currentUser.rec_vitamin_c / 7)
			];
		} else if (filter === "Weekly") {
			return [
				this.props.currentUser.rec_beta_calcium,
				this.props.currentUser.rec_carbohydrate,
				this.props.currentUser.rec_fat,
				this.props.currentUser.rec_fiber,
				this.props.currentUser.rec_potassium,
				this.props.currentUser.rec_sodium,
				this.props.currentUser.rec_sugars,
				this.props.currentUser.rec_vitamin_c
			];
		} else if (filter === "Monthly" && this.props.currentUser.food_items) {
			return [
				Math.ceil(this.props.currentUser.rec_calcium * 30),
				Math.ceil(this.props.currentUser.rec_carbohydrate * 30),
				Math.ceil(this.props.currentUser.rec_fat * 30),
				Math.ceil(this.props.currentUser.rec_fiber * 30),
				Math.ceil(this.props.currentUser.rec_potassium * 30),
				Math.ceil(this.props.currentUser.rec_sodium * 30),
				Math.ceil(this.props.currentUser.rec_sugars * 30),
				Math.ceil(this.props.currentUser.rec_vitamin_c * 30)
			];
		}
	};

	gData = () => {
		return {
			labels: [
				"Calcium",
				"Carbohydrate",
				"Fat",
				"Fiber",
				"Potassium",
				"Protein",
				"Sodium",
				"Sugars",
				"Vitamin C"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(122,198,195,0.2)",
					borderColor: "rgba(122,198,195,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(122,198,195,0.4)",
					hoverBorderColor: "rgba(122,198,195,1)",
					data: this.filterGramFoodItems(this.props.filter)
				},
				{
					label: "Suggested by your nutritionist",
					backgroundColor: "rgba(229,158,113,0.2)",
					borderColor: "rgba(229,158,113,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(229,158,113,0.4)",
					hoverBorderColor: "rgba(229,158,113,1)",
					data: this.adjustNutritionistGramValues(this.props.filter)
				}
			]
		};
	};

	gData2 = () => {
		let adjustedData = [1, 325, 78, 30, 4.7, 60, 2.3, 25, 2];
		if (this.props.filter === "Weekly") {
			adjustedData = [1, 325, 78, 30, 4.7, 60, 2.3, 25, 2].map(num => num * 7);
		} else if (this.props.filter === "Monthly") {
			adjustedData = [1, 325, 78, 30, 4.7, 60, 2.3, 25, 2].map(num => num * 30);
		}
		return {
			labels: [
				"Calcium",
				"Carbohydrate",
				"Fat",
				"Fiber",
				"Potassium",
				"Protein",
				"Sodium",
				"Sugars",
				"Vitamin C"
			],
			datasets: [
				{
					label: "You",
					backgroundColor: "rgba(122,198,195,0.2)",
					borderColor: "rgba(122,198,195,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(122,198,195,0.4)",
					hoverBorderColor: "rgba(122,198,195,1)",
					data: this.filterGramFoodItems(this.props.filter)
				},
				{
					label: "Suggested by your nutritionist",
					backgroundColor: "rgba(229,158,113,0.2)",
					borderColor: "rgba(229,158,113,1)",
					borderWidth: 1,
					hoverBackgroundColor: "rgba(229,158,113,0.4)",
					hoverBorderColor: "rgba(229,158,113,1)",
					data: this.adjustNutritionistGramValues(this.props.filter)
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
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>
							<h2>Milligrams</h2>
							<Radar
								data={this.props.recValues ? this.mgData2() : this.mgData()}
							/>
						</Grid.Column>
						<Grid.Column width={8}>
							<h2>Grams</h2>
							<Radar
								data={this.props.recValues ? this.gData2() : this.gData()}
							/>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

export default connect(state => {
	return { currentUser: state.currentUser };
})(RadarGraph);
