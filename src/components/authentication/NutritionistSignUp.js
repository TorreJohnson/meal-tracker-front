import React from "react";
import { logIn } from "../actions/Actions";
import { connect } from "react-redux";
import ReactFilestack from "filestack-react";
import { Form } from "semantic-ui-react";
import { config } from "../../config.js";

class NutritionistSignUp extends React.Component {
	state = {
		name: "",
		password: "",
		email: "",
		officeAddress: "",
		acceptingPatients: true,
		bio: "",
		profilePhoto: ""
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleAcceptingPatientsChange = (e, v) => {
		this.setState({
			acceptingPatients: v.value
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

	newPatientFormOptions = [
		{ key: "y", text: "Yes", value: true },
		{ key: "n", text: "No", value: false }
	];

	fileStackOptions = {
		accept: "image/*",
		maxFiles: 1,
		storeTo: {
			location: "s3"
		}
	};

	onSuccess(result) {
		if (result.filesUploaded.length) {
			this.setState({
				profilePhoto: result.filesUploaded[0].url
			});
		}
	}

	render() {
		return (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group widths="equal">
					<Form.Input
						fluid
						label="Name"
						name="name"
						value={this.state.username}
						onChange={this.handleChange}
						placeholder="Name..."
					/>
					<Form.Input
						fluid
						label="Email"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
						placeholder="Email..."
					/>
					<Form.Input
						fluid
						label="Password"
						type="password"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
						placeholder="Password..."
					/>
					<Form.Select
						fluid
						label="Currently Accepting New Clients?"
						options={this.newPatientFormOptions}
						placeholder=""
						name="acceptingPatients"
						value={this.state.acceptingPatients}
						onChange={this.handleAcceptingPatientsChange}
					/>
				</Form.Group>
				<Form.Group widths="equal">
					<Form.Input
						fluid
						label="Office Address"
						name="officeAddress"
						value={this.state.officeAddress}
						onChange={this.handleChange}
						placeholder="Office Address..."
					/>
				</Form.Group>
				<Form.TextArea
					label="Personal Statement"
					name="bio"
					value={this.state.bio}
					onChange={this.handleChange}
					placeholder="Tell us more about you..."
				/>
				<ReactFilestack
					apikey={config.fileStackApiKey}
					buttonText="Add a Profile Photo"
					buttonClass="classname"
					options={this.fileStackOptions}
					onSuccess={this.onSuccess}
				/>
				<Form.Button>Submit</Form.Button>
			</Form>
		);
	}
}

export default connect(null, { logIn })(NutritionistSignUp);
