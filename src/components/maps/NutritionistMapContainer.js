import React from "react";
import NutritionistMap from "./NutritionistMap";

export default class NutritionistMapContainer extends React.Component {
	render() {
		return (
			<NutritionistMap nutritionist={this.props.nutritionist} isMarkerShown />
		);
	}
}
