import React from "react";
import { logIn } from "../actions/authActions";
import { connect } from "react-redux";
import { Button, Form, Segment, Dimmer, Loader } from "semantic-ui-react";

class LogIn extends React.Component {
	state = {
		username: "",
		password: "",
		loading: false
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		this.props.logIn(
			this.state.username,
			null,
			this.state.password,
			this.props.history
		);
	};

	render() {
		return (
			<div className="login-box">
				<Segment>
					{this.state.loading ? (
						<Dimmer active>
							<Loader>Loading</Loader>
						</Dimmer>
					) : null}
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
						<Button type="submit" basic color="green">
							Submit
						</Button>
					</Form>
				</Segment>
			</div>
		);
	}
}

export default connect(null, { logIn })(LogIn);
