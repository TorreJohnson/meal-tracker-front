export default function reducer(
	state = {
		currentUser: null,
		loggedIn: false,
		items: []
	},
	action
) {
	switch (action.type) {
		case "ADD_NUTRIENTS":
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case "GET_USER":
			return {
				...state,
				currentUser: action.payload,
				loggedIn: true
			};
		case "LOG_OUT":
			return {
				...state,
				currentUser: null,
				loggedIn: false
			};
		default:
			return { ...state };
	}
}
