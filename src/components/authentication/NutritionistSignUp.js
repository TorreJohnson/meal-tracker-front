import React from "react";
import { logIn } from "../actions/Actions";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";

class NutritionistSignUp extends React.Component {
	state = {
		username: "",
		password: ""
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.logIn(
			this.state.username,
			this.state.password,
			this.props.history
		);
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Field>
					<label>Username</label>
					<input
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
						placeholder="Username..."
					/>
				</Form.Field>
				<Form.Field>
					<label>Password</label>
					<input
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						placeholder="Password..."
					/>
				</Form.Field>
				<Button type="submit">Submit</Button>
			</Form>
		);
	}
}

export default connect(null, { logIn })(NutritionistSignUp);
