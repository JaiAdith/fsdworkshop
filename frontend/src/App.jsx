import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CarsPage from "./pages/CarsPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import BookingPage from "./pages/BookingPage";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProfilePage from "./pages/ProfilePage";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useUserStore } from "./store/userStore";

function App() {
	const { initializeAuth } = useUserStore();

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/cars" element={<CarsPage />} />
				<Route path="/cars/:id" element={<CarDetailsPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				
				{/* Protected Routes */}
				<Route path="/booking/:carId" element={
					<ProtectedRoute>
						<BookingPage />
					</ProtectedRoute>
				} />
				<Route path="/dashboard" element={
					<ProtectedRoute>
						<UserDashboard />
					</ProtectedRoute>
				} />
				<Route path="/profile" element={
					<ProtectedRoute>
						<ProfilePage />
					</ProtectedRoute>
				} />
				<Route path="/admin" element={
					<ProtectedRoute adminOnly={true}>
						<AdminDashboard />
					</ProtectedRoute>
				} />
			</Routes>
		</Box>
	);
}

export default App;
