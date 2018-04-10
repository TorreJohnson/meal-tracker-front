import React from "react";
import { connect } from "react-redux";
import withAuth from "../authentication/WithAuth";
import { Button } from "semantic-ui-react";
import { MessageCard } from "./MessageCard";
import NewMessage from "./NewMessage";
import cuid from "cuid";

class Messages extends React.Component {
	state = {
		composeMessage: false
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

	messageCards = () => {
		return this.props.currentUser.messages.map(message => (
			<MessageCard message={message} key={cuid()} />
		));
	};

	handleClick = () => {
		this.setState({
			composeMessage: !this.state.composeMessage
		});
	};

	render() {
		return (
			<div>
				{this.state.composeMessage ? (
					<NewMessage onClick={this.handleClick} />
				) : (
					<div>
						<Button onClick={this.handleClick}>New Message</Button>
						{this.messageCards()}
					</div>
				)}
			</div>
		);
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(withAuth(Messages));
