import React from "react";
import { signUp } from "../actions/authActions";
import { connect } from "react-redux";
import {
	Button,
	Form,
	Image,
	Icon,
	Segment,
	Dimmer,
	Loader
} from "semantic-ui-react";
import ReactFilestack from "filestack-react";

class SignUp extends React.Component {
	state = {
		name: "",
		username: "",
		email: "",
		password: "",
		weight: "",
		address: "",
		goal: "",
		profilePhoto: "",
		height: "",
		birthday: "",
		age: "",
		bmi: "",
		loading: false
	};

	handleChange = e => {
		let age = Math.floor(
			(Date.now() - Date.parse(this.state.birthday)) / 31556952000
		);
		let bmi = 0;
		if (this.state.weight > 0 && this.state.height > 0) {
			bmi =
				parseInt(this.state.weight, 10) /
				(parseInt(this.state.height, 10) * parseInt(this.state.height, 10)) *
				703;
		}
		this.setState({
			[e.target.name]: e.target.value,
			bmi: bmi.toFixed(2),
			age: age
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		this.setState({
			loading: true
		});
		this.props.signUp(this.state, this.props.history, false);
	};

	fileStackOptions = {
		accept: "image/*",
		maxFiles: 1,
		storeTo: {
			location: "s3"
		}
	};

	onSuccess = result => {
		if (result.filesUploaded.length) {
			this.setState({
				profilePhoto: `${result.filesUploaded[0].url}`
			});
		}
	};

	render() {
		return (
			<div className="user-signup-box">
				<Segment>
					{this.state.loading ? (
						<Dimmer active>
							<Loader>Loading</Loader>
						</Dimmer>
					) : null}{" "}
					{this.state.profilePhoto.length ? (
						<Image src={this.state.profilePhoto} size="medium" rounded />
					) : (
						<Icon name="user circle outline" size="massive" />
					)}
					<ReactFilestack
						apikey={process.env.REACT_APP_FILESTACK_API_KEY}
						buttonText="Add a Profile Photo"
						buttonClass="classname"
						options={this.fileStackOptions}
						onSuccess={this.onSuccess}
					/>
					<Form onSubmit={this.handleSubmit}>
						<Form.Group>
							<Form.Input
								label="Name"
								placeholder="Name..."
								name="name"
								value={this.state.name}
								onChange={this.handleChange}
							/>
							<Form.Input
								label="Username"
								placeholder="Username..."
								name="username"
								value={this.state.username}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Input
								label="Email Address"
								placeholder="Email..."
								name="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<Form.Input
								label="Password"
								type="password"
								placeholder="Password..."
								name="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Input
								label="Weight"
								type="number"
								placeholder="Weight (in pounds)..."
								name="weight"
								value={this.state.weight}
								onChange={this.handleChange}
							/>
							<Form.Input
								label="Height"
								type="number"
								placeholder="Height (in inches)..."
								name="height"
								value={this.state.height}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.Input
								label="Birthday"
								type="date"
								placeholder="Age..."
								name="birthday"
								value={this.state.birthday}
								onChange={this.handleChange}
							/>
							<Form.Input
								label="Home Address"
								placeholder="Home Address..."
								name="address"
								value={this.state.address}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Form.Group>
							<Form.TextArea
								label="Personal Goal"
								placeholder="Goal..."
								name="goal"
								type="textarea"
								value={this.state.goal}
								onChange={this.handleChange}
							/>
						</Form.Group>
						<Button type="submit" basic color="green">
							Create Account
						</Button>
					</Form>
				</Segment>
			</div>
		);
	}
}

export default connect(null, { signUp })(SignUp);
