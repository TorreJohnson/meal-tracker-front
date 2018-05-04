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
		fetch(
			`https://peaceful-beyond-60313.herokuapp.com/api/v1/users/${
				currentUser.id
			}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					accept: "application/json",
					Authorization: jwt
				},
				body: JSON.stringify(body)
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_NUTRITIONIST",
					payload: response.nutritionist_id
				});
			});
	};
}

export function updateUser(payload, jwt) {
	return dispatch => {
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${
				payload.address
			}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
		)
			.then(res => res.json())
			.then(response => {
				fetch(
					`https://peaceful-beyond-60313.herokuapp.com/api/v1/users/${
						payload.id
					}`,
					{
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
					}
				)
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
		fetch(
			`https://peaceful-beyond-60313.herokuapp.com/api/v1/users/${payload.id}`,
			{
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
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_CLIENT",
					payload: response
				});
			});
	};
}
