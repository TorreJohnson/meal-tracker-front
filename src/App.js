import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "./components/actions/Actions";
import { Route, withRouter } from "react-router-dom";
import UsersContainer from "./components/containers/UsersContainer";
import NutritionistsContainer from "./components/containers/NutritionistsContainer";
import LandingPage from "./components/LandingPage";
import { WelcomeCard } from "./components/authentication/Welcome";
import SignUp from "./components/authentication/SignUp";
import LogIn from "./components/authentication/LogIn";
import NutritionistSignUp from "./components/authentication/NutritionistSignUp";
import NutritionistLogIn from "./components/authentication/NutritionistLogIn";
import { Container, Grid, Header, List, Segment } from "semantic-ui-react";
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
			<div>
				<div className="App">
					{this.routeUsersOrNutritionists()}
					{this.props.currentUser ? null : (
						<Route exact path="/" component={WelcomeCard} />
					)}
					<div>
						<Route exact path="/signup" component={SignUp} />
						<Route exact path="/login" component={LogIn} />
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
				</div>
				<Segment
					inverted
					vertical
					style={{ margin: "5em 0em 0em", padding: "5em 0em" }}
				>
					<Container textAlign="center">
						<Grid divided inverted stackable>
							<Grid.Row>
								<Grid.Column width={5}>
									<Header inverted as="h4" content="Contact Info" />
									<List link inverted>
										<List.Item>
											<List.Icon inverted name="phone" />
											<List.Content>347-436-6422</List.Content>
										</List.Item>
										<List.Item>
											<List.Icon inverted name="mail" />
											<List.Content>
												<a href="mailto:torre.johnson@gmail.com">
													torre.johnson@gmail.com
												</a>
											</List.Content>
										</List.Item>
										<List.Item>
											<List.Icon inverted name="linkedin" />
											<List.Content>
												<a href="https://www.linkedin.com/in/torrejohnson/">
													https://www.linkedin.com/in/torrejohnson/
												</a>
											</List.Content>
										</List.Item>
										<List.Item>
											<List.Icon inverted name="github" />
											<List.Content>
												<a href="https://github.com/TorreJohnson">
													https://github.com/TorreJohnson
												</a>
											</List.Content>
										</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={3}>
									<Header inverted as="h4" content="Source Code" />
									<List link inverted>
										<List.Item>
											<List.Content>
												<a href="https://github.com/TorreJohnson/meal-tracker-front">
													Front End
												</a>
											</List.Content>
										</List.Item>
										<List.Item>
											<List.Content>
												<a href="https://github.com/TorreJohnson/meal-tracker-back">
													Back End
												</a>
											</List.Content>
										</List.Item>
									</List>
								</Grid.Column>
								<Grid.Column width={3}>
									<Header inverted as="h4" content="Thanks for Visiting!" />
								</Grid.Column>
							</Grid.Row>
						</Grid>
					</Container>
				</Segment>
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
