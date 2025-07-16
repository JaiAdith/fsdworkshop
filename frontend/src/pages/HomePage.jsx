import {
	Container,
	VStack,
	Text,
	Button,
	Box,
	SimpleGrid,
	Icon,
	Heading,
	Stack,
	useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IoCarSport, IoShield, IoTime, IoStar } from "react-icons/io5";

const Feature = ({ icon, title, text }) => {
	return (
		<Stack align="center" textAlign="center">
			<Icon as={icon} w={12} h={12} color="blue.500" />
			<Text fontWeight={600}>{title}</Text>
			<Text color="gray.600">{text}</Text>
		</Stack>
	);
};

const HomePage = () => {
	const bgColor = useColorModeValue("white", "gray.800");
	const heroGradient = useColorModeValue(
		"linear(to-r, blue.400, purple.500)",
		"linear(to-r, blue.200, purple.300)"
	);

	return (
		<>
			{/* Hero Section */}
			<Box
				bg={useColorModeValue("gray.50", "gray.900")}
				py={20}
				px={4}
			>
				<Container maxW="container.xl">
					<VStack spacing={8} textAlign="center">
						<Heading
							fontSize={{ base: "4xl", md: "6xl" }}
							fontWeight="bold"
							bgGradient={heroGradient}
							bgClip="text"
						>
							Find Your Perfect Ride
						</Heading>
						<Text
							fontSize={{ base: "lg", md: "xl" }}
							color="gray.500"
							maxW="2xl"
						>
							Discover our premium collection of rental cars. From economy to luxury,
							we have the perfect vehicle for every journey and budget.
						</Text>
						<Stack direction={{ base: "column", md: "row" }} spacing={4}>
							<Link to="/cars">
								<Button
									colorScheme="blue"
									size="lg"
									px={8}
									py={6}
									fontSize="lg"
								>
									Browse Cars
								</Button>
							</Link>
							<Link to="/register">
								<Button
									variant="outline"
									colorScheme="blue"
									size="lg"
									px={8}
									py={6}
									fontSize="lg"
								>
									Get Started
								</Button>
							</Link>
						</Stack>
					</VStack>
				</Container>
			</Box>

			{/* Features Section */}
			<Box py={20} bg={bgColor}>
				<Container maxW="container.xl">
					<VStack spacing={12}>
						<VStack spacing={4} textAlign="center">
							<Heading fontSize="3xl">Why Choose CarRental?</Heading>
							<Text color="gray.500" fontSize="lg">
								We provide the best car rental experience with premium service
							</Text>
						</VStack>

						<SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
							<Feature
								icon={IoCarSport}
								title="Premium Fleet"
								text="Choose from our extensive collection of well-maintained, premium vehicles"
							/>
							<Feature
								icon={IoShield}
								title="Fully Insured"
								text="All our vehicles come with comprehensive insurance coverage for your peace of mind"
							/>
							<Feature
								icon={IoTime}
								title="24/7 Support"
								text="Round-the-clock customer support to assist you whenever you need help"
							/>
							<Feature
								icon={IoStar}
								title="Best Rates"
								text="Competitive pricing with no hidden fees. Get the best value for your money"
							/>
						</SimpleGrid>
					</VStack>
				</Container>
			</Box>

			{/* CTA Section */}
			<Box
				bg={useColorModeValue("blue.50", "blue.900")}
				py={16}
			>
				<Container maxW="container.xl">
					<VStack spacing={6} textAlign="center">
						<Heading fontSize="3xl">Ready to Hit the Road?</Heading>
						<Text fontSize="lg" color="gray.600">
							Start your journey today with our premium car rental service
						</Text>
						<Link to="/cars">
							<Button colorScheme="blue" size="lg" px={8}>
								Find Your Car
							</Button>
						</Link>
					</VStack>
				</Container>
			</Box>
		</>
	);
};

export default HomePage;
