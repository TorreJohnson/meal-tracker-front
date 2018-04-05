import React from "react";
import { Menu, Segment } from "semantic-ui-react";
import Home from "../components/Home";
import Messages from "../components/Messages";
import MealEntryForm from "../components/MealEntryForm";

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
						name="home"
						active={activeItem === "home"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="messages"
						active={activeItem === "messages"}
						onClick={this.handleItemClick}
					/>
					<Menu.Item
						name="diary"
						active={activeItem === "diary"}
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
						{this.state.activeItem === "home" ? (
							<Home store={this.props.store} />
						) : null}
						{this.state.activeItem === "messages" ? <Messages /> : null}
						{this.state.activeItem === "diary" ? <MealEntryForm /> : null}
					</div>
				</Segment>
			</div>
		);
	}
}

export default UsersContainer;
