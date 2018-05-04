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
		fetch("https://peaceful-beyond-60313.herokuapp.com/api/v1/messages", {
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
		fetch(
			`https://peaceful-beyond-60313.herokuapp.com/api/v1/messages/${
				payload.id
			}`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					accept: "application/json"
				},
				body: JSON.stringify({
					read: payload.read
				})
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_MESSAGE",
					payload: response
				});
			});
	};
}
