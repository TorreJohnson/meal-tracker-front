import React from "react";
import NutritionistCard from "./NutritionistCard";
import { connect } from "react-redux";
import cuid from "cuid";
import { Input, Label, Menu, Grid, Segment } from "semantic-ui-react";

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
		return this.filterNutritionistsForSearchTerms().map(nutritionist => (
			<NutritionistCard nutritionist={nutritionist} key={cuid()} />
		));
	};

	handleItemClick = (e, { name }) => this.setState({ activeItem: name });

	countNutritionists = () => {
		return this.state.nutritionists.length;
	};

	countAvailableNutritionists = () => {
		return this.state.nutritionists.filter(
			nutritionist => nutritionist.accepts_new_patients
		).length;
	};

	handleSearchInputChange = e => {
		this.setState({
			searchTerm: e.target.value
		});
	};

	filterNutritionistsForSearchTerms = () => {
		let nutritionists;
		if (this.state.activeItem === "all") {
			nutritionists = this.state.nutritionists.sort((a, b) => b.id - a.id);
		} else {
			nutritionists = this.state.nutritionists
				.filter(nutritionist => nutritionist.accepts_new_patients)
				.sort((a, b) => b.id - a.id);
		}
		return nutritionists.filter(
			nutritionist =>
				nutritionist.name
					.toLowerCase()
					.includes(this.state.searchTerm.toLowerCase()) ||
				nutritionist.office_address
					.toLowerCase()
					.includes(this.state.searchTerm.toLowerCase())
		);
	};

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Grid>
					<Grid.Column width={3}>
						<Menu fluid vertical className="fixed-side-bar">
							<Menu.Item
								name="all"
								active={activeItem === "all"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "all" ? (
									<Label color="green">{this.countNutritionists()}</Label>
								) : (
									<Label>{this.countNutritionists()}</Label>
								)}
								All Nutritionists
							</Menu.Item>
							<Menu.Item
								name="accepting"
								active={activeItem === "accepting"}
								onClick={this.handleItemClick}
							>
								{" "}
								{this.state.activeItem === "accepting" ? (
									<Label color="green">
										{this.countAvailableNutritionists()}
									</Label>
								) : (
									<Label>{this.countAvailableNutritionists()}</Label>
								)}
								Accepting Clients
							</Menu.Item>
							<Menu.Item>
								<Input
									icon="search"
									onChange={this.handleSearchInputChange}
									value={this.state.searchTerm}
									placeholder="Search Nutritionists..."
								/>
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={10}>
						<Segment className="flex-container">
							{this.createNutritionistCards()}
						</Segment>
					</Grid.Column>
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
