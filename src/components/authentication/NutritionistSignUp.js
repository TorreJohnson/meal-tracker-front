import React from "react";
import { signUp } from "../actions/Actions";
import { connect } from "react-redux";
import ReactFilestack from "filestack-react";
import { Form, Icon, Image, Segment } from "semantic-ui-react";

class NutritionistSignUp extends React.Component {
	state = {
		name: "",
		password: "",
		email: "",
		officeAddress: "",
		acceptingPatients: true,
		bio: "",
		companyName: "",
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
		this.props.signUp(this.state, this.props.history, true);
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

	onSuccess = result => {
		if (result.filesUploaded.length) {
			this.setState({
				profilePhoto: `${result.filesUploaded[0].url}`
			});
		}
	};

	render() {
		return (
			<div className="nut-signup-box">
				<Segment>
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
								label="Accepting New Clients?"
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
								label="Company Name"
								name="companyName"
								value={this.state.companyName}
								onChange={this.handleChange}
								placeholder="Company Name..."
							/>
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
						<Form.Button basic color="green">
							Submit
						</Form.Button>
					</Form>
				</Segment>
			</div>
		);
	}
}

export default connect(null, { signUp })(NutritionistSignUp);
