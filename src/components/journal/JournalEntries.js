import React from "react";
import { connect } from "react-redux";
import JournalEntryCard from "./JournalEntryCards";

class JournalEntries extends React.Component {
	createFoodItemCards = () => {
		return this.props.currentUser.food_items.map(item => (
			<JournalEntryCard foodItem={item} />
		));
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
