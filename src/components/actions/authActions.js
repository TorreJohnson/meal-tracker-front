// allows a new user to sign up for an account and finds their location
// coordinates through google maps api fetch. sets their account as either a
// client or nutritionist depending on which portal they signed up on. adds a
// JWT token to user's browser. redirects user to home page.
export function signUp(payload, history, nutritionist) {
	return dispatch => {
		const {
			name,
			username,
			password,
			age,
			weight,
			bmi,
			address,
			goal,
			profilePhoto,
			height,
			birthday,
			email,
			officeAddress,
			acceptingPatients,
			bio,
			companyName
		} = payload;
		if (nutritionist) {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${
					payload.officeAddress
				}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
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
						"https://peaceful-beyond-60313.herokuapp.com/api/v1/nutritionists",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								accept: "application/json"
							},
							body: JSON.stringify({
								name: name,
								email: email,
								password: password,
								office_address: officeAddress,
								accepts_new_patients: acceptingPatients,
								biography: bio,
								profile_photo: profilePhoto,
								company_name: companyName,
								office_latitude: response.results[0].geometry.location.lat,
								office_longitude: response.results[0].geometry.location.lng
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
							localStorage.setItem("token", response.jwt);
							dispatch({
								type: "GET_USER",
								payload: response.user
							});
						})
						.then(() => {
							history.push("/");
						})
						.catch(console.log);
				});
		} else {
			fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?address=${
					payload.address
				}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
			)
				.then(res => {
					if (!res.ok) {
						throw Error(res.statusText);
					}
					return res;
				})
				.then(res => res.json())
				.then(response => {
					fetch("https://peaceful-beyond-60313.herokuapp.com/api/v1/signup", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							accept: "application/json"
						},
						body: JSON.stringify({
							name: name,
							username: username,
							password: password,
							age: age,
							weight: weight,
							bmi: bmi,
							address: address,
							goal: goal,
							profile_photo: profilePhoto,
							height: height,
							birthday: birthday,
							email: email,
							latitude: response.results[0].geometry.location.lat,
							longitude: response.results[0].geometry.location.lng
						})
					})
						.then(res => {
							if (!res.ok) {
								throw Error(res.statusText);
							}
							return res;
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
						})
						.catch(console.log);
				});
		}
	};
}

// checks database for user and if credentials are in order assigns user a
// JWT token. otherwise user receives an alert with the error returned from
// log in attempt. redirects user to home page.
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
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
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
			})
			.catch(console.log);
	};
}

// fetches user information based on JWT token found in local storage and sends
// user information to reducer so that state can be updated. redirects user to
// home page.
export function getUser(jwt, history) {
	return dispatch => {
		fetch("https://peaceful-beyond-60313.herokuapp.com/api/v1/get_user", {
			headers: {
				Authorization: jwt
			}
		})
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
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
			})
			.catch(console.log);
	};
}

// removes JWT token from local storage and redirects user to the login page.
export function logOut(history) {
	return dispatch => {
		localStorage.clear();
		dispatch({
			type: "LOG_OUT"
		});
		history.push("/login");
	};
}
