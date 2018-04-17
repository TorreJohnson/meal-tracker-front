import React from "react";
import { connect } from "react-redux";
import { Modal, Input, Label, Menu, Grid, Message } from "semantic-ui-react";
import MessageCard from "./MessageCard";
import NewMessage from "./NewMessage";
import cuid from "cuid";

class Messages extends React.Component {
	state = {
		modalOpen: false,
		activeItem: "inbox",
		searchTerm: ""
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

	getUnreadMessageCount = () => {
		if (this.props.nutritionistLoggedIn) {
			return this.props.currentUser.messages.filter(
				message => message.sender_type === "user" && !message.read
			).length;
		} else {
			return this.props.currentUser.messages.filter(
				message => message.sender_type === "nutritionist" && !message.read
			).length;
		}
	};

	getInboxMessageCount = () => {
		if (this.props.nutritionistLoggedIn) {
			return this.props.currentUser.messages.filter(
				message => message.sender_type === "user"
			).length;
		} else {
			return this.props.currentUser.messages.filter(
				message => message.sender_type === "nutritionist"
			).length;
		}
	};

	getSentMessageCount = () => {
		if (this.props.nutritionistLoggedIn) {
			return this.props.currentUser.messages.filter(
				message => message.sender_type === "nutritionist"
			).length;
		} else {
			return this.props.currentUser.messages.filter(
				message => message.sender_type === "user"
			).length;
		}
	};

	handleOpen = () => {
		this.setState({
			modalOpen: true
		});
	};

	handleClose = () => {
		this.setState({
			modalOpen: false
		});
	};

	handleActiveMailboxFolder = (e, { name }) => {
		this.setState({
			activeItem: name
		});
	};

	handleSearchInputChange = e => {
		this.setState({
			searchTerm: e.target.value
		});
	};

	filterMessagesForSearchTerms = () => {
		return this.props.currentUser.messages.filter(
			message =>
				message.subject
					.toLowerCase()
					.includes(this.state.searchTerm.toLowerCase()) ||
				message.body.toLowerCase().includes(this.state.searchTerm.toLowerCase())
		);
	};

	filterMessages = () => {
		let reversedMessages = this.filterMessagesForSearchTerms().reverse();
		if (this.state.activeItem === "inbox" && this.props.nutritionistLoggedIn) {
			return reversedMessages.filter(message => message.sender_type === "user");
		} else if (this.state.activeItem === "inbox") {
			return reversedMessages.filter(
				message => message.sender_type === "nutritionist"
			);
		} else if (
			this.state.activeItem === "unread" &&
			this.props.nutritionistLoggedIn
		) {
			return reversedMessages.filter(
				message => !message.read && message.sender_type === "user"
			);
		} else if (this.state.activeItem === "unread") {
			return reversedMessages.filter(
				message => !message.read && message.sender_type === "nutritionist"
			);
		} else if (
			this.state.activeItem === "sent" &&
			this.props.nutritionistLoggedIn
		) {
			return reversedMessages.filter(
				message => message.sender_type === "nutritionist"
			);
		} else if (this.state.activeItem === "sent") {
			return reversedMessages.filter(message => message.sender_type === "user");
		}
	};

	messageCards = () => {
		if (this.filterMessages().length === 0) {
			return <Message floating>No Messages Found</Message>;
		} else {
			return this.filterMessages().map(message => (
				<MessageCard message={message} key={cuid()} />
			));
		}
	};

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Grid>
					<Grid.Column width={3}>
						<Menu fluid vertical>
							<Menu.Item
								name="inbox"
								active={activeItem === "inbox"}
								onClick={this.handleActiveMailboxFolder}
							>
								{this.state.activeItem === "inbox" ? (
									<Label color="teal">{this.getInboxMessageCount()}</Label>
								) : (
									<Label>{this.getInboxMessageCount()}</Label>
								)}
								Inbox
							</Menu.Item>

							<Menu.Item
								name="unread"
								active={activeItem === "unread"}
								onClick={this.handleActiveMailboxFolder}
							>
								{this.state.activeItem === "unread" ? (
									<Label color="teal">{this.getUnreadMessageCount()}</Label>
								) : (
									<Label>{this.getUnreadMessageCount()}</Label>
								)}
								Unread
							</Menu.Item>

							<Menu.Item
								name="sent"
								active={activeItem === "sent"}
								onClick={this.handleActiveMailboxFolder}
							>
								{" "}
								{this.state.activeItem === "sent" ? (
									<Label color="teal">{this.getSentMessageCount()}</Label>
								) : (
									<Label>{this.getSentMessageCount()}</Label>
								)}
								Sent
							</Menu.Item>
							<Modal
								trigger={
									<Menu.Item
										name="send"
										active={activeItem === "send"}
										onClick={this.handleOpen}
									>
										Send New Message
									</Menu.Item>
								}
								open={this.state.modalOpen}
								onClose={this.handleClose}
							>
								<Modal.Header>New Message</Modal.Header>
								<NewMessage onSubmit={this.handleClose} />
							</Modal>
							<Menu.Item>
								<Input
									icon="search"
									onChange={this.handleSearchInputChange}
									value={this.state.searchTerm}
									placeholder="Search messages..."
								/>
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={13}>{this.messageCards()}</Grid.Column>
				</Grid>
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
})(Messages);
