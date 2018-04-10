import React from "react";
import { Form } from "semantic-ui-react";
import { postMessage } from "../actions/Actions";
import { connect } from "react-redux";

class NewMessage extends React.Component {
	state = {
		subject: "",
		body: ""
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.postMessage(
			{ subject: this.state.subject, body: this.state.body },
			this.props.currentUser,
			this.props.onClick
		);
		this.setState({
			subject: "",
			body: ""
		});
	};

	render() {
		return (
			<div>
				<Form onSubmit={this.handleSubmit}>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Subject"
							name="subject"
							value={this.state.subject}
							onChange={this.handleChange}
							placeholder="Subject..."
						/>
					</Form.Group>
					<Form.TextArea
						label="Body"
						name="body"
						value={this.state.body}
						onChange={this.handleChange}
						placeholder="Body..."
					/>
					<Form.Button>Submit</Form.Button>
				</Form>
			</div>
		);
	}
}

export default connect(
	state => {
		return { currentUser: state.currentUser, loggedIn: state.loggedIn };
	},
	{ postMessage }
)(NewMessage);
