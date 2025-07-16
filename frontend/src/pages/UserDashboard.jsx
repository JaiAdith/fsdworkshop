import {
	Container,
	VStack,
	HStack,
	Text,
	Button,
	Box,
	Badge,
	useColorModeValue,
	Heading,
	SimpleGrid,
	Spinner,
	Alert,
	AlertIcon,
	Image,
	Divider,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBookingStore } from "../store/bookingStore";
import { useUserStore } from "../store/userStore";

const UserDashboard = () => {
	const { bookings, loading, error, fetchUserBookings, cancelBooking } = useBookingStore();
	const { user } = useUserStore();

	useEffect(() => {
		fetchUserBookings();
	}, [fetchUserBookings]);

	const bgColor = useColorModeValue("white", "gray.700");

	const getStatusColor = (status) => {
		switch (status) {
			case "pending": return "yellow";
			case "confirmed": return "blue";
			case "active": return "green";
			case "completed": return "gray";
			case "cancelled": return "red";
			default: return "gray";
		}
	};

	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price);
	};

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	const handleCancelBooking = async (bookingId) => {
		const result = await cancelBooking(bookingId);
		if (result.success) {
			// Booking cancelled successfully, UI will update automatically
		}
	};

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={8} align="stretch">
				{/* Welcome Section */}
				<VStack spacing={4} textAlign="center">
					<Heading fontSize="3xl" color="blue.500">
						Welcome, {user?.name}!
					</Heading>
					<Text color="gray.500" fontSize="lg">
						Manage your car rentals and account settings
					</Text>
				</VStack>

				{/* Quick Actions */}
				<SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
					<Link to="/cars">
						<Button
							colorScheme="blue"
							size="lg"
							w="full"
							py={6}
							fontSize="lg"
						>
							Browse Cars
						</Button>
					</Link>
					<Link to="/profile">
						<Button
							variant="outline"
							colorScheme="blue"
							size="lg"
							w="full"
							py={6}
							fontSize="lg"
						>
							Update Profile
						</Button>
					</Link>
					<Button
						variant="outline"
						colorScheme="gray"
						size="lg"
						w="full"
						py={6}
						fontSize="lg"
						onClick={() => fetchUserBookings()}
					>
						Refresh Bookings
					</Button>
				</SimpleGrid>

				{/* Bookings Section */}
				<Box>
					<Heading size="lg" mb={6} color="blue.600">
						Your Bookings
					</Heading>

					{loading ? (
						<VStack py={12}>
							<Spinner size="xl" color="blue.500" />
							<Text>Loading your bookings...</Text>
						</VStack>
					) : error ? (
						<Alert status="error" borderRadius="md">
							<AlertIcon />
							{error}
						</Alert>
					) : bookings.length === 0 ? (
						<Box
							bg={bgColor}
							p={8}
							borderRadius="lg"
							shadow="md"
							textAlign="center"
						>
							<VStack spacing={4}>
								<Text fontSize="xl" fontWeight="bold" color="gray.500">
									No bookings yet
								</Text>
								<Text color="gray.400">
									Start by browsing our available cars
								</Text>
								<Link to="/cars">
									<Button colorScheme="blue" size="lg">
										Browse Cars
									</Button>
								</Link>
							</VStack>
						</Box>
					) : (
						<VStack spacing={4}>
							{bookings.map((booking) => (
								<Box
									key={booking._id}
									bg={bgColor}
									p={6}
									borderRadius="lg"
									shadow="md"
									w="full"
								>
									<SimpleGrid columns={{ base: 1, lg: 3 }} spacing={6}>
										{/* Car Info */}
										<VStack align="start" spacing={3}>
											<Image
												src={booking.car?.image || "https://via.placeholder.com/300x200?text=Car"}
												alt={`${booking.car?.brand} ${booking.car?.model}`}
												borderRadius="md"
												height="120px"
												width="100%"
												objectFit="cover"
											/>
											<VStack align="start" spacing={1}>
												<Text fontWeight="bold" fontSize="lg">
													{booking.car?.brand} {booking.car?.model}
												</Text>
												<Text color="gray.500" fontSize="sm">
													{booking.car?.year} • License: {booking.car?.licensePlate}
												</Text>
											</VStack>
										</VStack>

										{/* Booking Details */}
										<VStack align="start" spacing={2}>
											<Badge
												colorScheme={getStatusColor(booking.status)}
												variant="subtle"
												px={3}
												py={1}
												borderRadius="md"
												fontSize="sm"
											>
												{booking.status.toUpperCase()}
											</Badge>

											<VStack align="start" spacing={1}>
												<Text fontSize="sm" color="gray.500">Pickup Date</Text>
												<Text fontWeight="semibold">
													{formatDate(booking.startDate)}
												</Text>
											</VStack>

											<VStack align="start" spacing={1}>
												<Text fontSize="sm" color="gray.500">Return Date</Text>
												<Text fontWeight="semibold">
													{formatDate(booking.endDate)}
												</Text>
											</VStack>

											<VStack align="start" spacing={1}>
												<Text fontSize="sm" color="gray.500">Duration</Text>
												<Text fontWeight="semibold">
													{booking.totalDays} day{booking.totalDays !== 1 ? 's' : ''}
												</Text>
											</VStack>
										</VStack>

										{/* Actions */}
										<VStack align="end" spacing={3}>
											<VStack align="end" spacing={1}>
												<Text fontSize="2xl" fontWeight="bold" color="blue.600">
													{formatPrice(booking.totalAmount)}
												</Text>
												<Text fontSize="sm" color="gray.500">
													Total Amount
												</Text>
											</VStack>

											<VStack spacing={2} w="full">
												<Link to={`/bookings/${booking._id}`} style={{ width: "100%" }}>
													<Button
														variant="outline"
														colorScheme="blue"
														size="sm"
														w="full"
													>
														View Details
													</Button>
												</Link>

												{(booking.status === "pending" || booking.status === "confirmed") && (
													<Button
														colorScheme="red"
														variant="outline"
														size="sm"
														w="full"
														onClick={() => handleCancelBooking(booking._id)}
													>
														Cancel Booking
													</Button>
												)}
											</VStack>
										</VStack>
									</SimpleGrid>
								</Box>
							))}
						</VStack>
					)}
				</Box>
			</VStack>
		</Container>
	);
};

export default UserDashboard;