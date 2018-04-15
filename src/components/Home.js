import React from "react";
import { connect } from "react-redux";
import withAuth from "./authentication/WithAuth";
import {
	Dropdown,
	Header,
	Icon,
	Input,
	Label,
	Menu,
	Grid
} from "semantic-ui-react";
import CalorieGraph from "./graphs/CalorieGraph";
import GramGraph from "./graphs/GramGraph";
import MilligramGraph from "./graphs/MilligramGraph";
import NutrientsThroughTime from "./graphs/NutrientsThroughTime";

class Home extends React.Component {
	state = {
		filter: "Daily",
		recommendedValuesClicked: false,
		activeItem: "daily"
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

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

	handleRecClick = () => {
		this.setState({
			recommendedValuesClicked: !this.state.recommendedValuesClicked
		});
	};

	handleItemClick = (e, { name }) => {
		if (name === "Daily" || name === "Weekly" || name === "Monthly") {
			this.setState({
				activeItem: name,
				filter: name
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
				<button onClick={this.handleRecClick}>
					{this.state.recommendedValuesClicked ? "Hide" : "Show"} Rec Values
				</button>
				<Grid>
					<Grid.Column width={3}>
						<Menu fluid vertical>
							<Menu.Item
								name="Daily"
								active={activeItem === "Daily"}
								onClick={this.handleItemClick}
							>
								<Label color="teal">1</Label>
								Today
							</Menu.Item>

							<Menu.Item
								name="Weekly"
								active={activeItem === "Weekly"}
								onClick={this.handleItemClick}
							>
								<Label>51</Label>
								Last Week
							</Menu.Item>
							<Menu.Item
								name="Monthly"
								active={activeItem === "Monthly"}
								onClick={this.handleItemClick}
							>
								<Label>51</Label>
								Last Month
							</Menu.Item>

							<Menu.Item
								name="nutritionist"
								active={activeItem === "nutritionist"}
								onClick={this.handleItemClick}
							>
								<Label>1</Label>
								Your Nutritionist
							</Menu.Item>
							<Menu.Item>
								<Input icon="search" placeholder="Search Nutrients..." />
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={13}>
						<CalorieGraph
							filter={this.state.filter}
							recValues={this.state.recommendedValuesClicked}
						/>
						<GramGraph
							filter={this.state.filter}
							recValues={this.state.recommendedValuesClicked}
						/>
						<MilligramGraph
							filter={this.state.filter}
							recValues={this.state.recommendedValuesClicked}
						/>
						<NutrientsThroughTime
							filter={this.state.filter}
							recValues={this.state.recommendedValuesClicked}
						/>
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
