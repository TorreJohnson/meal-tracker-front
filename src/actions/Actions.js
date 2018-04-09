import { config } from "../config.js";

export const fetchNutrients = action => {
	return dispatch => {
		let id = config.id;
		let key = config.key;
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

export function signUp(name, username, password, history) {
	return dispatch => {
		fetch("http://localhost:3000/api/v1/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({ name, username, password })
		})
			.then(res => res.json())
			.then(response => {
				localStorage.setItem("token", response.jwt);
				dispatch({
					type: "GET_USER",
					payload: response.user
				});
			})
			.then(() => {
				history.push("/");
			});
	};
}

export function logIn(username, password, history) {
	return dispatch => {
		fetch("http://localhost:3000/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({ username, password })
		})
			.then(res => res.json())
			.then(response => {
				if (response.error) {
					alert(response.error);
				} else {
					localStorage.setItem("token", response.jwt);
					dispatch({
						type: "GET_USER",
						payload: response.user
					});
				}
			})
			.then(() => {
				history.push("/");
			});
	};
}

export function getUser(jwt, history) {
	return dispatch => {
		fetch("http://localhost:3000/api/v1/get_user", {
			headers: {
				Authorization: jwt
			}
		})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "GET_USER",
					payload: response
				});
			})
			.then(() => {
				history.push("/");
			});
	};
}

export function logOut(history) {
	return dispatch => {
		localStorage.clear();
		dispatch({
			type: "LOG_OUT"
		});
		history.push("/login");
	};
}
