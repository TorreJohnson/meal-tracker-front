import React from "react";
import {
	Segment,
	Button,
	Header,
	Image,
	Modal,
	Card,
	Icon
} from "semantic-ui-react";

class JournalEntryCard extends React.Component {
	state = {
		open: false
	};

	show = dimmer => () => this.setState({ dimmer, open: true });
	close = () => this.setState({ open: false });

	render() {
		const { open, dimmer } = this.state;
		return (
			<Segment padded compact>
				<Card onClick={this.show("blurring")}>
					<Image
						src={
							this.props.foodItem.high_res
								? this.props.foodItem.high_res
								: this.props.foodItem.image
						}
					/>
					<Card.Content>
						<Card.Header>{this.props.foodItem.name}</Card.Header>
						<Card.Meta>
							<span className="date">
								Recorded on{" "}
								{this.props.foodItem.created_at
									.split("T")[1]
									.split(".")[0]
									.slice(0, 5)}{" "}
								on {this.props.foodItem.created_at.split("T")[0]}
							</span>
						</Card.Meta>
						<Card.Description>
							Matthew is a musician living in Nashville.
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<a>
							<Icon name="user" />
							22 Friends
						</a>
					</Card.Content>
				</Card>
				<Modal dimmer={dimmer} open={open} onClose={this.close}>
					<Modal.Header>
						{this.props.foodItem.brand} {this.props.foodItem.name}
					</Modal.Header>
					<Modal.Content image>
						<Image
							wrapped
							size="medium"
							src={
								this.props.foodItem.high_res
									? this.props.foodItem.high_res
									: this.props.foodItem.image
							}
						/>

						<Modal.Description>
							<Header />
							<p>
								Logged on{" "}
								{this.props.foodItem.created_at
									.split("T")[1]
									.split(".")[0]
									.slice(0, 5)}{" "}
								on {this.props.foodItem.created_at.split("T")[0]}
								We've found the following gravatar image associated with your
								e-mail address.
							</p>
							<p>Is it okay to use this photo?</p>
						</Modal.Description>
					</Modal.Content>
					<Modal.Actions>
						<Button color="black" onClick={this.close}>
							Nope
						</Button>
						<Button
							positive
							icon="checkmark"
							labelPosition="right"
							content="Yep, that's me"
							onClick={this.close}
						/>
					</Modal.Actions>
				</Modal>
			</Segment>
		);
	}
}

export default JournalEntryCard;
