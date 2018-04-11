import React from "react";
import Quagga from "quagga";

export default class UpcReader extends React.Component {
	componentDidMount() {
		Quagga.init(
			{
				inputStream: {
					name: "Live",
					type: "LiveStream",
					constraints: {
						width: 640,
						height: 480,
						facingMode: "environment" // or user
					},
					target: document.getElementById("camera") // Or '#yourElement' (optional)
				},
				decoder: {
					readers: ["upc_reader"]
				}
			},
			function(err) {
				if (err) {
					console.log(err);
					return;
				}
				console.log("Initialization finished. Ready to start");
				Quagga.start();
			}
		);
		Quagga.onDetected(this.callback);
	}

	componentWillUnmount() {
		Quagga.offDetected(this.callback);
	}

	callback = data => {
		console.log(data.codeResult.code);
		Quagga.stop();
		this.props.scanToggle();
	};

	render() {
		return <div id="camera" />;
	}
}
