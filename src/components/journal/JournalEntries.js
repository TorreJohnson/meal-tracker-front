import React from "react";
import { connect } from "react-redux";
import JournalEntryCard from "./JournalEntryCards";
import cuid from "cuid";
import { Message, Grid } from "semantic-ui-react";

class JournalEntries extends React.Component {
	createFoodItemCards = () => {
		let i = 1;
		let left = [];
		let right = [];
		let reversedEntries = [...this.props.currentUser.food_items.reverse()];
		let filteredEntries = reversedEntries.filter(item => {
			if (item.name && item.brand) {
				return (
					item.name.toLowerCase().includes(this.props.searchTerm) ||
					item.brand.toLowerCase().includes(this.props.searchTerm)
				);
			} else if (item.name) {
				return item.name.toLowerCase().includes(this.props.searchTerm);
			} else if (item.brand) {
				item.brand.toLowerCase().includes(this.props.searchTerm);
			}
		});
		if (filteredEntries.length) {
			filteredEntries.map(item => {
				if (i % 2 === 0) {
					right.push(<JournalEntryCard key={cuid()} foodItem={item} />);
					i++;
				} else {
					left.push(<JournalEntryCard key={cuid()} foodItem={item} />);
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
		} else {
			return <Message floating>No Items Found</Message>;
		}
	};

	render() {
		return (
			<div>
				<this.createFoodItemCards />
			</div>
		);
	}
}

export default connect(state => {
	return { currentUser: state.currentUser };
})(JournalEntries);
