import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Messages from "../messages/Messages";
import { logOut, fetchClients } from "../actions/Actions";
import ClientsList from "../nutritionists/ClientsList";

class NutritionistsContainer extends React.Component {
	state = {
		activeItem: "home"
	};

	componentDidMount() {
		this.props.fetchClients(this.props.currentUser.id);
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handleLogOutClick = () => {
		this.props.logOut(this.props.history);
	};

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Menu pointing>
					<Menu.Item
						as={Link}
						to="/nutritionists/"
						name="home"
						active={activeItem === "home"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						as={Link}
						to="/nutritionists/messages"
						name="messages"
						active={activeItem === "messages"}
						onClick={this.handleItemClick}
					/>
					<Menu.Menu position="right">
						<Menu.Item
							name="logout"
							active={activeItem === "logout"}
							onClick={this.handleLogOutClick}
						/>
					</Menu.Menu>
				</Menu>

				<Segment>
					<div>
						<Route exact path="/nutritionists/" component={ClientsList} />
						<Route exact path="/nutritionists/messages" component={Messages} />
					</div>
				</Segment>
			</div>
		);
	}
}

export default withRouter(
	connect(
		state => {
			return {
				currentUser: state.currentUser,
				loggedIn: state.loggedIn,
				nutritionistLoggedIn: state.nutritionistLoggedIn
			};
		},
		{ logOut, fetchClients }
	)(NutritionistsContainer)
);
