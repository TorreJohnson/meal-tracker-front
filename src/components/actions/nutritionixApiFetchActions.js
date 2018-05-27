// indivual foods are sent to either the Nutritionix API endpoint for UPC
// codes or into Nutritionix API that parses natural langauge. Results are
// formatted and sent to backend for persistence. response from backend is
// sent to reducer so that it can be added to state.
export function fetchNutrients(action, userId, NdbNos, history) {
	return dispatch => {
		let id = process.env.REACT_APP_NUTRITIONIX_ID;
		let key = process.env.REACT_APP_NUTRITIONIX_KEY;
		// Set initial values of all nutrients to zero
		let nutrients = {
			beta_carotene: 0,
			caffeine: 0,
			calcium: 0,
			carbohydrate: 0,
			cholesterol: 0,
			calories: 0,
			fat: 0,
			fiber: 0,
			folic_acid: 0,
			iron: 0,
			niacin: 0,
			potassium: 0,
			protein: 0,
			riboflavin: 0,
			sodium: 0,
			sugars: 0,
			thiamin: 0,
			vitamin_a: 0,
			vitamin_b12: 0,
			vitamin_c: 0,
			vitamin_d: 0,
			vitamin_e: 0,
			vitamin_k: 0,
			zinc: 0
		};
		const { upc, unit, quantity, itemName } = action.payload;
		// POST to the nutritionix back end if the food item was
		// entered in as plain text
		if (action.payload.itemName.length) {
			fetch(`https://trackapi.nutritionix.com/v2/natural/nutrients`, {
				method: "POST",
				headers: {
					"x-app-id": id,
					"x-app-key": key,
					"content-type": "application/json",
					accept: "application/json",
					"x-remote-user-id": "0"
				},
				body: JSON.stringify({
					query: `${quantity} ${unit} ${itemName}`,
					timezone: "US/Eastern"
				})
			})
				.then(res => {
					if (!res.ok) {
						throw Error(res.statusText);
					}
					return res;
				})
				.then(res => res.json())
				.then(json => {
					// If a valid response was received from the Nutritionix API,
					// update nutrients object with values for the food item. If the
					// item does not have any values for a particular nutrient, the
					// value will stay at zero
					if (json.foods) {
						const {
							full_nutrients,
							food_name,
							photo,
							serving_qty,
							serving_unit,
							serving_weight_grams,
							brand_name,
							ndb_no,
							nf_ingredient_statement
						} = json.foods[0];
						full_nutrients.forEach(nutrient => {
							let nutrientName = NdbNos[nutrient.attr_id];
							if (nutrients.hasOwnProperty(nutrientName)) {
								nutrients = Object.assign({}, nutrients, {
									[nutrientName]: nutrient.value
								});
							}
						});
						let capitalizedWord = food_name
							.split("_")
							.map(word => word[0].toUpperCase() + word.slice(1))
							.join(" ");
						let body = {};
						body.food_item = Object.assign(
							{},
							{
								user_id: userId,
								meal_type: "lunch",
								date: new Date(),
								name: capitalizedWord,
								upc: upc,
								measurement: unit,
								quantity: quantity,
								image: photo.thumb,
								high_res: photo.highres,
								serving: serving_qty,
								serving_unit: serving_unit,
								serving_in_grams: serving_weight_grams,
								brand: brand_name,
								ndb_no: ndb_no,
								ingredients: nf_ingredient_statement
							},
							nutrients
						);
						// POST data about the food item to our back end
						fetch(
							"https://peaceful-beyond-60313.herokuapp.com/api/v1/food_items",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									accept: "application/json"
								},
								body: JSON.stringify(body)
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
									type: "ADD_NUTRIENTS",
									payload: response
								});
							})
							.then(() => {
								history.push("/");
							})
							.catch(console.log);
						// If the Nutritionix API returns with an error, the user is
						// advised to check their spelling
					} else {
						alert("Please check Spelling");
					}
				})
				.catch(console.log);
			// If the user has entered in a UPC code, the item will be sent to the
			// Nutritionix UPC endpoint
		} else {
			fetch(`https://trackapi.nutritionix.com/v2/search/item?upc=${upc}`, {
				headers: {
					"x-app-id": id,
					"x-app-key": key,
					"content-type": "application/json",
					accept: "application/json",
					"x-remote-user-id": "0"
				}
			})
				.then(res => {
					if (!res.ok) {
						throw Error(res.statusText);
					}
					return res;
				})
				.then(res => res.json())
				.then(json => {
					// If a valid response was received from the Nutritionix API,
					// update nutrients object with values for the food item. If the
					// item does not have any values for a particular nutrient, the
					// value will stay at zero
					if (json.foods) {
						const {
							full_nutrients,
							food_name,
							photo,
							serving_qty,
							serving_unit,
							serving_weight_grams,
							brand_name,
							ndb_no,
							nf_ingredient_statement
						} = json.foods[0];
						json.foods[0].full_nutrients.forEach(nutrient => {
							let nutrientName = NdbNos[nutrient.attr_id];
							if (nutrients.hasOwnProperty(nutrientName)) {
								nutrients = Object.assign({}, nutrients, {
									[nutrientName]: nutrient.value
								});
							}
						});
						let body = {};
						body.food_item = Object.assign(
							{},
							{
								user_id: userId,
								meal_type: "lunch",
								date: new Date(),
								name: food_name,
								upc: upc,
								measurement: unit,
								quantity: quantity,
								image: photo.thumb,
								high_res: photo.highres,
								serving: serving_qty,
								serving_unit: serving_unit,
								serving_in_grams: serving_weight_grams,
								brand: brand_name,
								ndb_no: ndb_no,
								ingredients: nf_ingredient_statement
							},
							nutrients
						);
						// POST data about the food item to our back end
						fetch(
							"https://peaceful-beyond-60313.herokuapp.com/api/v1/food_items",
							{
								method: "POST",
								headers: {
									"Content-Type": "application/json",
									accept: "application/json"
								},
								body: JSON.stringify(body)
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
									type: "ADD_NUTRIENTS",
									payload: response
								});
							})
							.then(() => {
								history.push("/");
							})
							.catch(console.log);
						// If the Nutritionix API returns with an error, the user is
						// advised to check their spelling
					} else {
						alert("Please check UPC Code");
					}
				})
				.catch(console.log);
		}
	};
}
