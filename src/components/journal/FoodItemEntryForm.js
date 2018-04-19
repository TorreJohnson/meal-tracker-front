import React from "react";
import {
	Form,
	Button,
	Icon,
	Dropdown,
	Input,
	Label,
	Menu,
	Grid,
	Segment
} from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchNutrients } from "../actions/Actions";
import { NdbNos } from "./NdbNos";
import UpcCamera from "../Camera/UpcCamera";
import cuid from "cuid";
import JournalEntries from "./JournalEntries";

class FoodItemEntryForm extends React.Component {
	state = {
		items: [
			{
				itemName: "",

				quantity: "",
				unit: "",
				upc: "",
				servings: "",
				key: 1
			}
		],
		rows: 1,
		scanning: false,
		cameraId: "",
		cameraSelected: [{ selected: false }],
		activeItem: "newEntry",
		searchTerm: ""
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
		{ key: "ounces", text: "Ounce", value: "ounce" },
		{ key: "cup", text: "Cup", value: "cup" },
		{ key: "pound", text: "Pound", value: "pound" },
		{ key: "fluid ounces", text: "Fluid Ounces", value: "fluid ounces" },
		{ key: "pint", text: "Pint", value: "pint" },
		{ key: "quart", text: "Quart", value: "quart" },
		{ key: "gallon", text: "Gallon", value: "gallon" },
		{ key: "piece", text: "Piece(s)", value: "piece" },
		{ key: "slice", text: "Slice(s)", value: "slice" }
	];

	servingOptions = [
		{ key: "1", text: "1 Serving", value: 1 },
		{ key: "2", text: "2 Servings", value: 2 },
		{ key: "3", text: "3 Servings", value: 3 },
		{ key: "4", text: "4 Servings", value: 4 },
		{ key: "5", text: "5 Servings", value: 5 },
		{ key: "6", text: "6 Servings", value: 6 },
		{ key: "7", text: "7 Servings", value: 7 },
		{ key: "8", text: "8 Servings", value: 8 },
		{ key: "9", text: "9 Servings", value: 9 },
		{ key: "10", text: "10 Servings", value: 10 }
	];

