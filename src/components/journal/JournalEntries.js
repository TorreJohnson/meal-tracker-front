import React from "react";
import { connect } from "react-redux";
import JournalEntryCard from "./JournalEntryCards";
import cuid from "cuid";
import { Message } from "semantic-ui-react";

class JournalEntries extends React.Component {
	createFoodItemCards = () => {
		let filteredEntries = this.props.currentUser.food_items.filter(item => {
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
			return filteredEntries
				.sort((a, b) => b.id - a.id)
				.map(item => <JournalEntryCard key={cuid()} foodItem={item} />);
		} else {
			return <Message floating>No Items Found</Message>;
		}
	};

	render() {
		return (
			<div className="flex-container">
				<this.createFoodItemCards />
			</div>
		);
	}
}

export default connect(state => {
	return { currentUser: state.currentUser };
})(JournalEntries);
