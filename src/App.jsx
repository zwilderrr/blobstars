import React, { Suspense, useState } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import "./App.css";

// import Header from "./Components/Header";
const Header = React.lazy(() =>
	import("./Components/Header").then(module => ({
		default: module.Header,
	}))
);

// import { Footer } from "./Components/Footer";
const Footer = React.lazy(() =>
	import("./Components/Footer").then(module => ({
		default: module.Footer,
	}))
);

// import { TermsAndConditions } from "./Components/TermsAndConditions";
const TermsAndConditions = React.lazy(() =>
	import("./Components/TermsAndConditions").then(module => ({
		default: module.TermsAndConditions,
	}))
);

// import LandingPage from "./Components/LandingPage";
const LandingPage = React.lazy(() =>
	import("./Components/LandingPage").then(module => ({
		default: module.LandingPage,
	}))
);

export default function App() {
	const [web3, setWeb3] = useState();
	const [provider, setProvider] = useState();
	const [Contract, setContract] = useState();
	const [shrinkHeader, setShrinkHeader] = useState(false);
	const isMobile = window.screen.width <= 768;

	return (
		<Router>
			<Suspense fallback={<div />}>
				<Header
					setWeb3={setWeb3}
					setProvider={setProvider}
					setContract={setContract}
					shrink={isMobile ? true : shrinkHeader}
					isMobile={isMobile}
				/>

				<Switch>
					<Route path="/" exact>
						<LandingPage
							web3={web3}
							provider={provider}
							Contract={Contract}
							isMobile={isMobile}
							setShrinkHeader={setShrinkHeader}
						/>
					</Route>

					<Route path="/terms">
						<TermsAndConditions setShrinkHeader={setShrinkHeader} />
					</Route>

					<Route>
						<Redirect to="/" />
					</Route>
				</Switch>

				<Footer />
			</Suspense>
		</Router>
	);
}
