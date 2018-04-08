import React from "react";
import { signUp } from "../actions/Actions";
import { connect } from "react-redux";
import { Button, Form } from "semantic-ui-react";

class SignUp extends React.Component {
	state = {
		name: "",
		username: "",
		email: "",
		password: "",
		age: "",
		weight: "",
		bmi: "",
		address: "",
		goal: ""
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.props.signUp(
			this.state.name,
			this.state.username,
			this.state.password,
			this.props.history
		);
	};

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group>
					<Form.Input
						label="Name"
						placeholder="Name..."
						name="name"
						value={this.state.name}
						onChange={this.handleChange}
						width={6}
					/>
					<Form.Input
						label="Username"
						placeholder="Username..."
						name="username"
						value={this.state.username}
						onChange={this.handleChange}
						width={6}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						label="Email Address"
						placeholder="Email..."
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						width={6}
					/>
					<Form.Input
						label="Password"
						type="password"
						placeholder="Password..."
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						width={6}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						label="Age"
						type="number"
						placeholder="Age..."
						name="age"
						value={this.state.age}
						onChange={this.handleChange}
						width={4}
					/>
					<Form.Input
						label="Weight"
						type="number"
						placeholder="Weight (in pounds)..."
						name="weight"
						value={this.state.weight}
						onChange={this.handleChange}
						width={4}
					/>
					<Form.Input
						label="Height"
						type="number"
						placeholder="Height (in inches)..."
						name="height"
						value={this.state.height}
						onChange={this.handleChange}
						width={4}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						label="Home Address"
						placeholder="Home Address..."
						name="address"
						value={this.state.address}
						onChange={this.handleChange}
						width={12}
					/>
				</Form.Group>
				<Form.Group>
					<Form.Input
						label="Personal Goal"
						placeholder="Goal..."
						name="goal"
						value={this.state.goal}
						onChange={this.handleChange}
						width={12}
					/>
				</Form.Group>
				<Button type="submit">Create Account</Button>
			</Form>
		);
	}
}

export default connect(null, { signUp })(SignUp);
