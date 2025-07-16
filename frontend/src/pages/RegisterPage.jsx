import {
	Box,
	Button,
	Container,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Text,
	useColorModeValue,
	Alert,
	AlertIcon,
	VStack,
	SimpleGrid,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		phone: "",
		dateOfBirth: "",
		licenseNumber: "",
		address: {
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
		},
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { register, loading, error } = useUserStore();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		
		if (name.startsWith("address.")) {
			const addressField = name.split(".")[1];
			setFormData({
				...formData,
				address: {
					...formData.address,
					[addressField]: value,
				},
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const result = await register(formData);
		
		if (result.success) {
			navigate("/dashboard");
		}
		
		setIsSubmitting(false);
	};

	return (
		<Container maxW="2xl" py={12}>
			<VStack spacing={8}>
				<VStack spacing={4} textAlign="center">
					<Heading fontSize="3xl" color="blue.500">
						Create Your Account
					</Heading>
					<Text color="gray.500">
						Join us to start renting premium cars today
					</Text>
				</VStack>

				<Box
					bg={useColorModeValue("white", "gray.700")}
					p={8}
					borderRadius="lg"
					shadow="lg"
					w="full"
				>
					<form onSubmit={handleSubmit}>
						<Stack spacing={6}>
							{error && (
								<Alert status="error" borderRadius="md">
									<AlertIcon />
									{error}
								</Alert>
							)}

							<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
								<FormControl isRequired>
									<FormLabel>Full Name</FormLabel>
									<Input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="Enter your full name"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl isRequired>
									<FormLabel>Email Address</FormLabel>
									<Input
										type="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="Enter your email"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl isRequired>
									<FormLabel>Password</FormLabel>
									<Input
										type="password"
										name="password"
										value={formData.password}
										onChange={handleChange}
										placeholder="Create a password"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl isRequired>
									<FormLabel>Phone Number</FormLabel>
									<Input
										type="tel"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										placeholder="Enter your phone number"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl isRequired>
									<FormLabel>Date of Birth</FormLabel>
									<Input
										type="date"
										name="dateOfBirth"
										value={formData.dateOfBirth}
										onChange={handleChange}
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl isRequired>
									<FormLabel>License Number</FormLabel>
									<Input
										type="text"
										name="licenseNumber"
										value={formData.licenseNumber}
										onChange={handleChange}
										placeholder="Enter your license number"
										focusBorderColor="blue.500"
									/>
								</FormControl>
							</SimpleGrid>

							<Text fontSize="lg" fontWeight="semibold" color="blue.500">
								Address Information
							</Text>

							<SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
								<FormControl>
									<FormLabel>Street Address</FormLabel>
									<Input
										type="text"
										name="address.street"
										value={formData.address.street}
										onChange={handleChange}
										placeholder="Enter street address"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>City</FormLabel>
									<Input
										type="text"
										name="address.city"
										value={formData.address.city}
										onChange={handleChange}
										placeholder="Enter city"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>State</FormLabel>
									<Input
										type="text"
										name="address.state"
										value={formData.address.state}
										onChange={handleChange}
										placeholder="Enter state"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>ZIP Code</FormLabel>
									<Input
										type="text"
										name="address.zipCode"
										value={formData.address.zipCode}
										onChange={handleChange}
										placeholder="Enter ZIP code"
										focusBorderColor="blue.500"
									/>
								</FormControl>

								<FormControl>
									<FormLabel>Country</FormLabel>
									<Input
										type="text"
										name="address.country"
										value={formData.address.country}
										onChange={handleChange}
										placeholder="Enter country"
										focusBorderColor="blue.500"
									/>
								</FormControl>
							</SimpleGrid>

							<Button
								type="submit"
								colorScheme="blue"
								size="lg"
								isLoading={loading || isSubmitting}
								loadingText="Creating account..."
								w="full"
							>
								Create Account
							</Button>

							<Text textAlign="center">
								Already have an account?{" "}
								<Link
									as={RouterLink}
									to="/login"
									color="blue.500"
									fontWeight="semibold"
								>
									Sign in here
								</Link>
							</Text>
						</Stack>
					</form>
				</Box>
			</VStack>
		</Container>
	);
};

export default RegisterPage;