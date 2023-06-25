import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";

import "./CSS/Theme.css";
import "./bootstrap-5.3.0-dist/css/bootstrap.css";
import Login from "./Pages/Login/Login";
import WelcomePage from "./Pages/Homepage/WelcomePage";
import HomePage from "./Pages/MainPage/HomePage";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
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
						path="/HomePage"
						element={
							<>
								<HomePage />
							</>
						}
					/>
				</Routes>
				
			</div>
		</BrowserRouter>
	);
}

export default App;
