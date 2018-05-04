export function fetchClients(id, jwt) {
	return dispatch => {
		fetch(
			`https://peaceful-beyond-60313.herokuapp.com/api/v1/get_users/${id}`,
			{
				headers: {
					"Content-Type": "application/json",
					accept: "application/json",
					Authorization: jwt
				}
			}
		)
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "ADD_CLIENTS",
					payload: response
				});
			});
	};
}
