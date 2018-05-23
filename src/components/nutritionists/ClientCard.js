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
import {
	recommendedNutrients,
	snakeCasedNutrients
} from "../nutrients/NutrientLists";
import cuid from "cuid";

class ClientCard extends React.Component {
	state = {
		assignClientNutrientGoals: false,
		sodium: 0
	};

	componentDidMount() {
		this.addNutrientsToState(
			this.createDefaultNutrientObj(recommendedNutrients),
			this.calculateWeeklyNutrientValues()
		);
	}

	createDefaultNutrientObj(nutrientArray) {
		let nutrientObj = {};
		for (let i = 0; i < nutrientArray.length; i++) {
			nutrientObj[nutrientArray[i]] = 0;
		}
		return nutrientObj;
	}

	addNutrientsToState = (nutrientObj, callback = null) => {
		this.setState(nutrientObj, callback);
	};

	calculateWeeklyNutrientValues = () => {
		const items = this.props.client.food_items.filter(
			item => Date.now() - Date.parse(item.date.split("T")[0]) < 604800000
		);
		return this.mapNutrientCountsInState(items);
	};

	mapNutrientCountsInState(items) {
		let nutrientCounts = this.createDefaultNutrientObj(snakeCasedNutrients);
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

	createNutrientValuesListOne = () => {
		let nutrientValues = [];
		for (let i = 0; i < 11; i++) {
			nutrientValues.push(
				<List.Item key={cuid()}>
					{this.capitalizeNutrientName(recommendedNutrients[i])}:{" "}
					{this.state[recommendedNutrients[i].slice(4)]}
				</List.Item>
			);
		}
		return nutrientValues;
	};

	createNutrientValuesListTwo = () => {
		let nutrientValues = [];
		for (let i = 11; i < recommendedNutrients.length; i++) {
			nutrientValues.push(
				<List.Item key={cuid()}>
					{this.capitalizeNutrientName(recommendedNutrients[i])}:{" "}
					{this.state[recommendedNutrients[i].slice(4)]}
				</List.Item>
			);
		}
		return nutrientValues;
	};

	createRecommendedNutrientForm = () => {
		let recommendedNutrientForm = [];
		for (let i = 0; i < recommendedNutrients.length; i++) {
			recommendedNutrientForm.push(
				<Grid.Column key={cuid()}>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label={this.capitalizeNutrientName(recommendedNutrients[i])}
							name={recommendedNutrients[i]}
							type="number"
							onChange={this.handleNutrientCountChange}
							placeholder={this.state[recommendedNutrients[i].slice(4)]}
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
											<List>{this.createNutrientValuesListOne()}</List>
										</Grid.Column>
										<Grid.Column>
											<List>{this.createNutrientValuesListTwo()}</List>
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
