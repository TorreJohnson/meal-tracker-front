import React from "react";
import { compose, withProps } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";

const NutritionistMap = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
			process.env.REACT_APP_GOOGLE_API_KEY
		}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: (
			<div
				style={{
					width: "100%",
					height: "100%",
					marginLeft: 0
				}}
			/>
		),
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap
)(props => {
	return (
		<GoogleMap
			defaultZoom={15}
			center={{
				lat: props.nutritionist.office_latitude,
				lng: props.nutritionist.office_longitude
			}}
		>
			{props.isMarkerShown && (
				<Marker
					position={{
						lat: props.nutritionist.office_latitude,
						lng: props.nutritionist.office_longitude
					}}
				/>
			)}
		</GoogleMap>
	);
});

export default NutritionistMap;
