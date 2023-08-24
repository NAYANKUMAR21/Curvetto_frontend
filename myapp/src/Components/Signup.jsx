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
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaBirthdayCake } from 'react-icons/fa';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SignupAction } from '../Redux/actions/auth.actions';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
  const Auth = useSelector((state) => state.Auth);
  const [cred, SetCred] = useState({
    name: '',
    username: '',
    password: '',
    birthdate: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    SetCred({ ...cred, [name]: value });
  };
  const handleClick = (e) => {
    e.preventDefault();
    const { name, username, password, birthdate } = cred;
    if (!name || !username || !password || !birthdate) {
      return toast({
        position: 'bottom-left',
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            Do not leave any feild empty
          </Box>
        ),
      });
    }
    
    return dispatch(SignupAction(cred));
  };
  if (Auth.isAuth) {
    return <Navigate to="/" />;
  }
  if (Auth.loading) {
    return <Text fontSize="2xl">..Loading</Text>;
  }
  if (Auth.error && !Auth.errorMessage) {
    toast({
      position: 'bottom-left',
      isClosable: true,
      duration: 5000,
      render: () => {
        return (
          <Box color="white" p={3} bg="blue.500">
            Something Went Wrong Please try once again
          </Box>
        );
      },
    });
  }
  return (
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
        <Heading color="teal.400">Sign-up</Heading>
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
                    color="gray.300"
                    pointerEvents="none"
                    children={<CFaUserAlt />}
                  />
                  <Input
                    name="name"
                    value={cred.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Name"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    color="gray.300"
                    pointerEvents="none"
                    children={<CFaUserAlt />}
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
                    color="gray.300"
                    pointerEvents="none"
                    children={<FaBirthdayCake />}
                  />
                  <Input
                    name="birthdate"
                    value={cred.birthdate}
                    onChange={handleChange}
                    type="date"
                    placeholder="Birthdate"
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.300"
                    children={<CFaLock />}
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
              </FormControl>
              <Button
                onClick={handleClick}
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
              >
                Signup
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have account? <NavLink to="/login">Login</NavLink>
      </Box>
    </Flex>
  );
};

export default Signup;
