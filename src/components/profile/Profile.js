import React from "react";
import { connect } from "react-redux";
import { updateUser } from "../actions/Actions";
import { config } from "../../config.js";
import ReactFilestack from "filestack-react";
import {
	Header,
	Icon,
	Grid,
	Button,
	Form,
	TextArea,
	Segment,
	Image
} from "semantic-ui-react";

class Profile extends React.Component {
	state = {
		edit: false,
		name: this.props.currentUser.name,
		username: this.props.currentUser.username,
		email: this.props.currentUser.email,
		address: this.props.currentUser.address,
		birthday: this.props.currentUser.birthday,
		weight: this.props.currentUser.weight,
		height: this.props.currentUser.height,
		goal: this.props.currentUser.goal,
		profilePhoto: this.props.currentUser.profile_photo
	};

	handleEditClick = () => {
		this.setState({
			edit: true
		});
	};

	handleSaveClick = () => {
		let payload = Object.assign({}, this.state, {
			id: this.props.currentUser.id
		});
		this.props.updateUser(payload, localStorage.getItem("token"));
		this.setState({
			edit: false
		});
	};

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSuccess = result => {
		if (result.filesUploaded.length) {
			this.setState({
				profilePhoto: `${result.filesUploaded[0].url}`
			});
		}
	};

	displayOrEdit = () => {
		if (this.state.edit) {
			return (
				<div>
					<Grid>
						<Grid.Row>
							<Grid.Column width={3} />
							<Grid.Column width={10}>
								<Segment>
									<Button
										onClick={this.handleSaveClick}
										floated="right"
										color="green"
									>
										<Icon name="save" />Save Changes
									</Button>
									<Header as="h2">
										<Icon name="settings" />
										<Header.Content>Edit Profile</Header.Content>
									</Header>
									<Header as="h3">{this.props.currentUser.name}</Header>
									<Form>
										<Grid divided="vertically">
											<Grid.Row columns={3}>
												<Grid.Column>
													<Form.Field>
														<label>Name</label>
														<input
															name="name"
															value={this.state.name}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.name}
														/>
													</Form.Field>
													<Form.Field>
														<label>Username</label>
														<input
															name="username"
															value={this.state.username}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.username}
														/>
													</Form.Field>
													<Form.Field>
														<label>Email</label>
														<input
															name="email"
															value={this.state.email}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.email}
														/>
													</Form.Field>
													<Form.Field>
														<label>Address</label>
														<input
															name="address"
															value={this.state.address}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.address}
														/>
													</Form.Field>
												</Grid.Column>
												<Grid.Column>
													<Form.Field>
														<label>Birthday</label>
														<input
															type="date"
															name="birthday"
															value={this.state.birthday}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.birthday}
														/>
													</Form.Field>
													<Form.Field>
														<label>Weight</label>
														<input
															type="number"
															name="weight"
															value={this.state.weight}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.weight}
														/>
													</Form.Field>
													<Form.Field>
														<label>Height</label>
														<input
															type="number"
															name="height"
															value={this.state.height}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.height}
														/>
													</Form.Field>
													<Form.Field>
														<label>Personal Goal</label>
														<TextArea
															name="goal"
															value={this.state.goal}
															onChange={this.handleChange}
															placeholder={this.props.currentUser.goal}
														/>
													</Form.Field>
												</Grid.Column>
												<Grid.Column>
													<Image src={this.props.currentUser.profile_photo} />
													<ReactFilestack
														apikey={config.fileStackApiKey}
														buttonText="Change Profile Photo"
														buttonClass="classname"
														options={this.fileStackOptions}
														onSuccess={this.onSuccess}
													/>
												</Grid.Column>
											</Grid.Row>
										</Grid>
									</Form>
								</Segment>
							</Grid.Column>
							<Grid.Column width={3} />
						</Grid.Row>
					</Grid>
				</div>
			);
		} else {
			return (
				<div>
					<Grid>
						<Grid.Row>
							<Grid.Column width={3} />
							<Grid.Column width={10}>
								<Segment>
									<Button
										onClick={this.handleEditClick}
										basic
										color="green"
										floated="right"
									>
										<Icon name="edit" />Edit Profile
									</Button>
									<Header as="h2">
										<Icon name="user circle outline" />
										<Header.Content>Profile</Header.Content>
									</Header>
									<Header as="h3">{this.props.currentUser.name}</Header>
									<Grid divided="vertically">
										<Grid.Row columns={3}>
											<Grid.Column>
												<Form>
													<Form.Field label="Name" />
													<p>{this.props.currentUser.name}</p>
													<Form.Field label="Username" />
													<p>{this.props.currentUser.username}</p>
													<Form.Field label="Email" />
													<p>{this.props.currentUser.email}</p>
													<Form.Field label="Address" />
													<p>{this.props.currentUser.address}</p>
												</Form>
											</Grid.Column>
											<Grid.Column>
												<Form>
													<Form.Field label="Age" />
													<p>{this.props.currentUser.age}</p>
													<Form.Field label="Weight" />
													<p>{this.props.currentUser.weight}</p>
													<Form.Field label="Height" />
													<p>{this.props.currentUser.height}</p>
													<Form.Field label="Personal Goal" />
													<p>{this.props.currentUser.goal}</p>
												</Form>
											</Grid.Column>
											<Grid.Column>
												<Image src={this.props.currentUser.profile_photo} />
											</Grid.Column>
										</Grid.Row>
									</Grid>
								</Segment>
							</Grid.Column>
							<Grid.Column width={3} />
						</Grid.Row>
					</Grid>
				</div>
			);
		}
	};

	render() {
		return <div>{this.displayOrEdit()}</div>;
	}
}

export default connect(
	state => {
		return { currentUser: state.currentUser };
	},
	{ updateUser }
)(Profile);
