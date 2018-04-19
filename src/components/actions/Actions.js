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
					if (json.foods) {
						let nutrients = {};
						json.foods[0].full_nutrients.forEach(nutrient => {
							nutrients = Object.assign({}, nutrients, {
								[NdbNos[nutrient.attr_id]]: nutrient.value
							});
						});
						let capitalizedWord = json.foods[0].food_name
							.split("_")
							.map(word => word[0].toUpperCase() + word.slice(1))
							.join(" ");
						let body = {
							food_item: {
								user_id: userId,
								meal_type: "lunch",
								date: "2018-04-18",
								name: capitalizedWord,
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
								ndb_no: json.foods[0].ndb_no,
								ingredients: json.foods[0].nf_ingredient_statement
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
								dispatch({
									type: "ADD_NUTRIENTS",
									payload: response
								});
							})
							.then(() => {
								history.push("/");
							});
					} else {
						alert("Please check Spelling");
					}
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
					if (json.foods) {
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
								date: "2018-04-18",
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
								ndb_no: json.foods[0].ndb_no,
								ingredients: json.foods[0].nf_ingredient_statement
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
								dispatch({
									type: "ADD_NUTRIENTS",
									payload: response
								});
							})
							.then(() => {
								history.push("/");
							});
					} else {
						alert("Please check UPC Code");
					}
				});
		}
	};
}

export function signUp(payload, history, nutritionist) {
	return dispatch => {
		if (nutritionist) {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${
					payload.officeAddress
				}&key=${config.googleApiKey}`
			)
				.then(res => res.json())
				.then(response => {
					console.log(response);
					fetch("http://localhost:3000/api/v1/nutritionists", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json"
						},
						body: JSON.stringify({
							name: payload.name,
							email: payload.email,
							password: payload.password,
							office_address: payload.officeAddress,
							accepts_new_patients: payload.acceptingPatients,
							biography: payload.bio,
							profile_photo: payload.profilePhoto,
							company_name: payload.companyName,
							office_latitude: response.results[0].geometry.location.lat,
							office_longitude: response.results[0].geometry.location.lng
						})
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
				});
		} else {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${
					payload.address
				}&key=${config.googleApiKey}`
			)
				.then(res => res.json())
				.then(response => {
					fetch("http://localhost:3000/api/v1/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json"
						},
						body: JSON.stringify({
							name: payload.name,
							username: payload.username,
							password: payload.password,
							age: payload.age,
							weight: payload.weight,
							bmi: payload.bmi,
							address: payload.address,
							goal: payload.goal,
							profile_photo: payload.profilePhoto,
							height: payload.height,
							birthday: payload.birthday,
							email: payload.email,
							latitude: response.results[0].geometry.location.lat,
							longitude: response.results[0].geometry.location.lng
						})
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
				});
		}
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

export function updateReadMessage(payload) {
	return dispatch => {
		fetch(`http://localhost:3000/api/v1/messages/${payload.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({
				read: payload.read
			})
		})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_MESSAGE",
					payload: response
				});
			});
	};
}

export function hireFireNutritionist(currentUser, nutritionistId, jwt) {
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
				accept: "application/json",
				Authorization: jwt
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

export function fetchClients(id, jwt) {
	return dispatch => {
		fetch(`http://localhost:3000/api/v1/get_users/${id}`, {
			headers: {
				"Content-Type": "application/json",
				accept: "application/json",
				Authorization: jwt
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

export function updateUser(payload, jwt) {
	return dispatch => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${
				payload.address
			}&key=${config.googleApiKey}`
		)
			.then(res => res.json())
			.then(response => {
				fetch(`http://localhost:3000/api/v1/users/${payload.id}`, {
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						accept: "application/json",
						Authorization: jwt
					},
					body: JSON.stringify({
						name: payload.name,
						username: payload.username,
						email: payload.email,
						address: payload.address,
						birthday: payload.birthday,
						weight: payload.weight,
						height: payload.height,
						goal: payload.goal,
						profile_photo: payload.profilePhoto,
						latitude: response.results[0].geometry.location.lat,
						longitude: response.results[0].geometry.location.lng
					})
				})
					.then(res => res.json())
					.then(response => {
						dispatch({
							type: "UPDATE_USER",
							payload: response
						});
					});
			});
	};
}

export function sendUserRecNutrients(payload) {
	return dispatch => {
		console.log(payload);
		fetch(`http://localhost:3000/api/v1/users/${payload.id}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				accept: "application/json"
			},
			body: JSON.stringify({
				rec_beta_carotene: payload.rec_beta_carotene,
				rec_caffeine: payload.rec_caffeine,
				rec_calcium: payload.rec_calcium,
				rec_carbohydrate: payload.rec_carbohydrate,
				rec_cholesterol: payload.rec_cholesterol,
				rec_fat: payload.rec_fat,
				rec_fiber: payload.rec_fiber,
				rec_folic_acid: payload.rec_folic_acid,
				rec_iron: payload.rec_iron,
				rec_niacin: payload.rec_niacin,
				rec_potassium: payload.rec_potassium,
				rec_protein: payload.rec_protein,
				rec_riboflavin: payload.rec_riboflavin,
				rec_sodium: payload.rec_sodium,
				rec_sugars: payload.rec_sugars,
				rec_thiamin: payload.rec_thiamin,
				rec_vitamin_a: payload.rec_vitamin_a,
				rec_vitamin_b12: payload.rec_vitamin_b12,
				rec_vitamin_c: payload.rec_vitamin_c,
				rec_vitamin_d: payload.rec_vitamin_d,
				rec_vitamin_e: payload.rec_vitamin_e,
				rec_vitamin_k: payload.rec_vitamin_k,
				rec_zinc: payload.rec_zinc
			})
		})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_CLIENT",
					payload: response
				});
			});
	};
}
