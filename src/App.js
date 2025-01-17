import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PublicRoute from "./components/PublicRoutes";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./views/Home";
import MainLayout from "./components/layouts/MainLayout";
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";

function App() {
	return (
		<div className="min-h-[100vh] bg-white">
			<Router>
				<Routes>
					{/* Routes that does not require login to be accessed but should not be accessed when logedin */}
					<Route path="/" element={<PublicRoute />}>
						<Route path="login" element={<SignIn />} />
						<Route path="register" element={<SignUp />} />
					</Route>
					{/* Routes that require login to be accessed */}
					<Route element={<ProtectedRoute />}></Route>
					{/* Other routes that can be accessed whether logged in or not */}
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
					</Route>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
