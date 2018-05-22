import React from "react";
import {
	Card,
	Header,
	Image,
	Modal,
	Grid,
	List,
	Button,
	Form
} from "semantic-ui-react";
import { sendUserRecNutrients } from "../actions/patchUserActions";
import { connect } from "react-redux";
import cuid from "cuid";

class ClientCard extends React.Component {
	state = {
		assignClientNutrientGoals: false,
		sodium: 0,
		rec_beta_carotene: 0,
		rec_caffeine: 0,
		rec_calcium: 0,
		rec_carbohydrate: 0,
		rec_cholesterol: 0,
		rec_fat: 0,
		rec_fiber: 0,
		rec_folic_acid: 0,
		rec_iron: 0,
		rec_niacin: 0,
		rec_potassium: 0,
		rec_protein: 0,
		rec_riboflavin: 0,
		rec_sodium: 0,
		rec_sugars: 0,
		rec_thiamin: 0,
		rec_vitamin_a: 0,
		rec_vitamin_b12: 0,
		rec_vitamin_c: 0,
		rec_vitamin_d: 0,
		rec_vitamin_e: 0,
		rec_vitamin_k: 0,
		rec_zinc: 0
	};

	componentDidMount() {
		this.calculateWeeklyNutrientValues();
	}

	calculateWeeklyNutrientValues = () => {
		const items = this.props.client.food_items.filter(
			item => Date.now() - Date.parse(item.date.split("T")[0]) < 604800000
		);
		return this.mapNutrientCountsInState(items);
	};

	mapNutrientCountsInState(items) {
		let nutrientCounts = {
			beta_carotene: 0,
			caffeine: 0,
			calcium: 0,
			carbohydrate: 0,
			cholesterol: 0,
			fat: 0,
			fiber: 0,
			folic_acid: 0,
			iron: 0,
			niacin: 0,
			potassium: 0,
			protein: 0,
			riboflavin: 0,
			sodium: 0,
			sugars: 0,
			thiamin: 0,
			vitamin_a: 0,
			vitamin_b12: 0,
			vitamin_c: 0,
			vitamin_d: 0,
			vitamin_e: 0,
			vitamin_k: 0,
			zinc: 0
		};
		items.forEach(itemObj => {
			for (let nutrient in itemObj) {
				if (nutrient === "sodium") {
					nutrientCounts.sodium += itemObj.sodium / 1000;
				} else {
					nutrientCounts[nutrient] += itemObj[nutrient];
				}
			}
		});
		this.setState(nutrientCounts);
	}

	handleGoalValueClick = () => {
		this.setState({
			assignClientNutrientGoals: !this.state.assignClientNutrientGoals
		});
	};

