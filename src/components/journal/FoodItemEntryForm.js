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
	Segment,
	Popup
} from "semantic-ui-react";
import { connect } from "react-redux";
import { fetchNutrients } from "../actions/nutritionixApiFetchActions";
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

	// Create fractional options up until 4 for quantity options
	quantityOptions = () => {
		let options = [];
		let divisors = [4, 3, 4, 3, 4, 1];
		let fourth = 0.25;
		let third = 0.33;
		let whole = 1;
		for (let i = 0; i < 30; i++) {
			if (i < 24) {
				let index = i % 6;
				if (divisors[index] === 1) {
					options.push({
						key: whole.toString(),
						text: whole.toString(),
						value: whole
					});
					fourth += 0.25;
					third += 0.34;
					whole++;
				} else if (divisors[index] === 4) {
					options.push({
						key: fourth.toString(),
						text: fourth.toString(),
						value: fourth.toFixed(2)
					});
					fourth += 0.25;
				} else if (divisors[index] === 3) {
					options.push({
						key: third.toString(),
						text: third.toString(),
						value: third.toFixed(2)
					});
					third += 0.33;
				}
			} else {
				options.push({
					key: whole.toString(),
					text: whole.toString(),
					value: whole
				});
				whole++;
			}
		}
		return options;
	};

	unitOptions = [
		{ key: "teaspoon", text: "Teaspoon(s)", value: "teaspoon" },
		{ key: "tablespoon", text: "Tablespoon(s)", value: "tablespoon" },
		{ key: "ounce", text: "Ounce(s)", value: "ounce" },
		{ key: "cup", text: "Cup(s)", value: "cup" },
		{ key: "pound", text: "Pound(s)", value: "pound" },
		{ key: "fluid ounce", text: "Fluid Ounce(s)", value: "fluid ounce" },
		{ key: "pint", text: "Pint(s)", value: "pint" },
		{ key: "quart", text: "Quart(s)", value: "quart" },
		{ key: "gallon", text: "Gallon(s)", value: "gallon" },
		{ key: "piece", text: "Piece(s)", value: "piece" },
		{ key: "slice", text: "Slice(s)", value: "slice" }
	];

	// Creates an array of serving options from 1 to 10
	servingOptions = () => {
		let options = [{ key: "1", text: "1 Serving", value: 1 }];
		for (let i = 2; i <= 10; i++) {
			let obj = { key: i.toString(), text: `${i} Servings`, value: i };
			options.push(obj);
		}
		return options;
	};

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
					<Popup
						trigger={
							<Icon
								name="camera"
								circular
								id={i}
								onClick={this.handleCameraButtonToggle}
							/>
						}
						content="Turn on the camera to scan a UPC code"
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
