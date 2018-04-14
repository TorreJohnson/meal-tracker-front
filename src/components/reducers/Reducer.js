export default function reducer(
	state = {
		currentUser: null,
		loggedIn: false,
		nutritionistLoggedIn: false,
		clients: []
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
			if (action.payload.user && action.payload.user.username) {
				let payloadObj = action.payload.user;
				payloadObj.food_items = action.payload.food_items;
				payloadObj.messages = action.payload.messages;
				return {
					...state,
					currentUser: payloadObj,
					loggedIn: true,
					nutritionistLoggedIn: false
				};
			} else if (action.payload.username) {
				return {
					...state,
					currentUser: action.payload,
					loggedIn: true,
					nutritionistLoggedIn: false
				};
			} else if (action.payload.user) {
				let payloadObj = action.payload.user;
				payloadObj.messages = action.payload.messages;
				return {
					...state,
					currentUser: payloadObj,
					loggedIn: true,
					nutritionistLoggedIn: true
				};
			} else if (action.payload) {
				return {
					...state,
					currentUser: action.payload,
					loggedIn: true,
					nutritionistLoggedIn: true
				};
			} else {
				return { ...state };
			}

		case "LOG_OUT":
			return {
				...state,
				currentUser: null,
				loggedIn: false,
				nutritionistLoggedIn: false,
				clients: []
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
		case "ADD_CLIENTS":
			return {
				...state,
				clients: [...state.clients, ...action.payload]
			};
		case "UPDATE_MESSAGE":
			let index = state.currentUser.messages.findIndex(
				message => message.id === action.payload.id
			);
			return {
				...state,
				currentUser: {
					...state.currentUser,
					messages: [
						...state.currentUser.messages.slice(0, index),
						action.payload,
						...state.currentUser.messages.slice(index + 1)
					]
				}
			};
		case "UPDATE_USER":
			return {
				...state,
				currentUser: action.payload
			};
		default:
			return { ...state };
	}
}
