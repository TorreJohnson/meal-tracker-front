import React from "react";
import { connect } from "react-redux";
import withAuth from "./authentication/WithAuth";
import CalorieGraph from "./graphs/CalorieGraph";
import GramGraph from "./graphs/GramGraph";
import MilligramGraph from "./graphs/MilligramGraph";
import RadarGraph from "./graphs/RadarGraph";
import NutrientsThroughTime from "./graphs/NutrientsThroughTime";
import NutritionistPage from "./nutritionistMarket/NutritionistPage";
import { NutrientDefinitions } from "./nutrients/NutrientDefinitions";
import cuid from "cuid";
import {
	Label,
	Menu,
	Grid,
	Icon,
	Dropdown,
	Segment,
	Header,
	List
} from "semantic-ui-react";

class Home extends React.Component {
	state = {
		filter: "Daily",
		recommendedValuesClicked: false,
		activeItem: "Daily",
		nutritionist: {},
		searchInput: ""
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
		this.fetchNutritionist();
	}

	fetchNutritionist = () => {
		fetch(
			`http://localhost:3000/api/v1/nutritionists/${
				this.props.currentUser.nutritionist_id
			}`,
			{
				"Content-Type": "application/json",
				accept: "application/json"
			}
		)
			.then(res => res.json())
			.then(result => {
				this.setState({
					nutritionist: result
				});
			});
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
			filter: v.value
		});
	};

	handleItemClick = (e, { name }) => {
		if (name === "Daily" || name === "Weekly" || name === "Monthly") {
			this.setState({
				activeItem: name,
				filter: name,
				searchInput: ""
			});
		} else if (name === "mrv") {
			this.setState({
				recommendedValuesClicked: !this.state.recommendedValuesClicked
			});
		} else {
			this.setState({
				activeItem: name,
				searchInput: ""
			});
		}
	};

	handleSearchInputChange = (e, v) => {
		this.setState({
			searchInput: v.value,
			activeItem: ""
		});
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

	toggleBetweenNutrientsAndGraphs = () => {
		if (this.state.searchInput.length) {
			return (
				<div>
					<div>
						<Segment padded>
							<Grid>
								<Grid.Row>
									<Grid.Column width={1} />
									<Grid.Column width={14}>
										<Header as="h1">
											{NutrientDefinitions[this.state.searchInput].name}
										</Header>
										<Header as="h3">
											{NutrientDefinitions[this.state.searchInput].text}
										</Header>
										<Header as="h3">
											{NutrientDefinitions[this.state.searchInput].text.foods}
										</Header>
										<p>{}</p>
									</Grid.Column>
									<Grid.Column width={1} />
								</Grid.Row>
								<Grid.Row>
									<Grid.Column width={1} />
									<Grid.Column width={7}>
										<Header as="h2">Fun Facts</Header>
										<List bulleted>
											{NutrientDefinitions[this.state.searchInput].benefitList
												.split(". ")
												.map(sentence => (
													<List.Item key={cuid()}>{sentence}</List.Item>
												))}
										</List>
									</Grid.Column>
									<Grid.Column width={7}>
										<Header as="h2">
											Foods high in{" "}
											{this.state.searchInput
												.split("_")
												.map(word => word[0].toUpperCase() + word.slice(1))
												.join(" ")}
										</Header>
										<List bulleted>
											{NutrientDefinitions[this.state.searchInput].foods.map(
												food => <List.Item key={cuid()}>{food}</List.Item>
											)}
										</List>
									</Grid.Column>
									<Grid.Column width={1} />
								</Grid.Row>
							</Grid>
						</Segment>
					</div>
					<NutrientsThroughTime
						filter={this.state.filter}
						recValues={this.state.recommendedValuesClicked}
						nutrient={this.state.searchInput}
					/>
				</div>
			);
		} else {
			return (
				<div>
					<CalorieGraph
						filter={this.state.filter}
						recValues={this.state.recommendedValuesClicked}
					/>
					<div>
						<Grid>
							<Grid.Row>
								<Grid.Column width={8}>
									<MilligramGraph
										filter={this.state.filter}
										recValues={this.state.recommendedValuesClicked}
									/>
								</Grid.Column>
								<Grid.Column width={8}>
									<GramGraph
										filter={this.state.filter}
										recValues={this.state.recommendedValuesClicked}
									/>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</div>

					<RadarGraph
						filter={this.state.filter}
						recValues={this.state.recommendedValuesClicked}
					/>
				</div>
			);
		}
	};

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Grid>
					<Grid.Column width={3}>
						<Menu fluid vertical>
							<Menu.Item
								name="Daily"
								active={activeItem === "Daily"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "Daily" ? (
									<Label color="teal">
										<Icon name="calendar outline" /> 1
									</Label>
								) : (
									<Label>
										<Icon name="calendar outline" /> 1
									</Label>
								)}
								Today
							</Menu.Item>

							<Menu.Item
								name="Weekly"
								active={activeItem === "Weekly"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "Weekly" ? (
									<Label color="teal">
										<Icon name="calendar outline" /> 7
									</Label>
								) : (
									<Label>
										<Icon name="calendar outline" /> 7
									</Label>
								)}
								Last Week
							</Menu.Item>
							<Menu.Item
								name="Monthly"
								active={activeItem === "Monthly"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "Monthly" ? (
									<Label color="teal">
										<Icon name="calendar outline" /> 30
									</Label>
								) : (
									<Label>
										<Icon name="calendar outline" /> 30
									</Label>
								)}
								Last Month
							</Menu.Item>
							<Menu.Item
								name="mrv"
								active={activeItem === "mrv"}
								onClick={this.handleItemClick}
							>
								{this.state.recommendedValuesClicked ? (
									<Label color="teal" />
								) : (
									<Label />
								)}
								Maximum Recommended Values
							</Menu.Item>
							<Menu.Item
								name="nutritionist"
								active={activeItem === "nutritionist"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "nutritionist" ? (
									<Label color="teal">
										<Icon name="calendar" />
									</Label>
								) : (
									<Label>
										<Icon name="calendar" />
									</Label>
								)}
								Your Nutritionist
							</Menu.Item>
							<Menu.Item>
								<Dropdown
									placeholder="Search Nutrients..."
									fluid
									search
									selection
									onChange={this.handleSearchInputChange}
									value={this.state.searchInput}
									options={this.nutrientOptions}
								/>
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={13}>
						{this.state.activeItem === "nutritionist" ? (
							<NutritionistPage nutritionist={this.state.nutritionist} />
						) : (
							<this.toggleBetweenNutrientsAndGraphs />
						)}
					</Grid.Column>
				</Grid>
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
