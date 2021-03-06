import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import withAuth from "../authentication/WithAuth";
import Home from "../Home";
import Messages from "../messages/Messages";
import FoodItemEntryForm from "../journal/FoodItemEntryForm";
import Nutritionists from "../nutritionistMarket/Nutritionists";
import { logOut } from "../actions/authActions";
import Profile from "../profile/Profile";

class UsersContainer extends React.Component {
	state = {
		activeItem: "home"
	};

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
						to="/journal"
						name="journal"
						active={activeItem === "journal"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						as={Link}
						to="/messages"
						name="messages"
						active={activeItem === "messages"}
						onClick={this.handleItemClick}
					/>

					<Menu.Item
						as={Link}
						to="/nutritionist"
						name="nutritionists"
						active={activeItem === "nutritionists"}
						onClick={this.handleItemClick}
					/>
					<Menu.Menu position="right">
						<Menu.Item
							as={Link}
							to="/profile"
							name="profile"
							active={activeItem === "profile"}
							onClick={this.handleItemClick}
						/>
						<Menu.Item
							name="logout"
							active={activeItem === "logout"}
							onClick={this.handleLogOutClick}
						/>
					</Menu.Menu>
				</Menu>

				<Segment id="main-container">
					<div>
						<Route exact path="/" component={Home} />
						<Route exact path="/journal" component={FoodItemEntryForm} />
						<Route exact path="/messages" component={Messages} />
						<Route exact path="/nutritionist" component={Nutritionists} />
						<Route exact path="/profile" component={Profile} />
					</div>
				</Segment>
			</div>
		);
	}
}

export default withRouter(
	connect(
		state => {
			return { currentUser: state.currentUser, loggedIn: state.loggedIn };
		},
		{ logOut }
	)(withAuth(UsersContainer))
);
