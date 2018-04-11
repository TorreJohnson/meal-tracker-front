import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../Home";
import Messages from "../messages/Messages";
import FoodItemEntryForm from "../foodItems/FoodItemEntryForm";
import Nutritionists from "../nutritionistMarket/Nutritionists";
import { logOut } from "../actions/Actions";

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
				<Menu pointing>
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
							name="logout"
							active={activeItem === "logout"}
							onClick={this.handleLogOutClick}
						/>
					</Menu.Menu>
				</Menu>

				<Segment>
					<div>
						<Route exact path="/" component={Home} />
						<Route exact path="/journal" component={FoodItemEntryForm} />
						<Route exact path="/messages" component={Messages} />
						<Route exact path="/nutritionist" component={Nutritionists} />
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
	)(UsersContainer)
);
