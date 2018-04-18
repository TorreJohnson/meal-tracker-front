import React from "react";
import { logIn } from "../actions/Actions";
import { connect } from "react-redux";
import { Button, Form, Grid, Segment } from "semantic-ui-react";

class NutritionistLogIn extends React.Component {
	state = {
		name: "",
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
			null,
			this.state.name,
			this.state.password,
			this.props.history
		);
	};

	render() {
		return (
			<Grid>
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row />
				<Grid.Row>
					<Grid.Column width={6} />
					<Grid.Column width={4}>
						<Segment>
							<Form onSubmit={this.handleSubmit}>
								<Form.Field>
									<label>Name</label>
									<input
										name="name"
										value={this.state.name}
										onChange={this.handleChange}
										placeholder="Name..."
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
								<Button type="submit" basic color="teal">
									Submit
								</Button>
							</Form>
						</Segment>
					</Grid.Column>
					<Grid.Column width={6} />
				</Grid.Row>
			</Grid>
		);
	}
}

export default connect(null, { logIn })(NutritionistLogIn);
