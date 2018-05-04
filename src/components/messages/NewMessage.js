import React from "react";
import { Form, Button } from "semantic-ui-react";
import { postMessage } from "../actions/messageActions";
import { connect } from "react-redux";

class NewMessage extends React.Component {
	state = {
		subject: "",
		body: "",
		client: ""
	};

	handleTextChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleDropdownChange = (e, v) => {
		this.setState({
			client: v.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.onSubmit();
		if (this.props.nutritionistLoggedIn) {
			this.props.postMessage(
				{
					clientId: this.state.client,
					subject: this.state.subject,
					body: this.state.body,
					parent_message: null
				},
				this.props.currentUser,
				this.props.nutritionistLoggedIn
			);
		} else {
			this.props.postMessage(
				{
					subject: this.state.subject,
					body: this.state.body,
					parent_message: null
				},
				this.props.currentUser,
				this.props.nutritionistLoggedIn
			);
		}

		this.setState({
			subject: "",
			body: "",
			client: ""
		});
	};

	options = () => {
		return this.props.clients.map(client => {
			return { key: client.name, text: client.name, value: client.id };
		});
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group widths="equal">
						{this.props.nutritionistLoggedIn ? (
							<Form.Select
								fluid
								label="Client"
								options={this.options()}
								placeholder="Client..."
								value={this.state.client}
								onChange={this.handleDropdownChange}
							/>
						) : null}
						<Form.Input
							fluid
							label="Subject"
							name="subject"
							value={this.state.subject}
							onChange={this.handleTextChange}
							placeholder="Subject..."
						/>
					</Form.Group>
					<Form.TextArea
						label="Body"
						name="body"
						value={this.state.body}
						onChange={this.handleTextChange}
						placeholder="Body..."
					/>
					<Button
						positive
						icon="checkmark"
						labelPosition="right"
						content="Send"
					/>
				</Form>
			</div>
		);
	}
}

export default connect(
	state => {
		return {
			currentUser: state.currentUser,
			loggedIn: state.loggedIn,
			nutritionistLoggedIn: state.nutritionistLoggedIn,
			clients: state.clients
		};
	},
	{ postMessage }
)(NewMessage);
