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
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Beta Carotene"
														name="rec_beta_carotene"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.beta_carotene}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Caffeine"
														name="rec_beta_caffeine"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.caffeine}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Calcium"
														name="rec_beta_calcium"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.calcium}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Carbohydrates"
														name="rec_carbohydrate"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.carbohydrate}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Cholesterol"
														name="rec_cholesterol"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.cholesterol}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Fat"
														name="rec_fat"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.fat}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Fiber"
														name="rec_fiber"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.fiber}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Folic Acid"
														name="rec_folic_acid"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.folic_acid}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Iron"
														name="rec_iron"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.iron}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Niacin"
														name="rec_niacin"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.niacin}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Potassium"
														name="rec_potassium"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.potassium}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Protein"
														name="rec_protein"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.protein}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Riboflavin"
														name="rec_riboflavin"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.riboflavin}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Sodium"
														name="rec_sodium"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.sodium}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Sugars"
														name="rec_sugars"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.sugars}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Thiamin"
														name="rec_thiamin"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.thiamin}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Vitamin A"
														name="rec_vitamin_a"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.vitamin_a}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Vitamin B12"
														name="rec_vitamin_b12"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.vitamin_b12}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Vitamin C"
														name="rec_vitamin_c"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.vitamin_c}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Vitamin D"
														name="rec_vitamin_d"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.vitamin_d}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Vitamin E"
														name="rec_vitamin_e"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.vitamin_e}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Vitamin K"
														name="rec_vitamin_k"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.vitamin_k}
													/>
												</Form.Group>
											</Grid.Column>
											<Grid.Column>
												<Form.Group widths="equal">
													<Form.Input
														fluid
														label="Zinc"
														name="rec_zinc"
														type="number"
														onChange={this.handleNutrientCountChange}
														placeholder={this.state.zinc}
													/>
												</Form.Group>
												<Form.Button>Submit</Form.Button>
											</Grid.Column>
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
