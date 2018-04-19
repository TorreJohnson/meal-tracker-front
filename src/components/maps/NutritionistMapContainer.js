import React from "react";
import NutritionistMap from "./NutritionistMap";

export default class NutritionistMapContainer extends React.Component {
	render() {
		return (
			<div
				style={{
					height: "28vh",
					width: "100%",
					display: "flex",
					flexFlow: "row nowrap",
					justifyContent: "center",
					padding: 0
				}}
			>
				<NutritionistMap nutritionist={this.props.nutritionist} isMarkerShown />
			</div>
		);
	}
}
