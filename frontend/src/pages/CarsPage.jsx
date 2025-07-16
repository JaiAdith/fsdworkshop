import {
	Container,
	VStack,
	HStack,
	Text,
	SimpleGrid,
	Box,
	Input,
	Select,
	Button,
	Heading,
	useColorModeValue,
	InputGroup,
	InputLeftElement,
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	FormControl,
	FormLabel,
	Spinner,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import { useCarStore } from "../store/carStore";
import CarCard from "../components/CarCard";

const CarsPage = () => {
	const { cars, loading, error, fetchCars, searchCars } = useCarStore();
	const [filters, setFilters] = useState({
		category: "",
		fuelType: "",
		transmission: "",
		location: "",
		minPrice: 0,
		maxPrice: 500,
	});
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		fetchCars();
	}, [fetchCars]);

	const handleFilterChange = (field, value) => {
		const newFilters = { ...filters, [field]: value };
		setFilters(newFilters);
		
		// Apply filters
		const queryFilters = {};
		Object.keys(newFilters).forEach(key => {
			if (newFilters[key] && newFilters[key] !== "" && newFilters[key] !== 0) {
				queryFilters[key] = newFilters[key];
			}
		});
		
		fetchCars(queryFilters);
	};

	const handleSearch = async () => {
		if (searchQuery.trim()) {
			await searchCars(searchQuery);
		} else {
			await fetchCars();
		}
	};

	const clearFilters = () => {
		setFilters({
			category: "",
			fuelType: "",
			transmission: "",
			location: "",
			minPrice: 0,
			maxPrice: 500,
		});
		setSearchQuery("");
		fetchCars();
	};

	const bgColor = useColorModeValue("white", "gray.700");

	return (
		<Container maxW="container.xl" py={8}>
			<VStack spacing={8} align="stretch">
				<VStack spacing={4} textAlign="center">
					<Heading fontSize="3xl" color="blue.500">
						Available Cars
					</Heading>
					<Text color="gray.500" fontSize="lg">
						Find the perfect vehicle for your next journey
					</Text>
				</VStack>

				{/* Search and Filters */}
				<Box bg={bgColor} p={6} borderRadius="lg" shadow="md">
					<VStack spacing={6}>
						{/* Search Bar */}
						<InputGroup size="lg">
							<InputLeftElement pointerEvents="none">
								<SearchIcon color="gray.300" />
							</InputLeftElement>
							<Input
								placeholder="Search by brand, model, location..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyPress={(e) => e.key === "Enter" && handleSearch()}
								focusBorderColor="blue.500"
							/>
							<Button
								ml={4}
								colorScheme="blue"
								onClick={handleSearch}
								px={8}
							>
								Search
							</Button>
						</InputGroup>

						{/* Filters */}
						<SimpleGrid columns={{ base: 1, md: 2, lg: 5 }} spacing={4} w="full">
							<FormControl>
								<FormLabel>Category</FormLabel>
								<Select
									placeholder="All Categories"
									value={filters.category}
									onChange={(e) => handleFilterChange("category", e.target.value)}
									focusBorderColor="blue.500"
								>
									<option value="Economy">Economy</option>
									<option value="Compact">Compact</option>
									<option value="Mid-size">Mid-size</option>
									<option value="Full-size">Full-size</option>
									<option value="SUV">SUV</option>
									<option value="Luxury">Luxury</option>
									<option value="Sports">Sports</option>
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Fuel Type</FormLabel>
								<Select
									placeholder="All Fuel Types"
									value={filters.fuelType}
									onChange={(e) => handleFilterChange("fuelType", e.target.value)}
									focusBorderColor="blue.500"
								>
									<option value="Petrol">Petrol</option>
									<option value="Diesel">Diesel</option>
									<option value="Electric">Electric</option>
									<option value="Hybrid">Hybrid</option>
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Transmission</FormLabel>
								<Select
									placeholder="All Transmissions"
									value={filters.transmission}
									onChange={(e) => handleFilterChange("transmission", e.target.value)}
									focusBorderColor="blue.500"
								>
									<option value="Manual">Manual</option>
									<option value="Automatic">Automatic</option>
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Location</FormLabel>
								<Input
									placeholder="Enter location"
									value={filters.location}
									onChange={(e) => handleFilterChange("location", e.target.value)}
									focusBorderColor="blue.500"
								/>
							</FormControl>

							<FormControl>
								<FormLabel>
									Price Range: ${filters.minPrice} - ${filters.maxPrice}
								</FormLabel>
								<RangeSlider
									min={0}
									max={500}
									step={10}
									value={[filters.minPrice, filters.maxPrice]}
									onChange={(values) => {
										handleFilterChange("minPrice", values[0]);
										handleFilterChange("maxPrice", values[1]);
									}}
									colorScheme="blue"
								>
									<RangeSliderTrack>
										<RangeSliderFilledTrack />
									</RangeSliderTrack>
									<RangeSliderThumb index={0} />
									<RangeSliderThumb index={1} />
								</RangeSlider>
							</FormControl>
						</SimpleGrid>

						<Button variant="outline" colorScheme="blue" onClick={clearFilters}>
							Clear All Filters
						</Button>
					</VStack>
				</Box>

				{/* Results */}
				<Box>
					{loading ? (
						<VStack py={12}>
							<Spinner size="xl" color="blue.500" />
							<Text>Loading cars...</Text>
						</VStack>
					) : error ? (
						<Alert status="error" borderRadius="md">
							<AlertIcon />
							{error}
						</Alert>
					) : cars.length === 0 ? (
						<VStack py={12} spacing={4}>
							<Text fontSize="xl" fontWeight="bold" color="gray.500">
								No cars found
							</Text>
							<Text color="gray.400">
								Try adjusting your search criteria or filters
							</Text>
						</VStack>
					) : (
						<>
							<Text mb={6} color="gray.600">
								Showing {cars.length} car{cars.length !== 1 ? 's' : ''}
							</Text>
							<SimpleGrid
								columns={{ base: 1, md: 2, lg: 3 }}
								spacing={6}
							>
								{cars.map((car) => (
									<CarCard key={car._id} car={car} />
								))}
							</SimpleGrid>
						</>
					)}
				</Box>
			</VStack>
		</Container>
	);
};

export default CarsPage;