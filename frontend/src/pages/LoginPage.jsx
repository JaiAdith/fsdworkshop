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
} from "@chakra-ui/react";
import { useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "../store/userStore";

const LoginPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { login, loading, error } = useUserStore();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/dashboard";

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		const result = await login(formData.email, formData.password);
		
		if (result.success) {
			navigate(from, { replace: true });
		}
		
		setIsSubmitting(false);
	};

	return (
		<Container maxW="md" py={12}>
			<VStack spacing={8}>
				<VStack spacing={4} textAlign="center">
					<Heading fontSize="3xl" color="blue.500">
						Welcome Back
					</Heading>
					<Text color="gray.500">
						Sign in to your account to continue
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
									placeholder="Enter your password"
									focusBorderColor="blue.500"
								/>
							</FormControl>

							<Button
								type="submit"
								colorScheme="blue"
								size="lg"
								isLoading={loading || isSubmitting}
								loadingText="Signing in..."
								w="full"
							>
								Sign In
							</Button>

							<Text textAlign="center">
								Don't have an account?{" "}
								<Link
									as={RouterLink}
									to="/register"
									color="blue.500"
									fontWeight="semibold"
								>
									Sign up here
								</Link>
							</Text>
						</Stack>
					</form>
				</Box>
			</VStack>
		</Container>
	);
};

export default LoginPage;