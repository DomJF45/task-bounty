import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { reset } from "../../features/userSlice";
import { login } from "../../features/userService";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useNavigate, Link as RouterLink } from "react-router-dom";

export default function LoginCard() {
  const dispatch = useAppDispatch();
  const { user, loading, success, error } = useAppSelector(
    (state) => state.user
  );
  const toast = useToast();
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPass, setUserPass] = useState<string>("");
  const [showPass, setShowPass] = useState<boolean>(false);

  const handleLogin = async () => {
    try {
      const userLogin = {
        email: userEmail,
        password: userPass,
      };
      await dispatch(login(userLogin));
    } catch (err: unknown) {
      toast({
        status: "error",
        title: "Incorrect Information",
        position: "bottom-right",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    if (success) {
      toast({
        status: "success",
        title: "Logged In!",
        position: "bottom-right",
        isClosable: true,
      });
      navigate("/dashboard");
    }

    if (error) {
      toast({
        status: "error",
        title: "Error Logging In",
        position: "bottom-right",
        isClosable: true,
      });
    }

    return () => {
      dispatch(reset());
    };
  }, [error, toast, success, navigate, dispatch]);

  console.log("render");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to start earning within your{" "}
            <Link color={"orange.400"}>company</Link> 🔥
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.currentTarget.value)}
                placeholder="example@mail.com"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPass ? "text" : "password"}
                  value={userPass}
                  onChange={(e) => setUserPass(e.currentTarget.value)}
                  placeholder="password"
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() => setShowPass((prev) => !prev)}
                    color={"gray.600"}
                  >
                    {showPass ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text>Don't have an account? </Text>
                <Link color={"orange.400"} as={RouterLink} to={"/register"}>
                  Sign Up!
                </Link>
              </Stack>
              <Button
                bg={"orange.400"}
                color={"white"}
                _hover={{
                  bg: "orange.500",
                }}
                type="submit"
                onClick={handleLogin}
              >
                {loading ? <Spinner /> : "Sign In"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
