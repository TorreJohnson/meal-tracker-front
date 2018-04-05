export default function reducer(
	state = {
		user: {},
		upc: "021908743295",
		nutrients: []
	},
	action
) {
	switch (action.type) {
		case "ADD_NUTRIENTS":
			return {
				...state,
				nutrients: action.payload.nutrients
			};
		default:
			return { ...state };
	}
}
