import React from "react";
import { connect } from "react-redux";
import withAuth from "./WithAuth";

class Messages extends React.Component {
	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

	render() {
		return <div>Messages</div>;
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(withAuth(Messages));
