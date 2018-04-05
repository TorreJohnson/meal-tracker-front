import React from "react";
import { Form } from "semantic-ui-react";

class MealEntryForm extends React.Component {
	state = {
		items: [],
		upc1: "",
		quantity1: "",
		unitType1: ""
	};

	quantityOptions = [
		{ key: ".25", text: "1/4", value: 1 / 4 },
		{ key: ".33", text: "1/3", value: 1 / 3 },
		{ key: ".5", text: "1/2", value: 1 / 2 },
		{ key: ".66", text: "2/3", value: 2 / 3 },
		{ key: ".75", text: "3/4", value: 3 / 4 },
		{ key: "1", text: "1", value: 1 }
	];

	unitOptions = [
		{ key: "cup", text: "Cup", value: "cup" },
		{ key: "quart", text: "Quart", value: "quart" }
	];

	handleChange = (e, value) => {
		console.log(value);
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<Form>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="UPC Code"
							name="upc1"
							onChange={this.handleChange}
							value={this.state.upc1}
							placeholder="UPC..."
						/>
						<Form.Select
							fluid
							label="Quantity"
							name="quantity1"
							onChange={this.handleChange}
							value={this.state.quantity1}
							options={this.quantityOptions}
							placeholder="Quantity"
						/>
						<Form.Select
							fluid
							label="Unit of Measurement"
							name="unitType1"
							onChange={this.handleChange}
							value={this.state.unitType1}
							options={this.unitOptions}
							placeholder="Unit"
						/>
					</Form.Group>
					<Form.Button>Submit</Form.Button>
				</Form>
			</div>
		);
	}
}

export default MealEntryForm;
