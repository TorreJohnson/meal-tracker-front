import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";

export const NutritionistCard = props => {
	return (
		<Card>
			<Image src="" />
			<Card.Content>
				<Card.Header>{props.nutritionist.name}</Card.Header>
				<Card.Meta>
					<span>{props.nutritionist.office_address}</span>
				</Card.Meta>
				<Card.Description>{props.nutritionist.biography}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<a>
					<Icon name="user" />
					22 Friends
				</a>
			</Card.Content>
		</Card>
	);
};
