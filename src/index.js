import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import reducer from "./components/reducers/Reducer";
import thunk from "redux-thunk";

require("dotenv").config();

const middleware = applyMiddleware(thunk);

const store = createStore(
	reducer,
	compose(
		middleware,
		window.navigator.userAgent.includes("Chrome")
			? window.__REDUX_DEVTOOLS_EXTENSION__ &&
			  window.__REDUX_DEVTOOLS_EXTENSION__()
			: compose
	)
);

// const store = createStore(
// 	reducer,
// 	compose(
// 		middleware,
// 		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// 	)
// );

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById("root")
);
registerServiceWorker();
