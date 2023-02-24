import "./App.css";

import React, { Suspense, useEffect, useState } from "react";
import {
	Redirect,
	Route,
	BrowserRouter as Router,
	Switch,
	useLocation,
} from "react-router-dom";

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

					{/* <Route path={"/view"}>
						<List web3={web3} setShrinkHeader={setShrinkHeader} />
					</Route> */}

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

function List({ web3, setShrinkHeader, Contract }) {
	const account = useLocation();
	console.log(account);
	async function getNFTs() {
		if (!web3 || !Contract) {
			return;
		}

		Contract.methods.walletOfOwner();
	}
	return <div style={{ height: "100vh" }} />;
}
