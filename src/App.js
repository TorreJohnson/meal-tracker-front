import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./components/actions/Actions";
import { Route, withRouter } from "react-router-dom";
import UsersContainer from "./components/containers/UsersContainer";
import LandingPage from "./components/LandingPage";
import NutritionistLandingPage from "./components/NutritionistLandingPage";
import SignUp from "./components/authentication/SignUp";
import LogIn from "./components/authentication/LogIn";
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
				<Route exact path="/login" component={LogIn} />
				<Route
					exact
					path="/nutritionists"
					component={NutritionistLandingPage}
				/>
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
