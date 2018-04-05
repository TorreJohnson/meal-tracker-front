import React from "react";
import { connect } from "react-redux";
import { fetchNutrients } from "./actions/FetchNutrientValues";

class Home extends React.Component {
	componentDidMount() {
		this.props.fetchNutrients(this.props.upc);
	}
	render() {
		return (
			<div>
				<p>Mounted</p>
			</div>
		);
	}
}

export default connect(
	state => {
		return {
			upc: state.upc
		};
	},
	{ fetchNutrients }
)(Home);
