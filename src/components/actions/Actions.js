import { config } from "../../config.js";

export function fetchNutrients(action, userId, NdbNos, history) {
	return dispatch => {
		let id = config.id;
		let key = config.key;
		if (action.payload.itemName.length) {
			fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
				method: "POST",
				headers: {
					"x-app-id": id,
					"x-app-key": key,
					"content-type": "application/json",
					accept: "application/json",
					"x-remote-user-id": "0"
				},
				body: JSON.stringify({
					query: `${action.payload.quantity} ${action.payload.unit} ${
						action.payload.itemName
					}`,
					timezone: "US/Eastern"
				})
			})
				.then(res => res.json())
				.then(json => {
					let nutrients = {};
					json.foods[0].full_nutrients.forEach(nutrient => {
						nutrients = Object.assign({}, nutrients, {
							[NdbNos[nutrient.attr_id]]: nutrient.value
						});
					});
					let body = {
						food_item: {
							user_id: userId,
							meal_type: "lunch",
							date: new Date(),
							name: json.foods[0].food_name,
							upc: action.payload.upc,
							measurement: action.payload.unit,
							quantity: action.payload.quantity,
							beta_carotene: nutrients.beta_carotene || 0,
							caffeine: nutrients.caffeine || 0,
							calcium: nutrients.calcium || 0,
							carbohydrate: nutrients.carbohydrate || 0,
							cholesterol: nutrients.cholesterol || 0,
							calories: nutrients.calories || 0,
							fat: nutrients.fat || 0,
							fiber: nutrients.fiber || 0,
							folic_acid: nutrients.folic_acid || 0,
							iron: nutrients.iron || 0,
							niacin: nutrients.niacin || 0,
							potassium: nutrients.potassium || 0,
							protein: nutrients.protein || 0,
							riboflavin: nutrients.riboflavin || 0,
							sodium: nutrients.sodium || 0,
							sugars: nutrients.sugars || 0,
							thiamin: nutrients.thiamin || 0,
							vitamin_a: nutrients.vitamin_a || 0,
							vitamin_b12: nutrients.vitamin_b12 || 0,
							vitamin_c: nutrients.vitamin_c || 0,
							vitamin_d: nutrients.vitamin_d || 0,
							vitamin_e: nutrients.vitamin_e || 0,
							vitamin_k: nutrients.vitamin_k || 0,
							zinc: nutrients.zinc || 0,
							image: json.foods[0].photo.thumb,
							high_res: json.foods[0].photo.highres,
							serving: json.foods[0].serving_qty,
							serving_unit: json.foods[0].serving_unit,
							serving_in_grams: json.foods[0].serving_weight_grams,
							brand: json.foods[0].brand_name,
							ndbno: json.foods[0].ndb_no
						}
					};
					fetch("http://localhost:3000/api/v1/food_items", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json"
						},
						body: JSON.stringify(body)
					})
						.then(res => res.json())
						.then(response => {
							console.log(response);
							dispatch({
								type: "ADD_NUTRIENTS",
								payload: response
							});
						})
						.then(() => {
							history.push("/");
						});
				});
		} else {
			fetch(
				`https://trackapi.nutritionix.com/v2/search/item?upc=${
					action.payload.upc
				}`,
				{
					headers: {
						"x-app-id": id,
						"x-app-key": key,
						"content-type": "application/json",
						accept: "application/json",
						"x-remote-user-id": "0"
					}
				}
			)
				.then(res => res.json())
				.then(json => {
					let nutrients = {};
					json.foods[0].full_nutrients.forEach(nutrient => {
						nutrients = Object.assign({}, nutrients, {
							[NdbNos[nutrient.attr_id]]:
								nutrient.value * action.payload.servings
						});
					});
					let body = {
						food_item: {
							user_id: userId,
							meal_type: "lunch",
							date: new Date(),
							name: json.foods[0].food_name,
							upc: action.payload.upc,
							measurement: action.payload.unit,
							quantity: action.payload.quantity,
							beta_carotene: nutrients.beta_carotene || 0,
							caffeine: nutrients.caffeine || 0,
							calcium: nutrients.calcium || 0,
							carbohydrate: nutrients.carbohydrate || 0,
							cholesterol: nutrients.cholesterol || 0,
							calories: nutrients.calories || 0,
							fat: nutrients.fat || 0,
							fiber: nutrients.fiber || 0,
							folic_acid: nutrients.folic_acid || 0,
							iron: nutrients.iron || 0,
							niacin: nutrients.niacin || 0,
							potassium: nutrients.potassium || 0,
							protein: nutrients.protein || 0,
							riboflavin: nutrients.riboflavin || 0,
							sodium: nutrients.sodium || 0,
							sugars: nutrients.sugars || 0,
							thiamin: nutrients.thiamin || 0,
							vitamin_a: nutrients.vitamin_a || 0,
							vitamin_b12: nutrients.vitamin_b12 || 0,
							vitamin_c: nutrients.vitamin_c || 0,
							vitamin_d: nutrients.vitamin_d || 0,
							vitamin_e: nutrients.vitamin_e || 0,
							vitamin_k: nutrients.vitamin_k || 0,
							zinc: nutrients.zinc || 0,
							image: json.foods[0].photo.thumb,
							high_res: json.foods[0].photo.highres,
							serving: json.foods[0].serving_qty,
							serving_unit: json.foods[0].serving_unit,
							serving_in_grams: json.foods[0].serving_weight_grams,
							brand: json.foods[0].brand_name,
							ndbno: json.foods[0].ndb_no
						}
					};
					fetch("http://localhost:3000/api/v1/food_items", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json"
						},
						body: JSON.stringify(body)
					})
						.then(res => res.json())
						.then(response => {
							console.log(response);
							dispatch({
								type: "ADD_NUTRIENTS",
								payload: response
							});
						})
						.then(() => {
							history.push("/");
						});
				});
		}
	};
}

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

