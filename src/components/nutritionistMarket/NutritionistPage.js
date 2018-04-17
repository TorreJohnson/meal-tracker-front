import React from "react";
import { connect } from "react-redux";
import { Segment, Image, Header, Grid } from "semantic-ui-react";
import NutritionistMapContainer from "../maps/NutritionistMapContainer";
import { config } from "../../config.js";

class NutritionistPage extends React.Component {
	render() {
		return (
			<div>
				<Segment padded>
					<Grid>
						<Grid.Row>
							<Grid.Column width={1} />
							<Grid.Column width={14}>
								<Image
									src={this.props.nutritionist.profile_photo}
									size="medium"
									centered
								/>
								<Header as="h1">{this.props.nutritionist.name}</Header>
								<Header as="h3">{this.props.nutritionist.company_name}</Header>
								<Header as="h3">
									{this.props.nutritionist.office_address}
								</Header>
								<p>{this.props.nutritionist.biography}</p>
							</Grid.Column>
							<Grid.Column width={1} />
						</Grid.Row>
						<Grid.Row>
							<Grid.Column width={1} />
							<Grid.Column width={7}>
								<Header as="h2">Office Street View</Header>
								<Image
									src={`https://maps.googleapis.com/maps/api/streetview?size=600x400&location=${
										this.props.nutritionist.office_address
									}&key=${config.googleApiKey}`}
									alt="office street view"
								/>
							</Grid.Column>
							<Grid.Column width={7}>
								<Header as="h2">Office Location</Header>
								<NutritionistMapContainer
									nutritionist={this.props.nutritionist}
								/>
							</Grid.Column>
							<Grid.Column width={1} />
						</Grid.Row>
					</Grid>
				</Segment>
			</div>
		);
	}
}

export default connect(state => {
	return { currentUser: state.currentUser };
})(NutritionistPage);
