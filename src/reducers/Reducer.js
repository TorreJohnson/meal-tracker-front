export default function reducer(
	state = {
		user: {},
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
		default:
			return { ...state };
	}
}
