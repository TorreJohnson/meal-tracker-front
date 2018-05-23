import React from "react";
import cuid from "cuid";
import {
	snakeCasedNutrients,
	capitalizedNutrients
} from "../nutrients/NutrientLists";
import {
	Segment,
	Header,
	Image,
	Modal,
	Card,
	Grid,
	List
} from "semantic-ui-react";

class JournalEntryCard extends React.Component {
	state = {
		open: false
	};

	show = dimmer => () => this.setState({ dimmer, open: true });
	close = () => this.setState({ open: false });

	mapThroughIngredients = () => {
		if (this.props.foodItem.ingredients) {
			let listedIngredients = this.props.foodItem.ingredients
				.split(", ")
				.map(ingredient => <List.Item key={cuid()}>{ingredient}</List.Item>);
			return (
				<Segment>
					<Header>Ingredients</Header>
					<Grid>
						<Grid.Column>
							<List>{listedIngredients}</List>
						</Grid.Column>
					</Grid>
				</Segment>
			);
		}
	};

	createNutrientValuesListOne = () => {
		let nutrientValues = [];
		for (let i = 0; i < 11; i++) {
			nutrientValues.push(
				<List.Item>
					{capitalizedNutrients[i]}:{" "}
					{this.props.foodItem[snakeCasedNutrients[i]]}
				</List.Item>
			);
		}
		return nutrientValues;
	};

	createNutrientValuesListTwo = () => {
		let nutrientValues = [];
		for (let i = 11; i < snakeCasedNutrients.length; i++) {
			nutrientValues.push(
				<List.Item>
					{capitalizedNutrients[i]}:{" "}
					{this.props.food_item[snakeCasedNutrients[i]]}
				</List.Item>
			);
		}
		return nutrientValues;
	};

	render() {
		const { open, dimmer } = this.state;
		return (
			<Segment padded compact id="featured">
				<Card onClick={this.show("blurring")} color="green">
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
							<span className="date">{this.props.foodItem.brand}</span>
						</Card.Meta>
						<Card.Description>
							Recorded on{" "}
							{this.props.foodItem.created_at
								.split("T")[1]
								.split(".")[0]
								.slice(0, 5)}{" "}
							on {this.props.foodItem.created_at.split("T")[0]}
						</Card.Description>
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
							<Segment.Group horizontal>
								<Segment>
									<Header>Nutrient Values</Header>
									<Grid columns={2}>
										<Grid.Column>
											<List>{this.createNutrientValuesListOne()}</List>
										</Grid.Column>
										<Grid.Column>
											<List>{this.createNutrientValuesListOne()}</List>
										</Grid.Column>
									</Grid>
								</Segment>
								{this.mapThroughIngredients()}
							</Segment.Group>
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</Segment>
		);
	}
}

export default JournalEntryCard;
