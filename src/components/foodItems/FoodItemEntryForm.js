import React from "react";
import { Form, Button, Icon, Label, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchNutrients } from "../actions/Actions";
import { NdbNos } from "./NdbNos";
import withAuth from "../authentication/WithAuth";
import UpcCamera from "../Camera/UpcCamera";
import cuid from "cuid";

class FoodItemEntryForm extends React.Component {
	state = {
		items: [
			{
				upc: "",
				quantity: "",
				unit: "",
				key: ""
			}
		],
		rows: 1,
		scanning: false,
		cameraId: ""
	};

	componentDidMount() {
		if (!this.props.currentUser) {
			this.props.history.push("/login");
		}
	}

	quantityOptions = [
		{ key: ".25", text: "1/4", value: 1 / 4 },
		{ key: ".33", text: "1/3", value: 1 / 3 },
		{ key: ".5", text: "1/2", value: 1 / 2 },
		{ key: ".66", text: "2/3", value: 2 / 3 },
		{ key: ".75", text: "3/4", value: 3 / 4 },
		{ key: "1", text: "1", value: 1 },
		{ key: "1.25", text: "1 1/4", value: 5 / 4 },
		{ key: "1.33", text: "1 1/3", value: 4 / 3 },
		{ key: "1.5", text: "1 1/2", value: 3 / 2 },
		{ key: "1.66", text: "1 2/3", value: 5 / 3 },
		{ key: "1.75", text: "1 3/4", value: 7 / 4 },
		{ key: "2", text: "2", value: 2 },
		{ key: "2.25", text: "2 1/4", value: 9 / 4 },
		{ key: "2.33", text: "2 1/3", value: 7 / 3 },
		{ key: "2.5", text: "2 1/2", value: 5 / 2 },
		{ key: "2.66", text: "2 2/3", value: 8 / 3 },
		{ key: "2.75", text: "2 3/4", value: 11 / 4 },
		{ key: "3", text: "3", value: 3 },
		{ key: "3.25", text: "3 1/4", value: 13 / 4 },
		{ key: "3.33", text: "3 1/3", value: 10 / 3 },
		{ key: "3.5", text: "3 1/2", value: 7 / 2 },
		{ key: "3.66", text: "3 2/3", value: 11 / 3 },
		{ key: "3.75", text: "3 3/4", value: 15 / 8 },
		{ key: "4", text: "4", value: 4 },
		{ key: "5", text: "5", value: 5 },
		{ key: "6", text: "6", value: 6 },
		{ key: "7", text: "7", value: 7 },
		{ key: "8", text: "8", value: 8 },
		{ key: "9", text: "9", value: 9 },
		{ key: "10", text: "10", value: 10 },
		{ key: "11", text: "11", value: 11 },
		{ key: "12", text: "12", value: 12 },
		{ key: "13", text: "13", value: 13 },
		{ key: "14", text: "14", value: 14 },
		{ key: "15", text: "15", value: 15 },
		{ key: "16", text: "16", value: 16 }
	];

	unitOptions = [
		{ key: "teaspoon", text: "Teaspoon", value: "teaspoon" },
		{ key: "tablespoon", text: "Tablespoon", value: "tablespoon" },
		{ key: "cup", text: "Cup", value: "cup" },
		{ key: "pound", text: "Pound", value: "pound" },
		{ key: "fluid ounces", text: "Fluid Ounces", value: "fluid ounces" },
		{ key: "pint", text: "Pint", value: "pint" },
		{ key: "quart", text: "Quart", value: "quart" },
		{ key: "gallon", text: "Gallon", value: "gallon" },
		{ key: "piece", text: "Piece(s)", value: "piece" }
	];

