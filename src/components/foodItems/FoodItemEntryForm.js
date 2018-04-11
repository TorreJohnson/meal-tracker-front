import React from "react";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchNutrients } from "../actions/Actions";
import { NdbNos } from "./NdbNos";
import withAuth from "../authentication/WithAuth";
import UpcReader from "../Camera/UpcReader";

class FoodItemEntryForm extends React.Component {
	state = {
		items: [
			{
				upc: "",
				quantity: "",
				unit: ""
			}
		],
		rows: 1,
		scanning: false
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
		{ key: "1", text: "1", value: 1 }
	];

	unitOptions = [
		{ key: "cup", text: "Cup", value: "cup" },
		{ key: "quart", text: "Quart", value: "quart" }
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
		console.log(typeof index);
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

	handleAdditionalRowClick = () => {
		this.setState({
			rows: this.state.rows + 1,
			items: [
				...this.state.items,
				{
					upc: "",
					quantity: "",
					unit: ""
				}
			]
		});
	};

	addRow = () => {
		let rows = [];
		for (let i = 0; i < this.state.rows; i++) {
			rows.push(
				<Form.Group widths="equal">
					<Form.Input
						fluid
						label="UPC Code"
						name={`upc${i}`}
						onChange={this.handleUpcChange}
						placeholder="UPC..."
					/>
					<Form.Select
						fluid
						label="Quantity"
						name={`quantity${i}`}
						onChange={this.handleQuantityChange}
						options={this.quantityOptions}
						placeholder="Quantity"
					/>
					<Form.Select
						fluid
						label="Unit of Measurement"
						name={`unit${i}`}
						onChange={this.handleUnitChange}
						options={this.unitOptions}
						placeholder="Unit"
					/>
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

	handleScanToggle = () => {
		this.setState({
			scanning: !this.state.scanning
		});
	};

	render() {
		return (
			<div>
				<div>
					<Button onClick={this.handleAdditionalRowClick}>
						Add Another Item
					</Button>
					<Button onClick={this.handleScanToggle}>Camera</Button>
					<Form onSubmit={this.handleSubmit}>
						<this.addRow />
						<Form.Button>Submit</Form.Button>
					</Form>
				</div>
				{this.state.scanning ? (
					<UpcReader scanToggle={this.handleScanToggle} />
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
