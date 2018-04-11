import React from "react";
import { connect } from "react-redux";
import withAuth from "../authentication/WithAuth";
import { Button, Modal } from "semantic-ui-react";
import MessageCard from "./MessageCard";
import NewMessage from "./NewMessage";
import cuid from "cuid";

class Messages extends React.Component {
	state = {
		modalOpen: false
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

	filterParentMessages = () => {
		if (this.props.nutritionistLoggedIn) {
			return this.filterSentMessages().filter(
				message =>
					message.parent_message === null || message.sender_type === "user"
			);
		} else {
			return this.filterSentMessages().filter(
				message =>
					message.parent_message === null ||
					message.sender_type === "nutritionist"
			);
		}
	};

	filterSentMessages = () => {
		let reversedMessages = [...this.props.currentUser.messages].reverse();
		if (this.props.nutritionistLoggedIn) {
			return reversedMessages.filter(message => message.sender_type === "user");
		} else {
			return reversedMessages.filter(
				message => message.sender_type === "nutritionist"
			);
		}
	};

	messageCards = () => {
		return this.filterParentMessages().map(message => (
			<MessageCard message={message} key={cuid()} />
		));
	};

	render() {
		return (
			<div>
				<Modal
					trigger={<Button onClick={this.handleOpen}>New Message</Button>}
					open={this.state.modalOpen}
					onClose={this.handleClose}
				>
					<Modal.Header>New Message</Modal.Header>
					<NewMessage onSubmit={this.handleClose} />
				</Modal>
				<div>{this.messageCards()}</div>
			</div>
		);
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn,
		nutritionistLoggedIn: state.nutritionistLoggedIn
	};
})(withAuth(Messages));
