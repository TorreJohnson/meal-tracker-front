import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./actions/Actions";
import { Route, withRouter } from "react-router-dom";
import UsersContainer from "./components/containers/UsersContainer";
import LandingPage from "./components/LandingPage";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import "./App.css";

class App extends Component {
	componentDidMount() {
		let jwt = localStorage.getItem("token");

		if (jwt && !this.props.currentUser) {
			this.props.getUser(jwt, this.props.history);
		}
	}

	render() {
		return (
			<div className="App">
				{this.props.loggedIn ? <UsersContainer /> : <LandingPage />}
				<Route exact path="/signup" component={SignUp} />
				<Route exace path="/login" component={LogIn} />
			</div>
		);
	}
}

export default withRouter(
	connect(
		state => {
			return { currentUser: state.currentUser, loggedIn: state.loggedIn };
		},
		{ getUser }
	)(App)
);
