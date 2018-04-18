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
import { postMessage, updateReadMessage } from "../actions/Actions";

class MessageCard extends React.Component {
	state = {
		body: "",
		open: false
	};

	show = dimmer => () => this.setState({ dimmer, open: true });
	close = () => this.setState({ open: false });

	handleReplyClick = e => {
		e.preventDefault();
		this.close();
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

	handleReadClick = () => {
		this.props.updateReadMessage(
			{
				id: this.props.message.id,
				read: !this.props.message.read
			},
			localStorage.getItem("token")
		);
	};

	handleChange = e => {
		this.setState({
			body: e.target.value
		});
	};

	render() {
		const { open, dimmer } = this.state;
		return (
			<div>
				<Segment id="featured">
					<Card centered fluid>
						<Card.Content header={this.props.message.subject} />
						<Card.Content description={this.props.message.body} />
						<Card.Content extra>
							<Button animated onClick={this.handleReadClick}>
								<Button.Content visible>
									{this.props.message.read ? "Mark as Unread" : "Mark as Read"}
								</Button.Content>
								<Button.Content hidden>
									<Icon name="checkmark box" />
								</Button.Content>
							</Button>
							<Button animated onClick={this.show("blurring")}>
								<Button.Content visible>Reply</Button.Content>
								<Button.Content hidden>
									<Icon name="reply" />
								</Button.Content>
							</Button>
							<Modal dimmer={dimmer} open={open} onClose={this.close}>
								<Modal.Header>Message Reply</Modal.Header>
								<Modal.Content>
									<Modal.Description>
										<Header>re: {this.props.message.subject}</Header>
										<Form>
											<TextArea
												value={this.state.body}
												onChange={this.handleChange}
											/>
											<Button
												positive
												icon="checkmark"
												labelPosition="right"
												content="Send"
												onClick={this.handleReplyClick}
											/>
										</Form>
									</Modal.Description>
								</Modal.Content>
							</Modal>
						</Card.Content>
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
	{ postMessage, updateReadMessage }
)(MessageCard);
