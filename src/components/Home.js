import React from "react";
import { connect } from "react-redux";
import withAuth from "./authentication/WithAuth";
import { Dropdown, Header, Icon } from "semantic-ui-react";
import CalorieGraph from "./graphs/CalorieGraph";
import GramGraph from "./graphs/GramGraph";
import MilligramGraph from "./graphs/MilligramGraph";
import NutrientsThroughTime from "./graphs/NutrientsThroughTime";

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
				<button onClick={this.handleRecClick}>
					{this.state.recommendedValuesClicked ? "Hide" : "Show"} Rec Values
				</button>
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
