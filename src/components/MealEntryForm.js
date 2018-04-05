import React from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";

class MealEntryForm extends React.Component {
	state = {
		items: [],
		upc1: "",
		quantity1: "",
		unitType1: "",
		rows: ["row"]
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

	handleUpcChange = e => {
		this.setState({
			upc1: e.target.value
		});
	};

	handleQuantityChange = (e, value) => {
		this.setState({
			quantity1: value.value
		});
	};

	handleUnitChange = (e, value) => {
		this.setState({
			unitType1: value.value,
			items: [
				...this.state.items,
				{
					upc: this.state.upc1,
					quantity: this.state.quantity1,
					unit: value.value
				}
			]
		});
	};

	handleClick = () => {
		console.log("clicked");
		this.setState({
			rows: [...this.state.rows, "row"]
		});
	};

	addRow = () => {
		return this.state.rows.map(row => {
			return (
				<Form.Group widths="equal">
					<Form.Input
						fluid
						label="UPC Code"
						name="upc1"
						onChange={this.handleUpcChange}
						placeholder="UPC..."
					/>
					<Form.Select
						fluid
						label="Quantity"
						name="quantity1"
						onChange={this.handleQuantityChange}
						options={this.quantityOptions}
						placeholder="Quantity"
					/>
					<Form.Select
						fluid
						label="Unit of Measurement"
						name="unitType1"
						onChange={this.handleUnitChange}
						options={this.unitOptions}
						placeholder="Unit"
					/>
				</Form.Group>
			);
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		console.log("hitting handleSubmit");
		this.props.dispatch({
			type: "ADD_NUTRIENTS",
			payload: {
				nutrients: this.state.items
			}
		});
	};

	render() {
		console.log(this.state);
		return (
			<div>
				<Button onClick={this.handleClick}>Add Another Item</Button>
				<Form onSubmit={this.handleSubmit}>
					<this.addRow />
					<Form.Button>Submit</Form.Button>
				</Form>
			</div>
		);
	}
}

export default connect(null)(MealEntryForm);
