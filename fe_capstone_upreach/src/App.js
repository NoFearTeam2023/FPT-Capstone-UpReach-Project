import { BrowserRouter, Routes, Route } from "react-router-dom";
import "antd/dist/reset.css";
import "./App.css";
import "./CSS/Theme.css";
import "./bootstrap-5.3.0-dist/css/bootstrap.css";
import Pages_Index from "./Pages/Pages_Index";
function App() {
	return (
		<>
			<BrowserRouter>
				<Pages_Index />
			</BrowserRouter>
		</>
	);
}

export default App;