	handleNutrientCountChange = e => {
		this.setState({
			[e.target.name]: parseInt(e.target.value, 10)
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		let payload = {
			...this.state,
			id: this.props.client.id
		};
		this.props.sendUserRecNutrients(payload);
	};

	capitalizeNutrientName(word) {
		let splitWord = word.split("_");
		let capitalizedWord = [];
		for (let i = 1; i < splitWord.length; i++) {
			let word = splitWord[i][0].toUpperCase() + splitWord[i].slice(1);
			capitalizedWord.push(word);
		}
		return capitalizedWord.join(" ");
	}

	createRecommendedNutrientForm = () => {
		let nutrients = [
			"rec_beta_carotene",
			"rec_caffeine",
			"rec_calcium",
			"rec_carbohydrate",
			"rec_cholesterol",
			"rec_fat",
			"rec_fiber",
			"rec_folic_acid",
			"rec_iron",
			"rec_niacin",
			"rec_potassium",
			"rec_protein",
			"rec_riboflavin",
			"rec_sodium",
			"rec_sugars",
			"rec_thiamin",
			"rec_vitamin_a",
			"rec_vitamin_b12",
			"rec_vitamin_c",
			"rec_vitamin_d",
			"rec_vitamin_e",
			"rec_vitamin_k",
			"rec_zinc"
		];
		let recommendedNutrientForm = [];
		for (let i = 0; i < nutrients.length; i++) {
			recommendedNutrientForm.push(
				<Grid.Column key={cuid()}>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label={this.capitalizeNutrientName(nutrients[i])}
							name={nutrients[i]}
							type="number"
							onChange={this.handleNutrientCountChange}
							placeholder={this.state[nutrients[i].slice(4)]}
						/>
					</Form.Group>
				</Grid.Column>
			);
		}
		return recommendedNutrientForm;
	};

	render() {
		return (
			<div>
				<Modal
					trigger={
						<Card>
							<Image src={this.props.client.profile_photo} />
							<Card.Content header={this.props.client.name} />
							<Card.Content description={this.props.client.goal} />
						</Card>
					}
				>
					<Modal.Header>{this.props.client.name}</Modal.Header>
					<Modal.Content image>
						<Image
							wrapped
							size="medium"
							src={this.props.client.profile_photo}
						/>
						<Modal.Description>
							<Header>Personal Goal: {this.props.client.goal}</Header>

							<Grid divided="vertically">
								<Grid.Row columns={2}>
									<Grid.Column>
										<List>
											<List.Item>Age: {this.props.client.age}</List.Item>
											<List.Item>BMI: {this.props.client.bmi}</List.Item>
										</List>
									</Grid.Column>
									<Grid.Column>
										<List>
											<List.Item>
												Weight: {this.props.client.weight} lbs
											</List.Item>
											<List.Item>
												Height: {this.props.client.height} inches
											</List.Item>
										</List>
									</Grid.Column>
								</Grid.Row>
								{this.state.assignClientNutrientGoals ? (
									<Grid.Row columns={2}>
										<Form onSubmit={this.handleSubmit}>
											{this.createRecommendedNutrientForm()}
										</Form>
									</Grid.Row>
								) : (
									<Grid.Row columns={2}>
										<Grid.Column>
											<List>
												<List.Item>
													Beta Carotene: {this.state.beta_carotene}
												</List.Item>
												<List.Item>Caffeine: {this.state.caffeine}</List.Item>
												<List.Item>Calcium: {this.state.calcuim}</List.Item>
												<List.Item>
													Carbohydrates: {this.state.carbohydrate}
												</List.Item>
												<List.Item>
													Cholesterol: {this.state.cholesterol}
												</List.Item>
												<List.Item>Fat: {this.state.fat}</List.Item>
												<List.Item>Fiber: {this.state.fiber}</List.Item>
												<List.Item>
													Folic Acid: {this.state.folic_acid}
												</List.Item>
												<List.Item>Iron: {this.state.iron}</List.Item>
												<List.Item>Niacin: {this.state.niacin}</List.Item>
												<List.Item>Pottasium: {this.state.potassium}</List.Item>
											</List>
										</Grid.Column>
										<Grid.Column>
											<List>
												<List.Item>Protein: {this.state.protein}</List.Item>
												<List.Item>
													Riboflavin: {this.state.riboflavin}
												</List.Item>
												<List.Item>
													Sodium: {this.state.sodium.toFixed(2)}
												</List.Item>
												<List.Item>Sugars: {this.state.sugars}</List.Item>
												<List.Item>Thiamin: {this.state.thiamin}</List.Item>
												<List.Item>Vitamin A: {this.state.vitamin_a}</List.Item>
												<List.Item>
													Vitamin B12: {this.state.vitamin_b12}
												</List.Item>
												<List.Item>Vitamin C: {this.state.vitamin_c}</List.Item>
												<List.Item>Vitamin D: {this.state.vitamin_d}</List.Item>
												<List.Item>Vitamin E: {this.state.vitamin_e}</List.Item>
												<List.Item>Vitamin K: {this.state.vitamin_k}</List.Item>
												<List.Item>Zinc: {this.state.zinc}</List.Item>
											</List>
										</Grid.Column>
									</Grid.Row>
								)}

								<Grid.Row>
									<Grid.Column>
										<Button onClick={this.handleGoalValueClick}>
											{this.state.assignClientNutrientGoals
												? "Cancel"
												: "Assign Goal Values"}
										</Button>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</div>
		);
	}
}

export default connect(null, { sendUserRecNutrients })(ClientCard);
