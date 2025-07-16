import {
	Button,
	Container,
	Flex,
	HStack,
	Text,
	useColorMode,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Avatar,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

import { IoMoon, IoCarSport } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FiChevronDown } from "react-icons/fi";
import { useUserStore } from "../store/userStore";

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { isAuthenticated, user, logout, isAdmin } = useUserStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<Container maxW={"1200px"} px={4}>
			<Flex
				h={16}
				alignItems={"center"}
				justifyContent={"space-between"}
				flexDir={{
					base: "column",
					sm: "row",
				}}
			>
				<Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, blue.400, purple.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>
						<Flex alignItems="center" gap={2}>
							<IoCarSport />
							CarRental
						</Flex>
					</Link>
				</Text>

				<HStack spacing={4} alignItems={"center"}>
					<Link to={"/cars"}>
						<Button variant="ghost" colorScheme="blue">
							Browse Cars
						</Button>
					</Link>

					{isAuthenticated ? (
						<>
							<Menu>
								<MenuButton
									as={Button}
									rightIcon={<FiChevronDown />}
									variant="ghost"
									colorScheme="blue"
								>
									<HStack>
										<Avatar size="sm" name={user?.name} />
										<Text display={{ base: "none", md: "block" }}>
											{user?.name}
										</Text>
									</HStack>
								</MenuButton>
								<MenuList>
									<MenuItem onClick={() => navigate("/dashboard")}>
										My Bookings
									</MenuItem>
									<MenuItem onClick={() => navigate("/profile")}>
										Profile
									</MenuItem>
									{isAdmin() && (
										<MenuItem onClick={() => navigate("/admin")}>
											Admin Dashboard
										</MenuItem>
									)}
									<MenuItem onClick={handleLogout}>
										Logout
									</MenuItem>
								</MenuList>
							</Menu>
						</>
					) : (
						<>
							<Link to={"/login"}>
								<Button variant="ghost" colorScheme="blue">
									Login
								</Button>
							</Link>
							<Link to={"/register"}>
								<Button colorScheme="blue">
									Sign Up
								</Button>
							</Link>
						</>
					)}

					<Button onClick={toggleColorMode} variant="ghost">
						{colorMode === "light" ? <IoMoon /> : <LuSun size="20" />}
					</Button>
				</HStack>
			</Flex>
		</Container>
	);
};
export default Navbar;
