import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";

import "./CSS/Theme.css";
import "./bootstrap-5.3.0-dist/css/bootstrap.css";
import Login from "./Pages/LoginPage/Login";
import LandingPage from "./Pages/LandingPage/LandingPage";
import HomePage from "./Pages/HomePage/HomePage";
import JoinAsBrand from "./Pages/JoinAsBrandPage/JoinAsBrand";
import SignUp from "./Pages/SignUpPage/SignUp";
function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<LandingPage />
							</>
						}
					/>
					<Route
						path="/home"
						element={
							<>
								<HomePage />
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
