import React from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

function withAuth(Component) {
	return class extends React.Component {
		Loader = () => (
			<div>
				<Segment>
					<Dimmer active inverted>
						<Loader size="large">Loading</Loader>
					</Dimmer>
				</Segment>
			</div>
		);

		render() {
			return this.props.loggedIn ? (
				<Component {...this.props} />
			) : (
				<this.Loader />
			);
		}
	};
}

export default withAuth;
