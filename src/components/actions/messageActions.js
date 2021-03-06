// posts a new message to the backend server for persistence and then sends
// response to reducer and added to state.
export function postMessage(payload, currentUser, nutritionistLoggedIn) {
	return dispatch => {
		const { clientId, subject, body, parent_message } = payload;
		let body;
		if (nutritionistLoggedIn) {
			body = {
				user_id: clientId,
				nutritionist_id: currentUser.id,
				subject: subject,
				body: body,
				sender_type: "nutritionist",
				sender_id: currentUser.id,
				parent_message: parent_message
			};
		} else {
			body = {
				user_id: currentUser.id,
				nutritionist_id: currentUser.nutritionist_id,
				subject: subject,
				body: body,
				sender_type: "user",
				sender_id: currentUser.id,
				parent_message: parent_message
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
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
			})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "ADD_MESSAGE",
					payload: response
				});
			})
			.catch(console.log);
	};
}

// posts whether message is marked as read or unread to the backend server for
// persistence and the response is sent to reducer so that state can be updated.
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
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
			})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "UPDATE_MESSAGE",
					payload: response
				});
			})
			.catch(console.log);
	};
}
