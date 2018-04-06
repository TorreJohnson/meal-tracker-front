import { config } from "../config.js";

let id = config.id;
let key = config.key;

export const fetchNutrients = upc => {
	return dispatch => {
		dispatch({
			type: "LOADING"
		});
		let options = {
			headers: {
				"x-app-id": id,
				"x-app-key": key,
				"content-type": "application/json",
				accept: "application/json",
				"x-remote-user-id": "0"
			}
		};
		return fetch(
			`https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`,
			options
		)
			.then(res => res.json())
			.then(json => {
				let payload = { nutrients: json.foods[0].full_nutrients };
				dispatch({
					type: "ADD_NUTRIENTS",
					payload
				});
			});
	};
};
