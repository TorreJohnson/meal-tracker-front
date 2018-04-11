import React from "react";
import {
	Card,
	Icon,
	Segment,
	Button,
	Header,
	Image,
	Modal,
	Form,
	TextArea
} from "semantic-ui-react";
import { connect } from "react-redux";

class MessageCard extends React.Component {
	state = {
		body: `${this.props.message.body}\n\n`
	};

	handleClick = () => {
		console.log("clicked");
	};

	handleChange = e => {
		this.setState({
			body: e.target.value
		});
	};

	filterChildMessages = () => {
		return this.props.currentUser.messages.filter(
			message => message.id === this.props.parent_message
		);
	};

	formatChildMessages = () => {
		return this.filterChildMessages().map(message => {
			return (
				<Segment>
					<Card fluid>
						<Card.Content header={message.subject} />
						<Card.Content description={message.body} />
						<Modal
							trigger={
								<Card.Content extra>
									<Icon name="reply" />Reply
								</Card.Content>
							}
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
		console.log(this.props.message, this.props.currentUser.messages);
		return (
			<div>
				<Segment.Group>
					<Segment>
						<Card centered fluid>
							<Card.Content header={this.props.message.subject} />
							<Card.Content description={this.props.message.body} />
							<Modal
								trigger={
									<Card.Content extra>
										<Icon name="reply" />Reply
									</Card.Content>
								}
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

export default connect(state => {
	return { currentUser: state.currentUser };
})(MessageCard);
