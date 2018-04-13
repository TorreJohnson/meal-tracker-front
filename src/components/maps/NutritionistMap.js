import React from "react";
import { compose, withProps } from "recompose";
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker
} from "react-google-maps";
import { config } from "../../config.js";

const NutritionistMap = compose(
	withProps({
		googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
			config.googleApiKey
		}&v=3.exp&libraries=geometry,drawing,places`,
		loadingElement: <div style={{ height: `100%` }} />,
		containerElement: <div style={{ height: `300px`, width: `300px` }} />,
		mapElement: <div style={{ height: `100%` }} />
	}),
	withScriptjs,
	withGoogleMap
)(props => {
	console.log(props);
	return (
		<GoogleMap
			defaultZoom={14}
			center={{
				lat: props.nutritionist.office_longitude,
				lng: props.nutritionist.office_latitude
			}}
		>
			{props.isMarkerShown && (
				<Marker
					position={{
						lat: props.nutritionist.office_longitude,
						lng: props.nutritionist.office_latitude
					}}
				/>
			)}
		</GoogleMap>
	);
});

export default NutritionistMap;
