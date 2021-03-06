import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withAuth from "../authentication/WithAuth";
import Messages from "../messages/Messages";
import { logOut } from "../actions/authActions";
import { fetchClients } from "../actions/getUserActions";
import ClientsList from "../nutritionists/ClientsList";

class NutritionistsContainer extends React.Component {
	state = {
		activeItem: "home"
	};

	componentDidMount() {
		let jwt = localStorage.getItem("token");
		this.props.fetchClients(this.props.currentUser.id, jwt);
	}

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	handleLogOutClick = () => {
		this.props.logOut(this.props.history);
	};

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Menu pointing className="fixed-nav-bar">
					<Menu.Item
						as={Link}
						to="/"
						name="home"
						onClick={this.handleItemClick}
					>
						<img src="./004-bars-chart.png" alt="meal tracker logo" />
						<strong> MealTracker</strong>
					</Menu.Item>
					<Menu.Item
						as={Link}
						to="/"
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

				<Segment id="main-container">
					<div>
						<Route exact path="/" component={ClientsList} />
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
	)(withAuth(NutritionistsContainer))
);
