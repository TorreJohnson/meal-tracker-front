import React from "react";
import { connect } from "react-redux";
import CalorieGraph from "./graphs/CalorieGraph";
import GroupOneBarGraph from "./graphs/groupOneBarGraph";
import GroupTwoBarGraph from "./graphs/groupTwoBarGraph";
import GroupThreeBarGraph from "./graphs/groupThreeBarGraph";
import GroupOnePercentageOfRecValues from "./graphs/groupOnePercentageOfRecValues";
import GroupTwoPercentageOfRecValues from "./graphs/groupTwoPercentageOfRecValues";
import NutrientsThroughTime from "./graphs/NutrientsThroughTime";
import NutritionistPage from "./nutritionistMarket/NutritionistPage";
import { NutrientDefinitions } from "./nutrients/NutrientDefinitions";
import NutrientProgressBar from "./graphs/NutrientProgressBar";
import {
	capitalizedNutrients,
	snakeCasedNutrients
} from "./nutrients/NutrientLists";
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
		if (this.props.currentUser.nutritionist_id) {
			this.fetchNutritionist();
		}
	}

	fetchNutritionist = () => {
		fetch(
			`https://peaceful-beyond-60313.herokuapp.com/api/v1/nutritionists/${
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
				searchInput: "",
				recommendedValuesClicked: false
			});
		}
	};

	handleSearchInputChange = (e, v) => {
		this.setState({
			searchInput: v.value,
			activeItem: ""
		});
	};

	nutrientOptions = () => {
		let nutrientOptions = [];
		for (let i = 0; i < capitalizedNutrients.length; i++) {
			nutrientOptions.push({
				key: capitalizedNutrients[i],
				text: capitalizedNutrients[i],
				value: snakeCasedNutrients[i]
			});
		}
		return nutrientOptions;
	};

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
								<Grid.Row>
									<Grid.Column width={16}>
										<NutrientsThroughTime
											filter={this.state.filter}
											recValues={this.state.recommendedValuesClicked}
											nutrient={this.state.searchInput}
										/>
										<NutrientProgressBar
											recValues={this.state.recommendedValuesClicked}
											nutrient={this.state.searchInput}
										/>
									</Grid.Column>
								</Grid.Row>
							</Grid>
						</Segment>
					</div>
				</div>
			);
		} else {
			return (
				<div>
					<Segment padded>
						<Grid>
							<Grid.Row>
								<Grid.Column>
									<CalorieGraph
										filter={this.state.filter}
										recValues={this.state.recommendedValuesClicked}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<GroupOneBarGraph
										filter={this.state.filter}
										recValues={this.state.recommendedValuesClicked}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<GroupTwoBarGraph
										filter={this.state.filter}
										recValues={this.state.recommendedValuesClicked}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<GroupThreeBarGraph
										filter={this.state.filter}
										recValues={this.state.recommendedValuesClicked}
									/>
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<GroupOnePercentageOfRecValues filter={this.state.filter} />
								</Grid.Column>
							</Grid.Row>
							<Grid.Row>
								<Grid.Column>
									<GroupTwoPercentageOfRecValues filter={this.state.filter} />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Segment>
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
						<Menu fluid vertical className="fixed-side-bar">
							<Menu.Item
								name="Daily"
								active={activeItem === "Daily"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "Daily" ? (
									<Label color="green">
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
									<Label color="green">
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
									<Label color="green">
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
									<Label color="green">
										<Icon />
									</Label>
								) : (
									<Label>
										<Icon />
									</Label>
								)}
								Maximum Recommended Amount
							</Menu.Item>
							<Menu.Item
								name="nutritionist"
								active={activeItem === "nutritionist"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "nutritionist" ? (
									<Label color="green">
										<Icon />
									</Label>
								) : (
									<Label>
										<Icon />
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
					<Grid.Column width={10}>
						{this.state.activeItem === "nutritionist" ? (
							<NutritionistPage
								nutritionist={this.state.nutritionist}
								filter={this.state.filter}
								recValues={this.state.recommendedValuesClicked}
							/>
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
})(Home);
