import React from "react";
import { connect } from "react-redux";
import withAuth from "./WithAuth";
import { Button } from "semantic-ui-react";
import { MessageCard } from "./MessageCard";
import NewMessage from "./NewMessage";

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
			<MessageCard message={message} />
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
					<div>
						<NewMessage />
						{this.messageCards()}
					</div>
				) : (
					<Button onClick={this.handleClick}>New Message</Button>
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
