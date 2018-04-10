export default function reducer(
	state = {
		currentUser: null,
		loggedIn: false
	},
	action
) {
	switch (action.type) {
		case "ADD_NUTRIENTS":
			return {
				...state,
				currentUser: {
					...state.currentUser,
					food_items: [...state.currentUser.food_items, action.payload]
				}
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
		case "ADD_MESSAGE":
			return {
				...state,
				currentUser: {
					...state.currentUser,
					messages: [...state.currentUser.messages, action.payload]
				}
			};
		case "UPDATE_NUTRITIONIST":
			return {
				...state,
				currentUser: {
					...state.currentUser,
					nutritionist_id: action.payload
				}
			};
		default:
			return { ...state };
	}
}
