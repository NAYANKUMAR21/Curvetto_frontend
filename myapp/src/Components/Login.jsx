import { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  Text,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Signup from './Signup';
import { LoginAction } from '../Redux/actions/auth.actions';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Login = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [showPassword, setShowPassword] = useState(false);
  const [cred, SetCred] = useState({
    username: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetCred({ ...cred, [name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const { name, username, password, birthdate } = cred;
    if (name == '' || username == '' || password == '' || birthdate == '') {
      return toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            Do not leave any feild empty
          </Box>
        ),
      });
    }
    if (password.length <= 4) {
      return toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            Password length should be more than 5 charcaters
          </Box>
        ),
      });
    }

    return dispatch(LoginAction(cred));
  };
  const handleShowClick = () => setShowPassword(!showPassword);
  if (Auth.isAuth) {
    return <Navigate to="/" />;
  }
  if (Auth.loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }
  if (Auth.error) {
    toast({
      position: 'bottom-left',
      render: () => (
        <Box color="white" p={3} bg="blue.500">
          {Auth.errorMessage}
        </Box>
      ),
    });
    return <Navigate to="/signup" />;
  }

  return (
    <>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Login</Heading>
          <Box minW={{ base: '90%', md: '468px' }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      name="username"
                      value={cred.username}
                      onChange={handleChange}
                      type="text"
                      placeholder="Username"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      name="password"
                      value={cred.password}
                      onChange={handleChange}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Password"
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? 'Hide' : 'Show'}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  {/* <FormHelperText textAlign="right">
                  <NavLink>forgot password?</NavLink>
                </FormHelperText> */}
                </FormControl>
                <Button
                  onClick={handleClick}
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          New to us?{' '}
          <NavLink to="/signup" color="teal.500">
            Sign Up
          </NavLink>
        </Box>
      </Flex>
    </>
  );
};

export default Login;
