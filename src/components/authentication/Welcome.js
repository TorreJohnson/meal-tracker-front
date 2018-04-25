import React from "react";
import { Card } from "semantic-ui-react";

export const WelcomeCard = () => {
	return (
		<div id="welcome-card">
			<Card centered>
				<Card.Content>
					<Card.Header>Welcome to Meal Tracker</Card.Header>
					<Card.Description>
						For a demo please log in as a client with the username 'demo' and
						the password '123'.
					</Card.Description>
					<br />
					<Card.Description>
						Otherwise feel free to create a new account.
					</Card.Description>
					<br />
					<Card.Description>
						For any questions please contact me with the information below.
					</Card.Description>
				</Card.Content>
			</Card>
		</div>
	);
};
