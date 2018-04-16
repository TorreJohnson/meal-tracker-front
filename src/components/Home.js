import React from "react";
import { connect } from "react-redux";
import withAuth from "./authentication/WithAuth";
import { Input, Label, Menu, Grid, Icon } from "semantic-ui-react";
import CalorieGraph from "./graphs/CalorieGraph";
import GramGraph from "./graphs/GramGraph";
import MilligramGraph from "./graphs/MilligramGraph";
import RadarGraph from "./graphs/RadarGraph";
import NutrientsThroughTime from "./graphs/NutrientsThroughTime";
import NutritionistPage from "./nutritionistMarket/NutritionistPage";

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
				filter: name
			});
		} else if (name === "mrv") {
			this.setState({
				recommendedValuesClicked: !this.state.recommendedValuesClicked
			});
		} else {
			this.setState({
				activeItem: name
			});
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
										<Icon name="calendar" />
									</Label>
								) : (
									<Label>
										<Icon name="calendar" />
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
										<Icon name="calendar" />
									</Label>
								) : (
									<Label>
										<Icon name="calendar" />
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
										<Icon name="calendar" />
									</Label>
								) : (
									<Label>
										<Icon name="calendar" />
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
								<Input icon="search" placeholder="Search Nutrients..." />
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={13}>
						{this.state.activeItem === "nutritionist" ? (
							<NutritionistPage nutritionist={this.state.nutritionist} />
						) : (
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
								<NutrientsThroughTime
									filter={this.state.filter}
									recValues={this.state.recommendedValuesClicked}
								/>
							</div>
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
