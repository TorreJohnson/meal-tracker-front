import React from "react";
import {
	Card,
	Icon,
	Segment,
	Button,
	Header,
	Modal,
	Form,
	TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";
import { postMessage } from "../actions/Actions";
import withAuth from "../authentication/WithAuth";

class MessageCard extends React.Component {
	state = {
		body: "",
		modalOpen: false
	};

	handleOpen = () => this.setState({ modalOpen: true });

	handleClose = () => this.setState({ modalOpen: false });

	handleClick = () => {
		this.setState({ modalOpen: false });
		if (this.props.nutritionistLoggedIn) {
			this.props.postMessage(
				{
					clientId: this.props.message.user_id,
					subject: `re: ${this.props.message.subject}`,
					body: this.state.body,
					parent_message: this.props.message.id
				},
				this.props.currentUser,
				this.props.nutritionistLoggedIn
			);
		} else {
			this.props.postMessage(
				{
					subject: `re: ${this.props.message.subject}`,
					body: this.state.body,
					parent_message: this.props.message.id
				},
				this.props.currentUser,
				this.props.nutritionistLoggedIn
			);
		}
		this.setState({
			body: ""
		});
	};

	handleChange = e => {
		this.setState({
			body: e.target.value
		});
	};

	filterChildMessages = () => {
		return this.props.currentUser.messages.filter(
			message => this.props.message.id === message.parent_message
		);
	};

	formatChildMessages = () => {
		return this.filterChildMessages().map(message => {
			return (
				<Segment>
					<Card>
						<Card.Content header={message.subject} />
						<Card.Content description={message.body} />
						<Modal
							trigger={
								<Card.Content extra onClick={this.handleOpen}>
									<Icon name="reply" />Reply
								</Card.Content>
							}
							open={this.state.modalOpen}
							onClose={this.handleClose}
						>
							<Modal.Header>Message Reply</Modal.Header>
							<Modal.Description>
								<Header>{this.props.message.subject}</Header>
								<Form>
									<TextArea
										value={this.state.body}
										onChange={this.handleChange}
									/>
								</Form>
								<Button onClick={this.handleClick}>Send</Button>
							</Modal.Description>
						</Modal>
						<Card.Content extra>
							<Icon name="mail outline" />
							Sent at{" "}
							{message.created_at
								.split("T")[1]
								.split(".")[0]
								.slice(0, 5)}{" "}
							on {message.created_at.split("T")[0]}
						</Card.Content>
					</Card>
				</Segment>
			);
		});
	};

	render() {
		return (
			<div>
				<Segment.Group>
					<Segment>
						<Card centered fluid>
							<Card.Content header={this.props.message.subject} />
							<Card.Content description={this.props.message.body} />
							<Modal
								trigger={
									<Card.Content extra onClick={this.handleOpen}>
										<Icon name="reply" />Reply
									</Card.Content>
								}
								open={this.state.modalOpen}
								onClose={this.handleClose}
							>
								<Modal.Header>Message Reply</Modal.Header>
								<Modal.Description>
									<Header>{this.props.message.subject}</Header>
									<Form>
										<TextArea
											value={this.state.body}
											onChange={this.handleChange}
										/>
									</Form>
									<Button onClick={this.handleClick}>Send</Button>
								</Modal.Description>
							</Modal>
							<Card.Content extra>
								<Icon name="mail outline" />
								Sent at{" "}
								{this.props.message.created_at
									.split("T")[1]
									.split(".")[0]
									.slice(0, 5)}{" "}
								on {this.props.message.created_at.split("T")[0]}
							</Card.Content>
						</Card>
					</Segment>
					{this.formatChildMessages().length ? (
						<Segment.Group>{this.formatChildMessages()}</Segment.Group>
					) : null}
				</Segment.Group>
			</div>
		);
	}
}

export default connect(
	state => {
		return {
			currentUser: state.currentUser,
			loggedIn: state.loggedIn,
			nutritionistLoggedIn: state.nutritionistLoggedIn
		};
	},
	{ postMessage }
)(withAuth(MessageCard));
