import React from "react";
import { Card, Icon } from "semantic-ui-react";

export const MessageCard = props => {
	return (
		<div>
			<Card>
				<Card.Content header={props.message.subject} />
				<Card.Content description={props.message.body} />
				<Card.Content extra>
					<Icon name="mail outline" />
					Sent on {props.message.created_at.split("T")[0]}
				</Card.Content>
			</Card>
		</div>
	);
};
