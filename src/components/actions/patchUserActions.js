// patches the backend either creating or deleting a relationship between
// users and a nutritionist, which is a one (user) to many (nutritionist)
// relationship. sends response from backend to reducer to update state.
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
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
			})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_NUTRITIONIST",
					payload: response.nutritionist_id
				});
			})
			.catch(console.log);
	};
}

// patches user information after they have edited their profile. sends backend
// response to reducer so that state can be updated.
export function updateUser(payload, jwt) {
	return dispatch => {
		const {
			address,
			id,
			name,
			username,
			email,
			address,
			birthday,
			weight,
			height,
			goal,
			profilePhoto
		} = payload;
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${
				process.env.REACT_APP_GOOGLE_API_KEY
			}`
		)
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
			})
			.then(res => res.json())
			.then(response => {
				fetch(
					`https://peaceful-beyond-60313.herokuapp.com/api/v1/users/${id}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json",
							Authorization: jwt
						},
						body: JSON.stringify({
							name: name,
							username: username,
							email: email,
							address: address,
							birthday: birthday,
							weight: weight,
							height: height,
							goal: goal,
							profile_photo: profilePhoto,
							latitude: response.results[0].geometry.location.lat,
							longitude: response.results[0].geometry.location.lng
						})
					}
				)
					.then(res => {
						if (!res.ok) {
							throw Error(res.statusText);
						}
						return res;
					})
					.then(res => res.json())
					.then(response => {
						dispatch({
							type: "UPDATE_USER",
							payload: response
						});
					})
					.catch(console.log);
			})
			.catch(console.log);
	};
}

// patches recommendations from a nutritionist to a user in the backend and
// sends response to reducer to update state.
export function sendUserRecNutrients(payload) {
	return dispatch => {
		fetch(
			`https://peaceful-beyond-60313.herokuapp.com/api/v1/users/${payload.id}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					accept: "application/json"
				},
				body: JSON.stringify(payload.nutrients)
			}
		)
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
			})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_CLIENT",
					payload: response
				});
			})
			.catch(console.log);
	};
}
