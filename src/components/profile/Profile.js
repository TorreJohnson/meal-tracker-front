import React from "react";
import { Header, Icon, Grid, Button, Form, TextArea } from "semantic-ui-react";
import { connect } from "react-redux";
import { updateUser } from "../actions/Actions";

class Profile extends React.Component {
	state = {
		edit: false,
		username: this.props.currentUser.username,
		address: this.props.currentUser.address,
		age: this.props.currentUser.age,
		weight: this.props.currentUser.weight,
		goal: this.props.currentUser.goal
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

	displayOrEdit = () => {
		if (this.state.edit) {
			return (
				<div>
					<Button onClick={this.handleSaveClick} floated="right">
						<Icon name="save" />Save Changes
					</Button>
					<Header as="h2">
						<Icon name="settings" />
						<Header.Content>Edit Profile</Header.Content>
					</Header>
					<Header as="h3">{this.props.currentUser.name}</Header>
					<Form>
						<Grid divided="vertically">
							<Grid.Row columns={2}>
								<Grid.Column>
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
										<label>Age</label>
										<input
											type="number"
											name="age"
											value={this.state.age}
											onChange={this.handleChange}
											placeholder={this.props.currentUser.age}
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
										<label>Personal Goal</label>
										<TextArea
											name="goal"
											value={this.state.goal}
											onChange={this.handleChange}
											placeholder={this.props.currentUser.goal}
										/>
									</Form.Field>
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Form>
				</div>
			);
		} else {
			return (
				<div>
					<Button onClick={this.handleEditClick} floated="right">
						<Icon name="edit" />Edit Profile
					</Button>
					<Header as="h2">
						<Icon name="user circle outline" />
						<Header.Content>Profile</Header.Content>
					</Header>
					<Header as="h3">{this.props.currentUser.name}</Header>
					<Grid divided="vertically">
						<Grid.Row columns={2}>
							<Grid.Column>
								<Form>
									<Form.Field label="Username" />
									<p>{this.props.currentUser.username}</p>
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
									<Form.Field label="Personal Goal" />
									<p>{this.props.currentUser.goal}</p>
								</Form>
							</Grid.Column>
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
