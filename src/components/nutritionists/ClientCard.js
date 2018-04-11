import React from "react";
import { Card, Icon } from "semantic-ui-react";

export const ClientCard = props => {
	return (
		<div>
			<Card>
				<Card.Content header={props.client.name} />
				<Card.Content description={props.client.goal} />
				<Card.Content extra>
					<Icon name="user" />
					4 Friends
				</Card.Content>
			</Card>
		</div>
	);
};
