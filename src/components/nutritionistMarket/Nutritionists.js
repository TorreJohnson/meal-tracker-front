import React from "react";
import NutritionistCard from "./NutritionistCard";
import { connect } from "react-redux";
import cuid from "cuid";
import { Input, Label, Menu, Grid } from "semantic-ui-react";

class Nutritionists extends React.Component {
	state = {
		nutritionists: [],
		activeItem: "all",
		searchTerm: ""
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
		this.fetchNutritionists();
	}

	fetchNutritionists = () => {
		fetch("http://localhost:3000/api/v1/nutritionists")
			.then(res => res.json())
			.then(json => {
				this.setState({
					nutritionists: json
				});
			});
	};

	createNutritionistCards = () => {
		return this.state.nutritionists.map(nutritionist => (
			<NutritionistCard nutritionist={nutritionist} key={cuid()} />
		));
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	countNutritionists = () => {
		console.log(this.state.nutritionists);
		return this.state.nutritionists.length;
	};

	countAvailableNutritionists = () => {
		return this.state.nutritionists.filter(
			nutritionist => nutritionist.accepts_new_patients
		).length;
	};

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Grid>
					<Grid.Column width={3}>
						<Menu fluid vertical>
							<Menu.Item
								name="all"
								active={activeItem === "all"}
								onClick={this.handleItemClick}
							>
								<Label color="teal">{this.countNutritionists()}</Label>
								All Nutritionists
							</Menu.Item>
							<Menu.Item
								name="accepting"
								active={activeItem === "accepting"}
								onClick={this.handleItemClick}
							>
								<Label>{this.countAvailableNutritionists()}</Label>
								Accepting Clients
							</Menu.Item>

							<Menu.Item
								name="updates"
								active={activeItem === "updates"}
								onClick={this.handleItemClick}
							>
								<Label>1</Label>
								Updates
							</Menu.Item>
							<Menu.Item>
								<Input icon="search" placeholder="Search mail..." />
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={6}>{this.createNutritionistCards()}</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default connect(state => {
	return {
		currentUser: state.currentUser,
		loggedIn: state.loggedIn
	};
})(Nutritionists);
