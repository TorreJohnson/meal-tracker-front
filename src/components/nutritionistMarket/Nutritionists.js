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
		let left = [];
		let right = [];
		let i = 1;
		this.filterNutritionistsForSearchTerms().map(nutritionist => {
			if (i % 2 === 0) {
				right.push(
					<NutritionistCard nutritionist={nutritionist} key={cuid()} />
				);
				i++;
			} else {
				left.push(
					<NutritionistCard nutritionist={nutritionist} key={cuid()} />
				);
				i++;
			}
		});
		return (
			<div>
				<Grid>
					<Grid.Row>
						<Grid.Column width={8}>{left}</Grid.Column>
						<Grid.Column width={8}>{right}</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
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
			nutritionists = this.state.nutritionists;
		} else {
			nutritionists = this.state.nutritionists.filter(
				nutritionist => nutritionist.accepts_new_patients
			);
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
						<Menu fluid vertical>
							<Menu.Item
								name="all"
								active={activeItem === "all"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "all" ? (
									<Label color="teal">{this.countNutritionists()}</Label>
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
									<Label color="teal">
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
									placeholder="Search mail..."
								/>
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={10}>
						<Segment>{this.createNutritionistCards()}</Segment>
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
