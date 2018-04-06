import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import { Route, Link } from "react-router-dom";
import Home from "../components/Home";
import Messages from "../components/Messages";
import MealEntryForm from "../components/MealEntryForm";
import Nutritionists from "../components/Nutritionists";
import SignUp from "../components/SignUp";

class UsersContainer extends React.Component {
	state = {
		activeItem: "home"
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

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
							onClick={this.handleItemClick}
						/>
					</Menu.Menu>
				</Menu>

				<Segment>
					<div>
						<Route exact path="/" component={Home} />
						<Route exact path="/journal" component={MealEntryForm} />
						<Route exact path="/messages" component={Messages} />
						<Route exact path="/nutritionist" component={Nutritionists} />
						<Route exact path="/login" component={SignUp} />
					</div>
				</Segment>
			</div>
		);
	}
}

export default UsersContainer;
