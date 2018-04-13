import React from "react";
import { Card, Icon, Header, Modal, Image, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { hireFireNutritionist } from "../actions/Actions";
import withAuth from "../authentication/WithAuth";
import NutritionistMapContainer from "../maps/NutritionistMapContainer";

class NutritionistCard extends React.Component {
	handleClick = () => {
		this.props.hireFireNutritionist(
			this.props.currentUser,
			this.props.nutritionist.id
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
								<Card.Header>{this.props.nutritionist.name}</Card.Header>
								<Card.Meta>
									<span>{this.props.nutritionist.office_address}</span>
								</Card.Meta>
								<Card.Description>
									{this.props.nutritionist.biography}
								</Card.Description>
							</Card.Content>
							<Card.Content extra>
								<a>
									{this.props.nutritionist.accepts_new_patients ? (
										<Icon color="green" name="checkmark" />
									) : (
										<Icon color="red" name="window close" />
									)}
									Accepting New Patients
								</a>
							</Card.Content>
						</Card>
					}
				>
					<Modal.Header>
						{this.props.nutritionist.name}
						<Button onClick={this.handleClick}>
							{this.props.nutritionist.id ===
							this.props.currentUser.nutritionist_id
								? "Fire"
								: "Hire"}
						</Button>
					</Modal.Header>
					<Modal.Content image>
						<NutritionistMapContainer nutritionist={this.props.nutritionist} />
						<Modal.Description>
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
