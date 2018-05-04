export function signUp(payload, history, nutritionist) {
	return dispatch => {
		if (nutritionist) {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${
					payload.officeAddress
				}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
			)
				.then(res => res.json())
				.then(response => {
					console.log(response);
					fetch(
						"https://peaceful-beyond-60313.herokuapp.com/api/v1/nutritionists",
						{
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
						}
					)
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
				}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
			)
				.then(res => res.json())
				.then(response => {
					fetch("https://peaceful-beyond-60313.herokuapp.com/api/v1/signup", {
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
		fetch("https://peaceful-beyond-60313.herokuapp.com/api/v1/login", {
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
		fetch("https://peaceful-beyond-60313.herokuapp.com/api/v1/get_user", {
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
