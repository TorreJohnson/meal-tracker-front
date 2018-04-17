import React from "react";
import { connect } from "react-redux";
import { hireFireNutritionist } from "../actions/Actions";
import NutritionistMapContainer from "../maps/NutritionistMapContainer";
import {
	Card,
	Modal,
	Image,
	Label,
	Segment,
	Popup,
	Button
} from "semantic-ui-react";

class NutritionistCard extends React.Component {
	state = {
		isOpen: false,
		open: false
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

	show = dimmer => () => this.setState({ dimmer, open: true });
	close = () => this.setState({ open: false });

	render() {
		const { open, dimmer } = this.state;
		return (
			<div>
				<Segment compact>
					<Card onClick={this.show("blurring")}>
						<Image src={this.props.nutritionist.profile_photo} />
						<Card.Content>
							{this.props.nutritionist.accepts_new_patients ? (
								<Label as="a" color="green" ribbon="right">
									Accepting Clients
								</Label>
							) : (
								<Label as="a" color="red" ribbon="right">
									Not Accepting Clients
								</Label>
							)}
							<Card.Header>{this.props.nutritionist.name}</Card.Header>
							<Card.Meta>
								<span>{this.props.nutritionist.office_address}</span>
							</Card.Meta>
							<Card.Description>
								{this.props.nutritionist.biography.split(". ")[0]}...
							</Card.Description>
						</Card.Content>
					</Card>

					<Modal dimmer={dimmer} open={open} onClose={this.close}>
						<Modal.Header>
							{this.props.nutritionist.name}{" "}
							{this.props.nutritionist.id ===
							this.props.currentUser.nutritionist_id ? (
								<Button
									circular
									color="red"
									icon="remove user"
									onClick={this.handleClick}
									floated="right"
								/>
							) : this.props.currentUser.nutritionist_id ? (
								<Popup
									trigger={
										<Button
											circular
											color="green"
											icon="add user"
											floated="right"
										/>
									}
									content={"You already have a nutritionist!"}
									on="hover"
									open={this.state.isOpen}
									onClose={this.handleClose}
									onOpen={this.handleOpen}
									position="bottom right"
								/>
							) : (
								<Button
									circular
									color="green"
									icon="add user"
									onClick={this.handleClick}
									floated="right"
								/>
							)}
						</Modal.Header>
						<Modal.Content image scrolling>
							<Image
								src={this.props.nutritionist.profile_photo}
								size="large"
								wrapped
							/>
							<Modal.Description>
								{this.props.nutritionist.biography}
								<NutritionistMapContainer
									nutritionist={this.props.nutritionist}
								/>
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
)(NutritionistCard);
