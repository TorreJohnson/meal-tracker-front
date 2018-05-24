// when a nutritionist logs in, the app fetches the user information for all
// of their clients one at a time and sends it to ther reducer to be set in
// state
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
			.then(res => {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res;
			})
			.then(res => res.json())
			.then(response => {
				dispatch({
					type: "ADD_CLIENTS",
					payload: response
				});
			})
			.catch(console.log);
	};
}
