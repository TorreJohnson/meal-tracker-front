import { config } from "../config.js";

let id = config.id;
let key = config.key;

export const fetchNutrients = action => {
	return dispatch => {
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
			`https://trackapi.nutritionix.com/v2/search/item?upc=${
				action.payload.upc
			}`,
			options
		)
			.then(res => res.json())
			.then(json => {
				console.log(json);
				let payload = {
					upc: action.payload.upc,
					quantity: action.payload.quantity,
					type: action.payload.type,
					image: json.foods[0].photo.thumb,
					ingredients: json.foods[0].nf_ingredient_statement,
					brand: json.foods[0].brand_name,
					name: json.foods[0].food_name,
					serving: json.foods[0].serving_qty,
					unit: json.foods[0].serving_unit,
					servingInGrams: json.foods[0].serving_weight_grams,
					ndbno: json.foods[0].ndb_no,
					nutrients: json.foods[0].full_nutrients
				};
				dispatch({
					type: "ADD_NUTRIENTS",
					payload
				});
			});
	};
};