	handleUpcChange = e => {
		let index = parseInt(e.target.name.slice(-1), 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					upc: e.target.value,
					quantity: this.state.items[index].quantity,
					unit: this.state.items[index].unit
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleQuantityChange = (e, value) => {
		let index = parseInt(value.name.slice(-1), 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					upc: this.state.items[index].upc,
					quantity: value.value,
					unit: this.state.items[index].unit
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleUnitChange = (e, value) => {
		let index = parseInt(value.name.slice(-1), 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					upc: this.state.items[index].upc,
					quantity: this.state.items[index].quantity,
					unit: value.value
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleAdditionalRowClick = e => {
		e.preventDefault();
		let key = cuid();
		this.setState({
			rows: this.state.rows + 1,
			items: [
				...this.state.items,
				{
					upc: "",
					quantity: "",
					unit: "",
					key: key
				}
			]
		});
	};

	addRow = () => {
		let rows = [];
		for (let i = 0; i < this.state.rows; i++) {
			rows.push(
				<Form.Group widths="equal" key={this.state.items[i].key}>
					<Icon
						name="camera"
						circular
						id={i}
						onClick={this.handleCameraButtonToggle}
					/>
					<Form.Input
						fluid
						name={`upc${i}`}
						onChange={this.handleUpcChange}
						value={this.state.items[i].upc}
						placeholder="UPC..."
					/>
					{/*}<Form.Select
						fluid
						label="Quantity"
						name={`quantity${i}`}
						onChange={this.handleQuantityChange}
						options={this.quantityOptions}
						value={this.state.items[i].quantity}
						placeholder="Quantity"
					/>*/}
					<Dropdown
						placeholder="Quantity"
						fluid
						search
						selection
						label="Quantity"
						name={`quantity${i}`}
						onChange={this.handleQuantityChange}
						options={this.quantityOptions}
						value={this.state.items[i].quantity}
						placeholder="Quantity"
					/>
					<Dropdown
						placeholder="Quantity"
						fluid
						search
						selection
						label="Unit of Measurement"
						name={`unit${i}`}
						onChange={this.handleUnitChange}
						options={this.unitOptions}
						value={this.state.items[i].unit}
						placeholder="Unit"
					/>
					{/*}<Form.Select
						fluid
						label="Unit of Measurement"
						name={`unit${i}`}
						onChange={this.handleUnitChange}
						options={this.unitOptions}
						value={this.state.items[i].unit}
						placeholder="Unit"
					/>*/}
				</Form.Group>
			);
		}
		return rows;
	};

	handleSubmit = e => {
		e.preventDefault();
		this.state.items.forEach(item => {
			this.props.fetchNutrients(
				{
					type: "ADD_NUTRIENTS",
					payload: {
						...item
					}
				},
				this.props.currentUser.id,
				NdbNos,
				this.props.history
			);
		});
	};

	handleCameraButtonToggle = e => {
		this.setState({
			scanning: !this.state.scanning,
			cameraId: e.target.id
		});
	};

	turnUpcCameraOff = data => {
		this.setState({
			scanning: false,
			items: [
				...this.state.items.slice(0, this.state.cameraId),
				{
					upc: data,
					quantity: this.state.items[this.state.cameraId].quantity,
					unit: this.state.items[this.state.cameraId].unit
				},
				...this.state.items.slice(this.state.cameraId + 1)
			]
		});
	};

	render() {
		return (
			<div>
				<div>
					<Form onSubmit={this.handleSubmit}>
						<label>UPC</label>
						<label>Quantity</label>
						<label>Unit Type</label>
						<this.addRow />
						<div>
							<Button
								animated="fade"
								onClick={this.handleAdditionalRowClick}
								floated="left"
							>
								<Button.Content visible>Add Another Item</Button.Content>
								<Button.Content hidden>
									<Icon name="down arrow" />
								</Button.Content>
							</Button>
							<Button floated="right">Submit</Button>
						</div>
					</Form>
				</div>
				{this.state.scanning ? (
					<UpcCamera cameraToggle={this.turnUpcCameraOff} />
				) : null}
			</div>
		);
	}
}

export default connect(
	state => {
		return {
			currentUser: state.currentUser,
			loggedIn: state.loggedIn
		};
	},
	{ fetchNutrients }
)(withAuth(FoodItemEntryForm));
