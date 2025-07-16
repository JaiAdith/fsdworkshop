import {
	Container,
	VStack,
	Text,
	Button,
	Box,
	useColorModeValue,
	Heading,
	FormControl,
	FormLabel,
	Input,
	SimpleGrid,
	Alert,
	AlertIcon,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useUserStore } from "../store/userStore";

const ProfilePage = () => {
	const { user, updateProfile, loading, error } = useUserStore();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		address: {
			street: "",
			city: "",
			state: "",
			zipCode: "",
			country: "",
		},
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		if (user) {
			setFormData({
				name: user.name || "",
				email: user.email || "",
				phone: user.phone || "",
				address: {
					street: user.address?.street || "",
					city: user.address?.city || "",
					state: user.address?.state || "",
					zipCode: user.address?.zipCode || "",
					country: user.address?.country || "",
				},
			});
		}
	}, [user]);

	const bgColor = useColorModeValue("white", "gray.700");

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
		setSuccessMessage("");

		const result = await updateProfile(formData);
		
		if (result.success) {
			setSuccessMessage("Profile updated successfully!");
		}
		
		setIsSubmitting(false);
	};

	return (
		<Container maxW="2xl" py={8}>
			<VStack spacing={8} align="stretch">
				<VStack spacing={4} textAlign="center">
					<Heading fontSize="3xl" color="blue.500">
						My Profile
					</Heading>
					<Text color="gray.500" fontSize="lg">
						Update your account information
					</Text>
				</VStack>

				<Box bg={bgColor} p={8} borderRadius="lg" shadow="lg">
					<form onSubmit={handleSubmit}>
						<VStack spacing={6} align="stretch">
							{error && (
								<Alert status="error" borderRadius="md">
									<AlertIcon />
									{error}
								</Alert>
							)}

							{successMessage && (
								<Alert status="success" borderRadius="md">
									<AlertIcon />
									{successMessage}
								</Alert>
							)}

							<Text fontSize="lg" fontWeight="semibold" color="blue.500">
								Personal Information
							</Text>

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
								loadingText="Updating profile..."
								w="full"
							>
								Update Profile
							</Button>
						</VStack>
					</form>
				</Box>
			</VStack>
		</Container>
	);
};

export default ProfilePage;