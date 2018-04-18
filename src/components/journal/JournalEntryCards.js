import React from "react";
import cuid from "cuid";
import {
	Segment,
	Header,
	Image,
	Modal,
	Card,
	Grid,
	List,
	Reveal
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
											<List>
												<List.Item>
													Beta Carotene: {this.props.foodItem.beta_carotene}
												</List.Item>
												<List.Item>
													Caffeine: {this.props.foodItem.caffeine}
												</List.Item>
												<List.Item>
													Calcium: {this.props.foodItem.calcium}
												</List.Item>
												<List.Item>
													Carbohydrates: {this.props.foodItem.carbohydrate}
												</List.Item>
												<List.Item>
													Cholesterol: {this.props.foodItem.cholesterol}
												</List.Item>
												<List.Item>
													Calories: {this.props.foodItem.calories}
												</List.Item>
												<List.Item>Fat: {this.props.foodItem.fat}</List.Item>
												<List.Item>
													Fiber: {this.props.foodItem.fiber}
												</List.Item>
												<List.Item>
													Folic Acid: {this.props.foodItem.folic_acid}
												</List.Item>
												<List.Item>Iron: {this.props.foodItem.iron}</List.Item>
												<List.Item>
													Niacin: {this.props.foodItem.calcium}
												</List.Item>
											</List>
										</Grid.Column>
										<Grid.Column>
											<List.Item>
												Potassium: {this.props.foodItem.potassium}
											</List.Item>
											<List.Item>
												Protein: {this.props.foodItem.protein}
											</List.Item>
											<List.Item>
												Riboflavin: {this.props.foodItem.riboflavin}
											</List.Item>
											<List.Item>
												Sodium: {this.props.foodItem.sodium} Mgs
											</List.Item>
											<List.Item>
												Sugars: {this.props.foodItem.sugars}
											</List.Item>
											<List.Item>
												Thiamin: {this.props.foodItem.thiamin}
											</List.Item>
											<List.Item>
												Vitamin A: {this.props.foodItem.vitamin_a}
											</List.Item>
											<List.Item>
												Vitamin B12: {this.props.foodItem.vitamin_b12}
											</List.Item>
											<List.Item>
												Vitamin C: {this.props.foodItem.vitamin_c}
											</List.Item>
											<List.Item>
												Vitamin D: {this.props.foodItem.vitamin_d}
											</List.Item>
											<List.Item>
												Vitamin E: {this.props.foodItem.vitamin_e}
											</List.Item>
											<List.Item>
												Vitamin K: {this.props.foodItem.vitamin_k}
											</List.Item>
											<List.Item>Zinc: {this.props.foodItem.zinc}</List.Item>
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
