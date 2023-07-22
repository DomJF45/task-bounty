import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  useToast,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { reset, getUser, register } from "../../features/userSlice";
import { IncomingUserData } from "../../features/userService";
import { getTokenFromLocalStorage } from "../../utils/getUserFromLocalStorage";

export default function RegisterCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"Contributor (IC)" | "Manager (PM)">(
    "Contributor (IC)"
  );

  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, success, loading, error } = useAppSelector(
    (state) => state.user
  );

  const handleRegister = async () => {
    try {
      const userRegister: IncomingUserData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        title: userType,
      };
      await dispatch(register(userRegister));

      if (success && user) {
        dispatch(reset());
        fetchUserData;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      const token = getTokenFromLocalStorage();
      if (token !== undefined) {
        await dispatch(getUser(token));
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      dispatch(reset());
      fetchUserData();
      if (success && user) {
        toast({
          status: "success",
          title: "Signed Up!",
          position: "bottom-right",
          isClosable: true,
        });
        navigate("/dashboard");
      }
    }

    if (error) {
      toast({
        status: "error",
        title: "Can not Sign up",
        position: "bottom-right",
        isClosable: true,
      });
    }

    return () => {
      dispatch(reset());
    };
  }, [error, toast, success, navigate, dispatch, fetchUserData, user]);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start earning within your company 🔥
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.currentTarget.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.currentTarget.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <Select
                placeholder="select user type"
                value={userType}
                onChange={(e) =>
                  setUserType(e.currentTarget.value as typeof userType)
                }
              >
                <option value="Contributor (IC)">
                  Individual Contributor (IC)
                </option>
                <option value="Manager (PM)">Project Manager (PM)</option>
              </Select>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"orange.400"}
                color={"white"}
                _hover={{
                  bg: "orange.500",
                }}
                onClick={handleRegister}
              >
                {loading ? <Spinner /> : "Sign Up"}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link as={RouterLink} to={"/login"} color={"orange.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
