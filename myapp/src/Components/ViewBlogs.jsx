'use client';
import axios from 'axios';
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditBlog } from '../Redux/actions/blogs.actions';
import { useNavigate } from 'react-router-dom';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
const handleChangeCLOUDINERY = async (files) => {
  //   const { files } = e.target;
  const copy = [...files];

  let formData = new FormData();
  formData.append('file', copy[0]);
  formData.append('upload_preset', 'ukrr1ekh');
  let x = await axios.post(
    'https://api.cloudinary.com/v1_1/dc3akfh6t/image/upload',
    formData
  );
  // .then((res) => res.data.url);

  return x.data.secure_url;
};
export default function ViewBlog() {
  const nav = useNavigate();
  const [Imageloading, setImageLoading] = useState(false);
  const dispatch = useDispatch();
  const toast = useToast();
  const [blogItem, SetBlogItem] = useState({
    title: '',
    image: '',
    body: '',
  });
  const blog = useSelector((state) => state.blog);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == 'file') {
      SetBlogItem({ ...blogItem, image: e.target.files });

      return;
    }
    SetBlogItem({ ...blogItem, [name]: value });
  };
  const handleClick = async () => {
    setImageLoading(true);

    const { title, body } = blogItem;
    if (title == '' || body == '') {
      return toast({
        title: 'Empty Feilds',
        description: 'feilds shouldnt be empty',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }

    if (
      typeof blogItem.image !== 'object' &&
      blogItem.image.length &&
      blogItem.image.split('://').includes('https')
    ) {
      setImageLoading(false);
      dispatch(EditBlog(blog.SingleBlog._id, { ...blogItem }));
      return nav('/');
    }
    let x = await handleChangeCLOUDINERY(blogItem.image);
    setImageLoading(false);
    dispatch(EditBlog(blog.SingleBlog._id, { ...blogItem, image: x }));

    // <Navigate to="/" />;
    return nav('/');
  };
  useEffect(() => {
    SetBlogItem({
      title: blog.SingleBlog?.title,
      image: blog.SingleBlog?.avatar,
      body: blog.SingleBlog?.body,
    });
  }, []);
  return (
    <Box position={'relative'} mt="50px">
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        // py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            Editing Blogs Made Ez{' '}
            {/* <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text"
            >
              &
            </Text>{' '}
            <Text>Full-Stack Developers</Text> */}
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              minWidth={useBreakpointValue({ base: '44px', md: '60px' })}
              minHeight={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}
            >
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Edit it
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              >
                !
              </Text>
            </Heading>
          </Stack>
          <Box as={'form'} mt={5}>
            <Stack spacing={4}>
              <Input
                name="title"
                value={blogItem.title}
                onChange={handleChange}
                placeholder="Title"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              <Input
                padding={'5px'}
                name="file"
                // value={blogItem.image}
                onChange={handleChange}
                type="file"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                placeholder={'Choose Image'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />
              {/* <Input
                placeholder="Body"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              /> */}
              <Textarea
                name="body"
                value={blogItem.body}
                onChange={handleChange}
                placeholder="Body"
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
                // rows="5"
                // cols="40"?
                width={'100%'}
                height="400px"
              ></Textarea>
              {/* <Input
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              /> */}

              {/* <Button fontFamily={'heading'} bg={'gray.200'} color={'gray.800'}>
                Upload CV
              </Button> */}
            </Stack>
            <Button
              onClick={handleClick}
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, red.400,pink.400)',
                boxShadow: 'xl',
              }}
              isLoading={Imageloading}
            >
              Submit
            </Button>
          </Box>
          form
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}
