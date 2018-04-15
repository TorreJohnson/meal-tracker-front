import React from "react";
import { Card, Icon, Header, Modal, Image, Label } from "semantic-ui-react";
import { connect } from "react-redux";
import { hireFireNutritionist } from "../actions/Actions";
import withAuth from "../authentication/WithAuth";
import NutritionistMapContainer from "../maps/NutritionistMapContainer";
import { config } from "../../config.js";

class NutritionistCard extends React.Component {
	handleClick = () => {
		let jwt = localStorage.getItem("token");
		this.props.hireFireNutritionist(
			this.props.currentUser,
			this.props.nutritionist.id,
			jwt
		);
	};
	render() {
		return (
			<div>
				<Modal
					trigger={
						<Card>
							<Image src="" />
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
							<Card.Content extra />
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
