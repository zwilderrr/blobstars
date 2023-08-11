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
		<ErrorBoundary
			fallback={
				<div>
					Looks like we're having issues. Trying minting at{" "}
					<a href="https://mint.fun/base/0x09Ce1ABaf8A4250337d26982805aA6527c4e9540">
						minting.fun
					</a>
				</div>
			}
		>
			<Router>
				<Suspense fallback={<div />}>
					<Header
						Contract={Contract}
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
		</ErrorBoundary>
	);
}

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	componentDidCatch(error, info) {
		// Example "componentStack":
		//   in ComponentThatThrows (created by App)
		//   in ErrorBoundary (created by App)
		//   in div (created by App)
		//   in App
		alert(error.message, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return this.props.fallback;
		}

		return this.props.children;
	}
}
