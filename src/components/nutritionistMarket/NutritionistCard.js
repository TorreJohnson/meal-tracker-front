import React from "react";
import {
	Card,
	Icon,
	Header,
	Modal,
	Image,
	Label,
	Segment,
	Popup
} from "semantic-ui-react";
import { connect } from "react-redux";
import { hireFireNutritionist } from "../actions/Actions";
import withAuth from "../authentication/WithAuth";
import NutritionistMapContainer from "../maps/NutritionistMapContainer";
import { config } from "../../config.js";

class NutritionistCard extends React.Component {
	state = {
		isOpen: false
	};
	handleClick = () => {
		if (
			this.props.currentUser.nutritionist_id === null ||
			this.props.nutritionist.id === this.props.currentUser.nutritionist_id
		) {
			let jwt = localStorage.getItem("token");
			this.props.hireFireNutritionist(
				this.props.currentUser,
				this.props.nutritionist.id,
				jwt
			);
		}
	};

	timeoutLength = 2500;

	handleOpen = () => {
		this.setState({ isOpen: true });

		this.timeout = setTimeout(() => {
			this.setState({ isOpen: false });
		}, this.timeoutLength);
	};

	handleClose = () => {
		this.setState({ isOpen: false });
		clearTimeout(this.timeout);
	};

	render() {
		return (
			<div>
				<Segment compact>
					<Modal
						trigger={
							<Card>
								<Image src={this.props.nutritionist.profile_photo} />
								<Card.Content>
									{this.props.nutritionist.accepts_new_patients ? (
										<Label as="a" color="green" ribbon="right">
											Accepting Patients
										</Label>
									) : (
										<Label as="a" color="red" ribbon="right">
											Not Accepting Patients
										</Label>
									)}
									<Card.Header>{this.props.nutritionist.name}</Card.Header>
									<Card.Meta>
										<span>{this.props.nutritionist.office_address}</span>
									</Card.Meta>
									<Card.Description>
										{this.props.nutritionist.biography}
									</Card.Description>
								</Card.Content>
							</Card>
						}
					>
						<Modal.Header>
							{this.props.nutritionist.name}
							{this.props.nutritionist.id ===
							this.props.currentUser.nutritionist_id ? (
								<Icon
									color="red"
									name="remove user"
									onClick={this.handleClick}
									floated="right"
								/>
							) : this.props.currentUser.nutritionist_id ? (
								<Popup
									trigger={
										<Icon
											color="green"
											name="add user"
											onClick={this.handleClick}
											floated="right"
										/>
									}
									content={"You already have a nutritionist!"}
									on="click"
									open={this.state.isOpen}
									onClose={this.handleClose}
									onOpen={this.handleOpen}
									position="top right"
								/>
							) : (
								<Icon
									color="green"
									name="add user"
									onClick={this.handleClick}
									floated="right"
								/>
							)}
						</Modal.Header>
						<Modal.Content image>
							<img
								src={`https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${
									this.props.nutritionist.office_address
								}&key=${config.googleApiKey}`}
								alt="office street view"
							/>

							<Modal.Description>
								<NutritionistMapContainer
									nutritionist={this.props.nutritionist}
								/>
								<Header>{this.props.nutritionist.biography}</Header>
							</Modal.Description>
						</Modal.Content>
					</Modal>
				</Segment>
			</div>
		);
	}
}

export default connect(
	state => {
		return { currentUser: state.currentUser, loggedIn: state.loggedIn };
	},
	{ hireFireNutritionist }
)(withAuth(NutritionistCard));
