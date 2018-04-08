import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Route, Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../components/Home";
import Messages from "../components/Messages";
import MealEntryForm from "../components/MealEntryForm";
import Nutritionists from "../components/Nutritionists";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import { getUser, logOut } from "../actions/Actions";

class UsersContainer extends React.Component {
	componentDidMount() {
		let jwt = localStorage.getItem("token");

		if (jwt && !this.props.currentUser) {
			this.props.getUser(jwt, this.props.history);
		}
	}

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
						<Route exact path="/journal" component={MealEntryForm} />
						<Route exact path="/messages" component={Messages} />
						<Route exact path="/nutritionist" component={Nutritionists} />
						<Route exact path="/signup" component={SignUp} />
						<Route exace path="/login" component={LogIn} />
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
		{ getUser, logOut }
	)(UsersContainer)
);
