import React from "react";
import ClientCard from "./ClientCard";
import { connect } from "react-redux";
import cuid from "cuid";

class ClientsList extends React.Component {
	mappedClients = () => {
		return this.props.clients.map(client => (
			<ClientCard client={client} key={cuid()} />
		));
	};

	render() {
		return <div className="flex-container">{this.mappedClients()}</div>;
	}
}

export default connect(state => {
	return { clients: state.clients };
})(ClientsList);
