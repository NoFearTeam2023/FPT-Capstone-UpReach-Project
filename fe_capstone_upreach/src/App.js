import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";

import "./CSS/Theme.css";
import "./bootstrap-5.3.0-dist/css/bootstrap.css";
import WelcomePage from "./Pages/Homepage/WelcomePage";
import HomePage from "./Pages/MainPage/HomePage";

import Login from "./Pages/LoginPage/Login";
import HomePage from "./Pages/Homepage/HomePage";
import JoinAsBrand from "./Pages/JoinAsBrandPage/JoinAsBrand";
import SignUp from "./Pages/SignUpPage/SignUp"
function App() {
	return (
		<>
		
		<BrowserRouter>
			
				<Routes>
					<Route
						path="/"
						element={
							<>
								<WelcomePage/>
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								<Login />
							</>
						}
					/>
					<Route
						path="/join-as-brand"
						element={
							<>
								<JoinAsBrand />
							</>
						}
					/>
					<Route
						path="/sign-up"
						element={
							<>
								<SignUp />
							</>
						}
					/>
				</Routes>
		</BrowserRouter>
		</>
	);
}

export default App;
