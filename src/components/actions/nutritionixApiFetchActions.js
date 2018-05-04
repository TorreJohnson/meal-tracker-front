export function fetchNutrients(action, userId, NdbNos, history) {
	return dispatch => {
		let id = process.env.REACT_APP_NUTRITIONIX_ID;
		let key = process.env.REACT_APP_NUTRITIONIX_KEY;
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
					query: `${action.payload.quantity} ${action.payload.unit} ${
						action.payload.itemName
					}`,
					timezone: "US/Eastern"
				})
			})
				.then(res => res.json())
				.then(json => {
					if (json.foods) {
						let nutrients = {};
						json.foods[0].full_nutrients.forEach(nutrient => {
							nutrients = Object.assign({}, nutrients, {
								[NdbNos[nutrient.attr_id]]: nutrient.value
							});
						});
						let capitalizedWord = json.foods[0].food_name
							.split("_")
							.map(word => word[0].toUpperCase() + word.slice(1))
							.join(" ");
						let body = {
							food_item: {
								user_id: userId,
								meal_type: "lunch",
								date: new Date(),
								name: capitalizedWord,
								upc: action.payload.upc,
								measurement: action.payload.unit,
								quantity: action.payload.quantity,
								beta_carotene: nutrients.beta_carotene || 0,
								caffeine: nutrients.caffeine || 0,
								calcium: nutrients.calcium || 0,
								carbohydrate: nutrients.carbohydrate || 0,
								cholesterol: nutrients.cholesterol || 0,
								calories: nutrients.calories || 0,
								fat: nutrients.fat || 0,
								fiber: nutrients.fiber || 0,
								folic_acid: nutrients.folic_acid || 0,
								iron: nutrients.iron || 0,
								niacin: nutrients.niacin || 0,
								potassium: nutrients.potassium || 0,
								protein: nutrients.protein || 0,
								riboflavin: nutrients.riboflavin || 0,
								sodium: nutrients.sodium || 0,
								sugars: nutrients.sugars || 0,
								thiamin: nutrients.thiamin || 0,
								vitamin_a: nutrients.vitamin_a || 0,
								vitamin_b12: nutrients.vitamin_b12 || 0,
								vitamin_c: nutrients.vitamin_c || 0,
								vitamin_d: nutrients.vitamin_d || 0,
								vitamin_e: nutrients.vitamin_e || 0,
								vitamin_k: nutrients.vitamin_k || 0,
								zinc: nutrients.zinc || 0,
								image: json.foods[0].photo.thumb,
								high_res: json.foods[0].photo.highres,
								serving: json.foods[0].serving_qty,
								serving_unit: json.foods[0].serving_unit,
								serving_in_grams: json.foods[0].serving_weight_grams,
								brand: json.foods[0].brand_name,
								ndb_no: json.foods[0].ndb_no,
								ingredients: json.foods[0].nf_ingredient_statement
							}
						};
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
							.then(res => res.json())
							.then(response => {
								dispatch({
									type: "ADD_NUTRIENTS",
									payload: response
								});
							})
							.then(() => {
								history.push("/");
							});
					} else {
						alert("Please check Spelling");
					}
				});
		} else {
			fetch(
				`https://trackapi.nutritionix.com/v2/search/item?upc=${
					action.payload.upc
				}`,
				{
					headers: {
						"x-app-id": id,
						"x-app-key": key,
						"content-type": "application/json",
						accept: "application/json",
						"x-remote-user-id": "0"
					}
				}
			)
				.then(res => res.json())
				.then(json => {
					let nutrients = {};
					if (json.foods) {
						json.foods[0].full_nutrients.forEach(nutrient => {
							nutrients = Object.assign({}, nutrients, {
								[NdbNos[nutrient.attr_id]]:
									nutrient.value * action.payload.servings
							});
						});
						let body = {
							food_item: {
								user_id: userId,
								meal_type: "lunch",
								date: new Date(),
								name: json.foods[0].food_name,
								upc: action.payload.upc,
								measurement: action.payload.unit,
								quantity: action.payload.quantity,
								beta_carotene: nutrients.beta_carotene || 0,
								caffeine: nutrients.caffeine || 0,
								calcium: nutrients.calcium || 0,
								carbohydrate: nutrients.carbohydrate || 0,
								cholesterol: nutrients.cholesterol || 0,
								calories: nutrients.calories || 0,
								fat: nutrients.fat || 0,
								fiber: nutrients.fiber || 0,
								folic_acid: nutrients.folic_acid || 0,
								iron: nutrients.iron || 0,
								niacin: nutrients.niacin || 0,
								potassium: nutrients.potassium || 0,
								protein: nutrients.protein || 0,
								riboflavin: nutrients.riboflavin || 0,
								sodium: nutrients.sodium || 0,
								sugars: nutrients.sugars || 0,
								thiamin: nutrients.thiamin || 0,
								vitamin_a: nutrients.vitamin_a || 0,
								vitamin_b12: nutrients.vitamin_b12 || 0,
								vitamin_c: nutrients.vitamin_c || 0,
								vitamin_d: nutrients.vitamin_d || 0,
								vitamin_e: nutrients.vitamin_e || 0,
								vitamin_k: nutrients.vitamin_k || 0,
								zinc: nutrients.zinc || 0,
								image: json.foods[0].photo.thumb,
								high_res: json.foods[0].photo.highres,
								serving: json.foods[0].serving_qty,
								serving_unit: json.foods[0].serving_unit,
								serving_in_grams: json.foods[0].serving_weight_grams,
								brand: json.foods[0].brand_name,
								ndb_no: json.foods[0].ndb_no,
								ingredients: json.foods[0].nf_ingredient_statement
							}
						};
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
							.then(res => res.json())
							.then(response => {
								dispatch({
									type: "ADD_NUTRIENTS",
									payload: response
								});
							})
							.then(() => {
								history.push("/");
							});
					} else {
						alert("Please check UPC Code");
					}
				});
		}
	};
}
