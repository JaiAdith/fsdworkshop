import {
	Box,
	Image,
	Text,
	Button,
	VStack,
	HStack,
	Badge,
	Icon,
	useColorModeValue,
	Heading,
	Divider,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { 
	IoCarSport, 
	IoSpeedometer, 
	IoSettingsOutline, 
	IoPeopleOutline,
	IoLocationOutline 
} from "react-icons/io5";

const CarCard = ({ car }) => {
	const bgColor = useColorModeValue("white", "gray.700");
	const borderColor = useColorModeValue("gray.200", "gray.600");

	const getStatusColor = (isAvailable) => {
		return isAvailable ? "green" : "red";
	};

	const formatPrice = (price) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD',
		}).format(price);
	};

	return (
		<Box
			bg={bgColor}
			borderWidth="1px"
			borderColor={borderColor}
			borderRadius="lg"
			overflow="hidden"
			shadow="md"
			transition="all 0.2s"
			_hover={{
				shadow: "lg",
				transform: "translateY(-2px)",
			}}
		>
			<Image
				src={car.image || "https://via.placeholder.com/400x250?text=Car+Image"}
				alt={`${car.brand} ${car.model}`}
				height="200px"
				width="100%"
				objectFit="cover"
			/>

			<VStack p={6} align="stretch" spacing={4}>
				<VStack align="stretch" spacing={2}>
					<HStack justify="space-between" align="center">
						<Badge
							colorScheme={getStatusColor(car.isAvailable)}
							variant="subtle"
							px={2}
							py={1}
							borderRadius="md"
						>
							{car.isAvailable ? "Available" : "Not Available"}
						</Badge>
						<Badge
							colorScheme="blue"
							variant="outline"
							px={2}
							py={1}
							borderRadius="md"
						>
							{car.category}
						</Badge>
					</HStack>

					<Heading size="md" color="blue.600">
						{car.brand} {car.model}
					</Heading>

					<Text color="gray.500" fontSize="sm">
						{car.year} • {car.color}
					</Text>
				</VStack>

				<Divider />

				<VStack spacing={2} align="stretch">
					<HStack justify="space-between">
						<HStack spacing={2}>
							<Icon as={IoCarSport} color="gray.500" />
							<Text fontSize="sm" color="gray.600">
								{car.fuelType}
							</Text>
						</HStack>
						<HStack spacing={2}>
							<Icon as={IoSettingsOutline} color="gray.500" />
							<Text fontSize="sm" color="gray.600">
								{car.transmission}
							</Text>
						</HStack>
					</HStack>

					<HStack justify="space-between">
						<HStack spacing={2}>
							<Icon as={IoPeopleOutline} color="gray.500" />
							<Text fontSize="sm" color="gray.600">
								{car.seats} seats
							</Text>
						</HStack>
						<HStack spacing={2}>
							<Icon as={IoLocationOutline} color="gray.500" />
							<Text fontSize="sm" color="gray.600" noOfLines={1}>
								{car.location}
							</Text>
						</HStack>
					</HStack>
				</VStack>

				<Divider />

				<VStack spacing={3}>
					<HStack justify="space-between" align="center" w="full">
						<VStack spacing={0} align="start">
							<Text fontSize="2xl" fontWeight="bold" color="blue.600">
								{formatPrice(car.pricePerDay)}
							</Text>
							<Text fontSize="sm" color="gray.500">
								per day
							</Text>
						</VStack>
					</HStack>

					<HStack spacing={2} w="full">
						<Link to={`/cars/${car._id}`} style={{ flex: 1 }}>
							<Button
								colorScheme="blue"
								variant="outline"
								size="sm"
								w="full"
							>
								View Details
							</Button>
						</Link>
						{car.isAvailable && (
							<Link to={`/booking/${car._id}`} style={{ flex: 1 }}>
								<Button
									colorScheme="blue"
									size="sm"
									w="full"
								>
									Book Now
								</Button>
							</Link>
						)}
					</HStack>
				</VStack>
			</VStack>
		</Box>
	);
};

export default CarCard;