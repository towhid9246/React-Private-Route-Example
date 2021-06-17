import { useState } from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { PublicRoute, PrivateRoute } from "react-private-public-route";

import Login from "./components/Login";
import Homepage from "./components/Home";
import Private from "./components/Private";

import Restricted from "./components/Restricted";
function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isRestricted, setIsRestricted] = useState(true);

	const login = () => {
		setIsLoggedIn((prevState) => !prevState);
	};
	const restricted = () => {
		setIsRestricted((prevState) => !prevState);
	};
	return (
		<Router>
			<div className='main-container'>
				<h1>{isLoggedIn ? "Logged in" : "Not Logged in"}</h1>
				<div>
					<ul>
						<li>
							<Link to='/'>Home</Link>
						</li>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/private'>Private</Link>
						</li>
						<li>
							<Link to='/restricted-public'>Public Restricted</Link>
						</li>
						<li>
							<Link to='/restricted-private'>Private Restricted</Link>
						</li>
					</ul>
				</div>
				<button onClick={restricted}>
					{!isRestricted ? "Add Restriction" : "Remove Restriction"}
				</button>
				<Switch>
					<PublicRoute exact path='/' component={Homepage} />

					<PublicRoute
						path='/login'
						component={() => <Login login={login} isLogged={isLoggedIn} />}
					/>
					<PrivateRoute
						exact
						path='/private'
						isAuthenticated={isLoggedIn}
						redirect='/login'
						component={Private}
					/>
					<PublicRoute
						restricted={isRestricted}
						path='/restricted-public'
						component={Restricted}
					/>
					<PrivateRoute
						exact
						path='/restricted-private'
						isAuthenticated={isLoggedIn}
						restricted={isRestricted}
						redirect='/login'
						component={Restricted}
					/>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