export function logIn(username, name, password, history) {
	return dispatch => {
		fetch("http://localhost:3000/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({ username, name, password })
		})
			.then(res => res.json())
			.then(response => {
				if (response.error) {
					alert(response.error);
				} else {
					localStorage.setItem("token", response.jwt);
					dispatch({
						type: "GET_USER",
						payload: response
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

export function postMessage(payload, currentUser, nutritionistLoggedIn) {
	return dispatch => {
		let body;
		if (nutritionistLoggedIn) {
			body = {
				user_id: payload.clientId,
				nutritionist_id: currentUser.id,
				subject: payload.subject,
				body: payload.body,
				sender_type: "nutritionist",
				sender_id: currentUser.id,
				parent_message: payload.parent_message
			};
			console.log(body);
		} else {
			body = {
				user_id: currentUser.id,
				nutritionist_id: currentUser.nutritionist_id,
				subject: payload.subject,
				body: payload.body,
				sender_type: "user",
				sender_id: currentUser.id,
				parent_message: payload.parent_message
			};
		}
		fetch("http://localhost:3000/api/v1/messages", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "ADD_MESSAGE",
					payload: response
				});
			});
	};
}

export function hireFireNutritionist(currentUser, nutritionistId) {
	return dispatch => {
		let body;
		if (currentUser.nutritionist_id) {
			if (currentUser.nutritionist_id === nutritionistId) {
				body = { nutritionist_id: null };
			} else if (currentUser.nutritionist_id !== nutritionistId) {
				alert("You already have a nutritionist");
			}
		} else {
			body = { nutritionist_id: nutritionistId };
		}
		fetch(`http://localhost:3000/api/v1/users/${currentUser.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_NUTRITIONIST",
					payload: response.nutritionist_id
				});
			});
	};
}

export function fetchClients(id) {
	return dispatch => {
		fetch(`http://localhost:3000/api/v1/get_users/${id}`, {
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			}
		})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "ADD_CLIENTS",
					payload: response
				});
			});
	};
}
