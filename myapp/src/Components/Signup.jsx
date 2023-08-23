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
} from '@chakra-ui/react';
import { FaUserAlt, FaLock, FaBirthdayCake } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SignupAction } from '../Redux/actions/auth.actions';
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const dispatch = useDispatch();
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
    console.log(cred);
    return dispatch(SignupAction(cred));
  };

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