	handleItemChange = e => {
		let index = parseInt(e.target.name, 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					itemName: e.target.value,
					quantity: this.state.items[index].quantity,
					unit: this.state.items[index].unit,
					upc: this.state.items[index].upc,
					servings: this.state.items[index].servings,
					key: this.state.items[index].key
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleQuantityChange = (e, value) => {
		let index = parseInt(value.name, 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					itemName: this.state.items[index].itemName,
					quantity: value.value,
					unit: this.state.items[index].unit,
					upc: this.state.items[index].upc,
					servings: this.state.items[index].servings,
					key: this.state.items[index].key
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleUnitChange = (e, value) => {
		let index = parseInt(value.name, 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					itemName: this.state.items[index].itemName,
					quantity: this.state.items[index].quantity,
					unit: value.value,
					upc: this.state.items[index].upc,
					servings: this.state.items[index].servings,
					key: this.state.items[index].key
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleUpcChange = e => {
		let index = parseInt(e.target.name, 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					itemName: this.state.items[index].itemName,
					quantity: this.state.items[index].quantity,
					unit: this.state.items[index].unit,
					upc: e.target.value,
					servings: this.state.items[index].servings,
					key: this.state.items[index].key
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleServingsChange = (e, value) => {
		let index = parseInt(value.name, 10);
		this.setState({
			items: [
				...this.state.items.slice(0, index),
				{
					itemName: this.state.items[index].itemName,
					quantity: this.state.items[index].quantity,
					unit: this.state.items[index].unit,
					upc: this.state.items[index].upc,
					servings: value.value,
					key: this.state.items[index].key
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleAdditionalRowClick = e => {
		e.preventDefault();
		let key = cuid();
		this.setState({
			items: [
				...this.state.items,
				{
					itemName: "",
					quantity: "",
					unit: "",
					upc: "",
					servings: "",
					key: key
				}
			],
			rows: this.state.rows + 1,
			cameraSelected: [...this.state.cameraSelected, { selected: false }]
		});
	};

	addRow = () => {
		let rows = [];
		for (let i = 0; i < this.state.rows; i++) {
			rows.push(
				<div key={this.state.items[i].key} id="food">
					<Icon
						name="camera"
						circular
						id={i}
						onClick={this.handleCameraButtonToggle}
					/>
					{this.state.cameraSelected[i].selected ? (
						<Form.Group>
							<Form.Input
								width={4}
								name={i}
								onChange={this.handleUpcChange}
								value={this.state.items[i].upc}
								placeholder="UPC..."
							/>
							<Dropdown
								width={4}
								search
								selection
								name={i}
								onChange={this.handleServingsChange}
								options={this.servingOptions}
								value={this.state.items[i].servings}
								placeholder="Servings..."
							/>
						</Form.Group>
					) : (
						<Form.Group>
							<Form.Input
								width={8}
								name={i}
								onChange={this.handleItemChange}
								value={this.state.items[i].itemName}
								placeholder="Enter a new item..."
							/>
							<Dropdown
								width={4}
								search
								selection
								name={i}
								onChange={this.handleQuantityChange}
								options={this.quantityOptions}
								value={this.state.items[i].quantity}
								placeholder="Quantity"
							/>
							<Dropdown
								width={4}
								search
								selection
								name={i}
								onChange={this.handleUnitChange}
								options={this.unitOptions}
								value={this.state.items[i].unit}
								placeholder="Unit"
							/>
						</Form.Group>
					)}
				</div>
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
		let index = parseInt(e.target.id, 10);
		if (this.state.items[index].itemName.length) {
			this.setState({
				scanning: !this.state.scanning,
				cameraId: e.target.id,
				cameraSelected: [
					...this.state.cameraSelected.slice(0, index),
					{ selected: !this.state.cameraSelected[index].selected },
					...this.state.cameraSelected.slice(index + 1)
				],
				items: [
					...this.state.items.slice(0, index),
					{
						itemName: "",
						quantity: "",
						unit: "",
						upc: this.state.items[index].upc,
						servings: this.state.items[index].servings
					},
					...this.state.items.slice(index + 1)
				]
			});
		} else {
			this.setState({
				scanning: !this.state.scanning,
				cameraId: e.target.id,
				cameraSelected: [
					...this.state.cameraSelected.slice(0, index),
					{ selected: !this.state.cameraSelected[index].selected },
					...this.state.cameraSelected.slice(index + 1)
				],
				items: [
					...this.state.items.slice(0, index),
					{
						itemName: this.state.items[index].itemName,
						quantity: this.state.items[index].quantity,
						unit: this.state.items[index].unit,
						upc: "",
						servings: ""
					},
					...this.state.items.slice(index + 1)
				]
			});
		}
	};

	turnUpcCameraOff = data => {
		let index = parseInt(this.state.cameraId, 10);
		this.setState({
			scanning: false,
			items: [
				...this.state.items.slice(0, index),
				{
					itemName: this.state.items[index].itemName,
					quantity: this.state.items[index].quantity,
					unit: this.state.items[index].unit,
					upc: data,
					servings: this.state.items[index].servings,
					key: this.state.items[index].key
				},
				...this.state.items.slice(index + 1)
			]
		});
	};

	handleItemClick = (e, { name }) => {
		this.setState({
			activeItem: name
		});
	};

	handleSearchInputChange = e => {
		this.setState({
			searchTerm: e.target.value.toLowerCase(),
			activeItem: "previousEntries"
		});
	};

	render() {
		const { activeItem } = this.state;
		return (
			<div>
				<Grid>
					<Grid.Column width={3}>
						<Menu fluid vertical className="fixed-side-bar">
							<Menu.Item
								name="newEntry"
								active={activeItem === "newEntry"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "newEntry" ? (
									<Label color="green">
										<Icon name="write" />
									</Label>
								) : (
									<Label>
										<Icon name="write" />
									</Label>
								)}
								New Entry
							</Menu.Item>
							<Menu.Item
								name="previousEntries"
								active={activeItem === "previousEntries"}
								onClick={this.handleItemClick}
							>
								{this.state.activeItem === "previousEntries" ? (
									<Label color="green">
										{this.props.currentUser.food_items.length}
									</Label>
								) : (
									<Label>{this.props.currentUser.food_items.length}</Label>
								)}
								Previous Entries
							</Menu.Item>
							<Menu.Item>
								<Input
									icon="search"
									onChange={this.handleSearchInputChange}
									value={this.state.searchTerm}
									placeholder="Search items..."
								/>
							</Menu.Item>
						</Menu>
					</Grid.Column>
					<Grid.Column width={10}>
						<Segment id="food">
							{this.state.activeItem === "newEntry" ? (
								<div>
									<Form onSubmit={this.handleSubmit}>
										{this.state.scanning ? (
											<Form.Group>
												<Form.Field label="UPC" width={4} />
												<Form.Field label="Servings" width={4} />
											</Form.Group>
										) : (
											<Form.Group>
												<Form.Field label="Item" width={8} />
												<Form.Field label="Quantity" width={4} />
												<Form.Field label="Unit Type" width={4} />
											</Form.Group>
										)}
										<this.addRow />
										<div>
											<Button
												animated="fade"
												onClick={this.handleAdditionalRowClick}
												floated="left"
												color="green"
												basic
											>
												<Button.Content visible>
													Add Another Item
												</Button.Content>
												<Button.Content hidden>
													<Icon name="down arrow" />
												</Button.Content>
											</Button>
											<Button floated="right" color="green" basic>
												Submit
											</Button>
										</div>
									</Form>
								</div>
							) : (
								<JournalEntries searchTerm={this.state.searchTerm} />
							)}
						</Segment>
					</Grid.Column>
				</Grid>
				{this.state.scanning ? (
					<Grid>
						<Grid.Row>
							<Grid.Column width={5} />
							<Grid.Column width={6}>
								<UpcCamera cameraToggle={this.turnUpcCameraOff} />
							</Grid.Column>
							<Grid.Column width={5} />
						</Grid.Row>
					</Grid>
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
)(FoodItemEntryForm);
