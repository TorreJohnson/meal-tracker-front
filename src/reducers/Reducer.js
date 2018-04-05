export default function reducer(
	state = {
		user: {},
		upc: "02190874329",
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
