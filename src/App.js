import React, { Component } from "react";
import "./App.css";
import { Input, Menu, Segment } from "semantic-ui-react";
import Home from "./Home";

class App extends Component {
	state = { activeItem: "home" };
	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	render() {
		const { activeItem } = this.state;
		return (
			<div className="App">
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
							name="friends"
							active={activeItem === "friends"}
							onClick={this.handleItemClick}
						/>
						<Menu.Menu position="right">
							<Menu.Item>
								<Input icon="search" placeholder="Search..." />
							</Menu.Item>
						</Menu.Menu>
					</Menu>

					<Segment>
						<div>
							<Home store={this.props.store} />
						</div>
					</Segment>
				</div>
			</div>
		);
	}
}

export default App;
