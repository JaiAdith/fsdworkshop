import {
	Container,
	VStack,
	HStack,
	Text,
	Button,
	Box,
	Image,
	useColorModeValue,
	Heading,
	SimpleGrid,
	FormControl,
	FormLabel,
	Input,
	Textarea,
	Alert,
	AlertIcon,
	Divider,
	Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCarStore } from "../store/carStore";
import { useBookingStore } from "../store/bookingStore";
import { useUserStore } from "../store/userStore";

const BookingPage = () => {
	const { carId } = useParams();
	const navigate = useNavigate();
	const { fetchCar, loading: carLoading, error: carError } = useCarStore();
	const { createBooking, loading: bookingLoading, error: bookingError } = useBookingStore();
	const { user } = useUserStore();

	const [car, setCar] = useState(null);
	const [formData, setFormData] = useState({
		startDate: "",
		endDate: "",
		pickupLocation: "",
		dropoffLocation: "",
		specialRequests: "",
	});
	const [totalAmount, setTotalAmount] = useState(0);
	const [totalDays, setTotalDays] = useState(0);

	useEffect(() => {
		const loadCar = async () => {
			const result = await fetchCar(carId);
			if (result.success) {
				setCar(result.data);
				setFormData(prev => ({
					...prev,
					pickupLocation: result.data.location,
					dropoffLocation: result.data.location,
				}));
			}
		};
		loadCar();
	}, [carId, fetchCar]);

	useEffect(() => {
		if (formData.startDate && formData.endDate && car) {
			const start = new Date(formData.startDate);
			const end = new Date(formData.endDate);
			
			if (end > start) {
				const timeDiff = end.getTime() - start.getTime();
				const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
				const amount = days * car.pricePerDay;
				
				setTotalDays(days);
				setTotalAmount(amount);
			} else {
				setTotalDays(0);
				setTotalAmount(0);
			}
		}
	}, [formData.startDate, formData.endDate, car]);

	const bgColor = useColorModeValue("white", "gray.700");

	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!formData.startDate || !formData.endDate || !formData.pickupLocation || !formData.dropoffLocation) {
			return;
		}

		const bookingData = {
			car: carId,
			...formData,
		};

		const result = await createBooking(bookingData);
		
		if (result.success) {
			navigate("/dashboard");
		}
	};

	if (carLoading) {
		return (
			<Container maxW="container.xl" py={8}>
				<VStack py={12}>
					<Spinner size="xl" color="blue.500" />
					<Text>Loading car details...</Text>
				</VStack>
			</Container>
		);
	}

	if (carError || !car) {
		return (
			<Container maxW="container.xl" py={8}>
				<Alert status="error" borderRadius="md">
					<AlertIcon />
					{carError || "Car not found"}
				</Alert>
			</Container>
		);
	}

	if (!car.isAvailable) {
		return (
			<Container maxW="container.xl" py={8}>
				<Alert status="warning" borderRadius="md">
					<AlertIcon />
					This car is currently not available for booking.
				</Alert>
			</Container>
		);
	}

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={8} align="stretch">
				<VStack spacing={4} textAlign="center">
					<Heading fontSize="3xl" color="blue.500">
						Book Your Car
					</Heading>
					<Text color="gray.500" fontSize="lg">
						Complete your reservation details below
					</Text>
				</VStack>

				<SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
					{/* Car Information */}
					<Box bg={bgColor} p={6} borderRadius="lg" shadow="md">
						<VStack spacing={4} align="stretch">
							<Heading size="lg" color="blue.600">
								Selected Car
							</Heading>

							<Image
								src={car.image || "https://via.placeholder.com/400x250?text=Car+Image"}
								alt={`${car.brand} ${car.model}`}
								borderRadius="md"
								height="200px"
								width="100%"
								objectFit="cover"
							/>

							<VStack align="stretch" spacing={2}>
								<Heading size="md">
									{car.brand} {car.model}
								</Heading>
								<Text color="gray.500">
									{car.year} • {car.color} • {car.category}
								</Text>
								<Text color="gray.500">
									{car.fuelType} • {car.transmission} • {car.seats} seats
								</Text>
								<Text color="gray.500">
									Location: {car.location}
								</Text>
							</VStack>

							<Divider />

							<HStack justify="space-between">
								<Text fontSize="xl" fontWeight="bold" color="blue.600">
									{formatPrice(car.pricePerDay)}
								</Text>
								<Text color="gray.500">per day</Text>
							</HStack>
						</VStack>
					</Box>

					{/* Booking Form */}
					<Box bg={bgColor} p={6} borderRadius="lg" shadow="md">
						<form onSubmit={handleSubmit}>
							<VStack spacing={6} align="stretch">
								<Heading size="lg" color="blue.600">
									Booking Details
								</Heading>

								{bookingError && (
									<Alert status="error" borderRadius="md">
										<AlertIcon />
										{bookingError}
									</Alert>
								)}

								<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
									<FormControl isRequired>
										<FormLabel>Pickup Date</FormLabel>
										<Input
											type="date"
											name="startDate"
											value={formData.startDate}
											onChange={handleChange}
											min={new Date().toISOString().split('T')[0]}
											focusBorderColor="blue.500"
										/>
									</FormControl>

									<FormControl isRequired>
										<FormLabel>Return Date</FormLabel>
										<Input
											type="date"
											name="endDate"
											value={formData.endDate}
											onChange={handleChange}
											min={formData.startDate || new Date().toISOString().split('T')[0]}
											focusBorderColor="blue.500"
										/>
									</FormControl>
								</SimpleGrid>

								<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
									<FormControl isRequired>
										<FormLabel>Pickup Location</FormLabel>
										<Input
											type="text"
											name="pickupLocation"
											value={formData.pickupLocation}
											onChange={handleChange}
											placeholder="Enter pickup location"
											focusBorderColor="blue.500"
										/>
									</FormControl>

									<FormControl isRequired>
										<FormLabel>Drop-off Location</FormLabel>
										<Input
											type="text"
											name="dropoffLocation"
											value={formData.dropoffLocation}
											onChange={handleChange}
											placeholder="Enter drop-off location"
											focusBorderColor="blue.500"
										/>
									</FormControl>
								</SimpleGrid>

								<FormControl>
									<FormLabel>Special Requests</FormLabel>
									<Textarea
										name="specialRequests"
										value={formData.specialRequests}
										onChange={handleChange}
										placeholder="Any special requirements or requests..."
										focusBorderColor="blue.500"
										resize="vertical"
									/>
								</FormControl>

								{/* Booking Summary */}
								{totalDays > 0 && (
									<Box bg="blue.50" p={4} borderRadius="md" borderWidth="1px" borderColor="blue.200">
										<VStack spacing={2}>
											<HStack justify="space-between" w="full">
												<Text>Duration:</Text>
												<Text fontWeight="semibold">
													{totalDays} day{totalDays !== 1 ? 's' : ''}
												</Text>
											</HStack>
											<HStack justify="space-between" w="full">
												<Text>Daily Rate:</Text>
												<Text fontWeight="semibold">
													{formatPrice(car.pricePerDay)}
												</Text>
											</HStack>
											<Divider />
											<HStack justify="space-between" w="full">
												<Text fontSize="lg" fontWeight="bold">Total:</Text>
												<Text fontSize="lg" fontWeight="bold" color="blue.600">
													{formatPrice(totalAmount)}
												</Text>
											</HStack>
										</VStack>
									</Box>
								)}

								<Button
									type="submit"
									colorScheme="blue"
									size="lg"
									isLoading={bookingLoading}
									loadingText="Creating booking..."
									isDisabled={totalDays <= 0}
									w="full"
								>
									Confirm Booking
								</Button>

								<Text fontSize="sm" color="gray.500" textAlign="center">
									By confirming this booking, you agree to our terms and conditions.
								</Text>
							</VStack>
						</form>
					</Box>
				</SimpleGrid>
			</VStack>
		</Container>
	);
};

export default BookingPage;