import {
	Container,
	VStack,
	HStack,
	Text,
	Button,
	Box,
	Image,
	Badge,
	Icon,
	useColorModeValue,
	Heading,
	Divider,
	SimpleGrid,
	List,
	ListItem,
	ListIcon,
	Spinner,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
	IoCarSport, 
	IoSettingsOutline, 
	IoPeopleOutline,
	IoLocationOutline,
	IoCheckmarkCircle
} from "react-icons/io5";
import { useCarStore } from "../store/carStore";

const CarDetailsPage = () => {
	const { id } = useParams();
	const { fetchCar, loading, error } = useCarStore();
	const [car, setCar] = useState(null);

	useEffect(() => {
		const loadCar = async () => {
			const result = await fetchCar(id);
			if (result.success) {
				setCar(result.data);
			}
		};
		loadCar();
	}, [id, fetchCar]);

	const bgColor = useColorModeValue("white", "gray.700");

	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price);
	};

	if (loading) {
		return (
			<Container maxW="container.xl" py={8}>
				<VStack py={12}>
					<Spinner size="xl" color="blue.500" />
					<Text>Loading car details...</Text>
				</VStack>
			</Container>
		);
	}

	if (error) {
		return (
			<Container maxW="container.xl" py={8}>
				<Alert status="error" borderRadius="md">
					<AlertIcon />
					{error}
				</Alert>
			</Container>
		);
	}

	if (!car) {
		return (
			<Container maxW="container.xl" py={8}>
				<Alert status="error" borderRadius="md">
					<AlertIcon />
					Car not found
				</Alert>
			</Container>
		);
	}

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={8} align="stretch">
				<SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
					{/* Car Image */}
					<Box>
						<Image
							src={car.image || "https://via.placeholder.com/600x400?text=Car+Image"}
							alt={`${car.brand} ${car.model}`}
							borderRadius="lg"
							w="full"
							h="400px"
							objectFit="cover"
						/>
					</Box>

					{/* Car Info */}
					<VStack spacing={6} align="stretch">
						<VStack align="stretch" spacing={3}>
							<HStack justify="space-between">
								<Badge
									colorScheme={car.isAvailable ? "green" : "red"}
									variant="subtle"
									px={3}
									py={1}
									borderRadius="md"
									fontSize="sm"
								>
									{car.isAvailable ? "Available" : "Not Available"}
								</Badge>
								<Badge
									colorScheme="blue"
									variant="outline"
									px={3}
									py={1}
									borderRadius="md"
									fontSize="sm"
								>
									{car.category}
								</Badge>
							</HStack>

							<Heading size="xl" color="blue.600">
								{car.brand} {car.model}
							</Heading>

							<Text color="gray.500" fontSize="lg">
								{car.year} • {car.color} • License: {car.licensePlate}
							</Text>
						</VStack>

						<Divider />

						{/* Specifications */}
						<SimpleGrid columns={2} spacing={4}>
							<VStack spacing={3}>
								<HStack spacing={3} w="full">
									<Icon as={IoCarSport} color="blue.500" boxSize={5} />
									<Box>
										<Text fontSize="sm" color="gray.500">Fuel Type</Text>
										<Text fontWeight="semibold">{car.fuelType}</Text>
									</Box>
								</HStack>

								<HStack spacing={3} w="full">
									<Icon as={IoPeopleOutline} color="blue.500" boxSize={5} />
									<Box>
										<Text fontSize="sm" color="gray.500">Seats</Text>
										<Text fontWeight="semibold">{car.seats} passengers</Text>
									</Box>
								</HStack>
							</VStack>

							<VStack spacing={3}>
								<HStack spacing={3} w="full">
									<Icon as={IoSettingsOutline} color="blue.500" boxSize={5} />
									<Box>
										<Text fontSize="sm" color="gray.500">Transmission</Text>
										<Text fontWeight="semibold">{car.transmission}</Text>
									</Box>
								</HStack>

								<HStack spacing={3} w="full">
									<Icon as={IoLocationOutline} color="blue.500" boxSize={5} />
									<Box>
										<Text fontSize="sm" color="gray.500">Location</Text>
										<Text fontWeight="semibold">{car.location}</Text>
									</Box>
								</HStack>
							</VStack>
						</SimpleGrid>

						<Divider />

						{/* Price and Booking */}
						<VStack spacing={4}>
							<HStack justify="space-between" w="full">
								<VStack spacing={0} align="start">
									<Text fontSize="3xl" fontWeight="bold" color="blue.600">
										{formatPrice(car.pricePerDay)}
									</Text>
									<Text color="gray.500">per day</Text>
								</VStack>
							</HStack>

							{car.isAvailable ? (
								<Link to={`/booking/${car._id}`} style={{ width: "100%" }}>
									<Button
										colorScheme="blue"
										size="lg"
										w="full"
										py={6}
										fontSize="lg"
									>
										Book This Car
									</Button>
								</Link>
							) : (
								<Button
									colorScheme="gray"
									size="lg"
									w="full"
									py={6}
									fontSize="lg"
									isDisabled
								>
									Currently Unavailable
								</Button>
							)}
						</VStack>
					</VStack>
				</SimpleGrid>

				{/* Description and Features */}
				<SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
					{/* Description */}
					{car.description && (
						<Box bg={bgColor} p={6} borderRadius="lg" shadow="md">
							<Heading size="md" mb={4} color="blue.600">
								About This Car
							</Heading>
							<Text color="gray.600" lineHeight="tall">
								{car.description}
							</Text>
						</Box>
					)}

					{/* Features */}
					{car.features && car.features.length > 0 && (
						<Box bg={bgColor} p={6} borderRadius="lg" shadow="md">
							<Heading size="md" mb={4} color="blue.600">
								Features & Amenities
							</Heading>
							<List spacing={2}>
								{car.features.map((feature, index) => (
									<ListItem key={index}>
										<ListIcon as={IoCheckmarkCircle} color="green.500" />
										{feature}
									</ListItem>
								))}
							</List>
						</Box>
					)}
				</SimpleGrid>
			</VStack>
		</Container>
	);
};

export default CarDetailsPage;