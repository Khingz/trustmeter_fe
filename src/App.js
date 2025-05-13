import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import PublicRoute from "./components/PublicRoutes";
import ProtectedRoute from "./components/ProtectedRoutes";
import Home from "./views/Home";
import MainLayout from "./components/layouts/MainLayout";
import SignIn from "./views/Auth/SignIn";
import SignUp from "./views/Auth/SignUp";
import CurrentUserProfile from "./views/User/CurrentUserProfile";
import ForgotPassword from "./views/Auth/ForgotPassword";
import ResetLinkSuccessful from "./views/Auth/ResetLinkSuccessful";
import PasswordResetSuccess from "./views/Auth/PasswordResetSuccess";
import ResetPassword from "./views/Auth/ResetPassword";
import NotFoundPage from "./views/404";
import WriteReview from "./views/Review/WriteReview";
import AddProduct from "./views/Product/AddProduct";
import SingleProduct from "./views/Product/SingleProduct";
import { ToastContainer } from "react-toastify";
import ProductListing from "./views/Product/ProductListing";
import ScrollToTop from "./utils";
import ReviewListings from "./views/Review/ReviewsListing";

function App() {
	return (
		<div className="min-h-[100vh] bg-white">
			<ToastContainer
				position="top-center"
				hideProgressBar={true}
				draggable
				theme="light"
			/>
			<Router>
				<ScrollToTop />

				<Routes>
					{/* Routes that does not require login to be accessed but should not be accessed when logedin */}
					<Route element={<PublicRoute />}>
						<Route path="login" element={<SignIn />} />
						<Route path="register" element={<SignUp />} />
						<Route path="forgot-password" element={<ForgotPassword />} />
						<Route
							path="reset-link-successful"
							element={<ResetLinkSuccessful />}
						/>
						<Route
							path="password-reset-successful"
							element={<PasswordResetSuccess />}
						/>
						<Route
							path="reset-password/:token_id"
							element={<ResetPassword />}
						/>
					</Route>
					{/* Routes that require login to be accessed */}
					<Route element={<ProtectedRoute />}>
						<Route path="/profile" element={<CurrentUserProfile />} />
						<Route path="/add-product" element={<AddProduct />} />
						<Route path="/review" element={<WriteReview />} />

					</Route>
					{/* Other routes that can be accessed whether logged in or not */}
					<Route path="/" element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="/products/:id" element={<SingleProduct />} />
						<Route path="/products" element={<ProductListing />} />
						<Route path="/reviews" element={<ReviewListings />} />
					</Route>
					<Route path="*" element={<NotFoundPage />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
