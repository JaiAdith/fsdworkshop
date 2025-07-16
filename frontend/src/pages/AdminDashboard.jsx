import {
	Container,
	VStack,
	HStack,
	Text,
	Button,
	Box,
	useColorModeValue,
	Heading,
	SimpleGrid,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	Tab,
	Tabs,
	TabList,
	TabPanel,
	TabPanels,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCarStore } from "../store/carStore";
import { useBookingStore } from "../store/bookingStore";

const AdminDashboard = () => {
	const { cars, fetchCars } = useCarStore();
	const { bookings, fetchAllBookings } = useBookingStore();
	const [stats, setStats] = useState({
		totalCars: 0,
		availableCars: 0,
		totalBookings: 0,
		activeBookings: 0,
		totalRevenue: 0,
	});

	useEffect(() => {
		fetchCars();
		fetchAllBookings();
	}, [fetchCars, fetchAllBookings]);

	useEffect(() => {
		if (cars.length > 0 || bookings.length > 0) {
			const availableCars = cars.filter(car => car.isAvailable).length;
			const activeBookings = bookings.filter(booking => 
				booking.status === 'active' || booking.status === 'confirmed'
			).length;
			const totalRevenue = bookings
				.filter(booking => booking.status === 'completed')
				.reduce((sum, booking) => sum + booking.totalAmount, 0);

			setStats({
				totalCars: cars.length,
				availableCars,
				totalBookings: bookings.length,
				activeBookings,
				totalRevenue,
			});
		}
	}, [cars, bookings]);

	const bgColor = useColorModeValue("white", "gray.700");

	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price);
	};

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

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={8} align="stretch">
				<VStack spacing={4} textAlign="center">
					<Heading fontSize="3xl" color="blue.500">
						Admin Dashboard
					</Heading>
					<Text color="gray.500" fontSize="lg">
						Manage your car rental business
					</Text>
				</VStack>

				{/* Stats Overview */}
				<SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={6}>
					<Stat bg={bgColor} p={4} borderRadius="lg" shadow="md">
						<StatLabel>Total Cars</StatLabel>
						<StatNumber color="blue.500">{stats.totalCars}</StatNumber>
					</Stat>

					<Stat bg={bgColor} p={4} borderRadius="lg" shadow="md">
						<StatLabel>Available Cars</StatLabel>
						<StatNumber color="green.500">{stats.availableCars}</StatNumber>
						<StatHelpText>Ready to rent</StatHelpText>
					</Stat>

					<Stat bg={bgColor} p={4} borderRadius="lg" shadow="md">
						<StatLabel>Total Bookings</StatLabel>
						<StatNumber color="purple.500">{stats.totalBookings}</StatNumber>
					</Stat>

					<Stat bg={bgColor} p={4} borderRadius="lg" shadow="md">
						<StatLabel>Active Bookings</StatLabel>
						<StatNumber color="orange.500">{stats.activeBookings}</StatNumber>
						<StatHelpText>In progress</StatHelpText>
					</Stat>

					<Stat bg={bgColor} p={4} borderRadius="lg" shadow="md">
						<StatLabel>Total Revenue</StatLabel>
						<StatNumber color="green.600">{formatPrice(stats.totalRevenue)}</StatNumber>
						<StatHelpText>Completed bookings</StatHelpText>
					</Stat>
				</SimpleGrid>

				{/* Management Tabs */}
				<Box bg={bgColor} borderRadius="lg" shadow="md" overflow="hidden">
					<Tabs>
						<TabList>
							<Tab>Cars Management</Tab>
							<Tab>Bookings Management</Tab>
							<Tab>Reports</Tab>
						</TabList>

						<TabPanels>
							{/* Cars Management */}
							<TabPanel>
								<VStack spacing={6} align="stretch">
									<HStack justify="space-between">
										<Heading size="md">Cars ({cars.length})</Heading>
										<Button colorScheme="blue" size="sm">
											Add New Car
										</Button>
									</HStack>

									{cars.length === 0 ? (
										<Alert status="info">
											<AlertIcon />
											No cars found. Add some cars to get started.
										</Alert>
									) : (
										<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
											{cars.slice(0, 6).map((car) => (
												<Box key={car._id} p={4} borderWidth="1px" borderRadius="md">
													<VStack align="start" spacing={2}>
														<Text fontWeight="bold">
															{car.brand} {car.model}
														</Text>
														<Text fontSize="sm" color="gray.500">
															{car.year} • {car.category}
														</Text>
														<Text color="blue.600" fontWeight="semibold">
															{formatPrice(car.pricePerDay)}/day
														</Text>
														<Text fontSize="sm" color={car.isAvailable ? "green.500" : "red.500"}>
															{car.isAvailable ? "Available" : "Not Available"}
														</Text>
													</VStack>
												</Box>
											))}
										</SimpleGrid>
									)}

									{cars.length > 6 && (
										<Button variant="outline" colorScheme="blue">
											View All Cars ({cars.length})
										</Button>
									)}
								</VStack>
							</TabPanel>

							{/* Bookings Management */}
							<TabPanel>
								<VStack spacing={6} align="stretch">
									<Heading size="md">Recent Bookings ({bookings.length})</Heading>

									{bookings.length === 0 ? (
										<Alert status="info">
											<AlertIcon />
											No bookings found.
										</Alert>
									) : (
										<VStack spacing={4}>
											{bookings.slice(0, 5).map((booking) => (
												<Box key={booking._id} p={4} borderWidth="1px" borderRadius="md" w="full">
													<HStack justify="space-between" align="start">
														<VStack align="start" spacing={1}>
															<Text fontWeight="bold">
																{booking.car?.brand} {booking.car?.model}
															</Text>
															<Text fontSize="sm" color="gray.500">
																Customer: {booking.user?.name}
															</Text>
															<Text fontSize="sm" color="gray.500">
																Duration: {booking.totalDays} days
															</Text>
														</VStack>
														<VStack align="end" spacing={1}>
															<Text
																px={2}
																py={1}
																borderRadius="md"
																fontSize="sm"
																bg={`${getStatusColor(booking.status)}.100`}
																color={`${getStatusColor(booking.status)}.800`}
															>
																{booking.status.toUpperCase()}
															</Text>
															<Text fontWeight="bold" color="blue.600">
																{formatPrice(booking.totalAmount)}
															</Text>
														</VStack>
													</HStack>
												</Box>
											))}
										</VStack>
									)}

									{bookings.length > 5 && (
										<Button variant="outline" colorScheme="blue">
											View All Bookings ({bookings.length})
										</Button>
									)}
								</VStack>
							</TabPanel>

							{/* Reports */}
							<TabPanel>
								<VStack spacing={6} align="stretch">
									<Heading size="md">Business Reports</Heading>
									
									<SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
										<Box p={6} borderWidth="1px" borderRadius="md">
											<VStack align="start" spacing={3}>
												<Text fontWeight="bold">Revenue Summary</Text>
												<Text fontSize="2xl" color="green.600">
													{formatPrice(stats.totalRevenue)}
												</Text>
												<Text fontSize="sm" color="gray.500">
													From {bookings.filter(b => b.status === 'completed').length} completed bookings
												</Text>
											</VStack>
										</Box>

										<Box p={6} borderWidth="1px" borderRadius="md">
											<VStack align="start" spacing={3}>
												<Text fontWeight="bold">Fleet Utilization</Text>
												<Text fontSize="2xl" color="blue.600">
													{cars.length > 0 ? Math.round((stats.activeBookings / stats.totalCars) * 100) : 0}%
												</Text>
												<Text fontSize="sm" color="gray.500">
													{stats.activeBookings} of {stats.totalCars} cars in use
												</Text>
											</VStack>
										</Box>
									</SimpleGrid>

									<Alert status="info">
										<AlertIcon />
										Detailed analytics and reporting features coming soon!
									</Alert>
								</VStack>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</Box>
			</VStack>
		</Container>
	);
};

export default AdminDashboard;