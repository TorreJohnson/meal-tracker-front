import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./components/actions/Actions";
import { Route, withRouter } from "react-router-dom";
import UsersContainer from "./components/containers/UsersContainer";
import NutritionistsContainer from "./components/containers/NutritionistsContainer";
import LandingPage from "./components/LandingPage";
import NutritionistLandingPage from "./components/NutritionistLandingPage";
import SignUp from "./components/authentication/SignUp";
import LogIn from "./components/authentication/LogIn";
import NutritionistSignUp from "./components/authentication/NutritionistSignUp";
import NutritionistLogIn from "./components/authentication/NutritionistLogIn";
import "./App.css";

class App extends Component {
	componentDidMount() {
		let jwt = localStorage.getItem("token");

		if (jwt && !this.props.currentUser) {
			this.props.getUser(jwt, this.props.history);
		}
	}

	routeUsersOrNutritionists = () => {
		if (this.props.nutritionistLoggedIn) {
			return <NutritionistsContainer />;
		} else if (this.props.loggedIn) {
			return <UsersContainer />;
		} else {
			return <LandingPage />;
		}
	};

	render() {
		return (
			<div className="App">
				{this.routeUsersOrNutritionists()}
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/login" component={LogIn} />
				<Route
					exact
					path="/nutritionists"
					component={NutritionistLandingPage}
				/>
				<Route
					exact
					path="/nutritionists/signup"
					component={NutritionistSignUp}
				/>
				<Route
					exact
					path="/nutritionists/login"
					component={NutritionistLogIn}
				/>
			</div>
		);
	}
}

export default withRouter(
	connect(
		state => {
			return {
				currentUser: state.currentUser,
				loggedIn: state.loggedIn,
				nutritionistLoggedIn: state.nutritionistLoggedIn
			};
		},
		{ getUser }
	)(App)
);
