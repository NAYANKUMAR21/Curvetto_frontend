'use client';

import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  HStack,
  Input,
  FormControl,
  InputGroup,
  InputLeftElement,
  Avatar,
  Divider,
  Image,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AiFillLike, AiFillDislike } from 'react-icons/ai';
import { FaCommentAlt } from 'react-icons/fa';
import {
  getBlogs,
  getSingleBlog,
  postComment,
} from '../Redux/actions/blogs.actions';
export default function WithBackgroundImage() {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);
  const [comment, setComment] = useState('');
  const { id } = useParams();
  console.log(id);
  console.log(blog);
  const handleClick = (e) => {
    e.preventDefault();
    let obj = {
      blogId: blog.SingleBlog?._id,
      comment,
    };
    return dispatch(postComment(obj)).then((res) =>
      dispatch(getSingleBlog(id))
    );
    console.log('comment', comment);
  };
  const handleLike = () => {};
  const handleDislike = () => {};
  useEffect(() => {
    dispatch(getSingleBlog(id));
  }, [id]);
  return (
    <>
      <Flex
        w={'full'}
        h={'100vh'}
        backgroundImage={
          blog.SingleBlog?.avatar
            ? `url(${blog.SingleBlog?.avatar})`
            : 'url(https://media.istockphoto.com/id/1063375198/vector/abstract-gray-gradient-color-background.jpg?s=612x612&w=0&k=20&c=fvqiWFmN4Jw_uUAnbJcOWN4ULigrS6ZGCHs72eEY88Q=)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
      >
        <VStack
          w={'full'}
          justify={'center'}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={'linear(to-r, blackAlpha.600, transparent)'}
        >
          <Stack maxW={'2xl'} align={'flex-start'} spacing={6}>
            <Text
              color={'white'}
              fontWeight={700}
              lineHeight={1.2}
              fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
            >
              {blog.SingleBlog?.title}
            </Text>
            <Stack direction={'row'}>
              <Button
                bg={'whiteAlpha.300'}
                rounded={'full'}
                color={'white'}
                _hover={{ bg: 'whiteAlpha.500' }}
              >
                Scroll down to see more
              </Button>
            </Stack>
          </Stack>
        </VStack>
      </Flex>
      <Box w="80%" m="auto" mt="50px">
        <Flex justifyContent={'space-between'} width={'15%'}>
          <Button gap="10px">
            {blog.SingleBlog?.likes}
            <AiFillLike />
          </Button>
          <Button gap="10px">
            {blog.SingleBlog?.dislikes}

            <AiFillDislike color="gray.700" />
          </Button>
        </Flex>
        <Box mt="30px">
          <form onSubmit={handleClick}>
            <FormControl>
              <InputGroup>
                <InputLeftElement
                  //   color="gray.300"
                  pointerEvents="none"
                  children={<FaCommentAlt />}
                />
                <Input
                  borderRadius={'0px'}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  type="text"
                  placeholder="Comment..."
                />
              </InputGroup>
            </FormControl>
          </form>
        </Box>
      </Box>
      <Box w="80%" m="auto" mt="30px">
        <Text lineHeight={'50px'} fontSize="2xl" textAlign={'justify'}>
          {blog.SingleBlog?.body}
        </Text>
        <Text
          mt="40px"
          mb="40px"
          color={'black'}
          fontWeight={700}
          lineHeight={1.2}
          fontSize={useBreakpointValue({ base: '3xl', md: '4xl' })}
        >
          Comments
        </Text>
        <Box>
          {blog.SingleBlog?.comments?.length > 0 && (
            <Box ml="30px">
              {blog.SingleBlog?.comments?.map((item, index) => {
                console.log(item);
                return (
                  <Box mt="10px">
                    <Flex gap="10px">
                      <Box>
                        {' '}
                        {/* <Avatar
                          name={item.userId.username}
                          src={`https://bit.ly/dan-abramov`}
                        /> */}
                        <Image
                          borderRadius="full"
                          boxSize="40px"
                          src="https://100k-faces.glitch.me/random-image"
                          alt={`Avatar of ${item.userId.username}`}
                        />
                      </Box>
                      <Box>
                        <Text fontWeight={'bold'}>
                          {item?.userId?.username}
                        </Text>
                        <Text>{item?.text}</Text>
                      </Box>
                    </Flex>
                    <Divider mt="20px" />
                  </Box>
                );
              })}
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}