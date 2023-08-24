import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
} from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogs } from '../Redux/actions/blogs.actions';
import { Link } from 'react-router-dom';
import Info from './Alert';
const BlogTags = (props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={'md'} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

const BlogAuthor = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export const MyArticleList = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);

  let y = useColorModeValue('gray.700', 'gray.200');
  let x = useColorModeValue(
    'radial(orange.600 1px, transparent 1px)',
    'radial(orange.300 1px, transparent 1px)'
  );

  
  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  return (
    <>
      {blog.MyBlogs?.length > 0 ? (
        <Box width={'80%'} m="auto" mt="5%">
          <Heading as="h1">My Blogs</Heading>
        </Box>
      ) : (
        <Info content="You have No Blogs" />
      )}
      {blog.MyBlogs?.map((item, index) => {
        return (
          <Link to={`/single/${item._id}`} key={index}>
            <Container maxW={'7xl'} p="12" key={index}>
              <Box
                display={['flex', 'grid', 'flex', 'flex']}
                flexDirection={{ base: 'column', sm: 'row' }}
                justifyContent="space-between"
              >
                <Box
                  display="flex"
                  flex="1"
                  marginRight="3"
                  position="relative"
                  alignItems="center"
                >
                  <Box
                    width={{ base: '100%', sm: '85%' }}
                    zIndex="2"
                    marginLeft={{ base: '0', sm: '5%' }}
                    marginTop="5%"
                  >
                    <Box
                      textDecoration="none"
                      _hover={{ textDecoration: 'none' }}
                    >
                      <Image
                        borderRadius="lg"
                        // src={
                        //   'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80'
                        // }
                        src={item.avatar}
                        alt="some good alt text"
                        objectFit="contain"
                      />
                    </Box>
                  </Box>
                  <Box
                    zIndex="1"
                    width="100%"
                    position="absolute"
                    height="100%"
                  >
                    <Box
                      bgGradient={x}
                      backgroundSize="20px 20px"
                      opacity="0.4"
                      height="100%"
                    />
                  </Box>
                </Box>
                <Box
                  display="flex"
                  flex="1"
                  flexDirection="column"
                  justifyContent="center"
                  marginTop={{ base: '3', sm: '0' }}
                >
                  <BlogTags tags={['Engineering', 'Product']} />
                  <Heading marginTop="1">
                    <Text
                      textDecoration="none"
                      _hover={{ textDecoration: 'none' }}
                    >
                      {/* Blog article title */}
                      {item.title}
                    </Text>
                  </Heading>
                  <Box overflow={'hidden'} lineHeight={'30px'}>
                    <Text
                      as="p"
                      marginTop="2"
                      color={y}
                      fontSize="lg"
                      noOfLines={5}
                    >
                      {/* Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry&apos;s
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a type
                    specimen book. */}
                      {item.body}
                    </Text>
                  </Box>
                  <BlogAuthor
                    name="John Doe"
                    // date={new Date('2021-04-06T19:01:27Z')}
                    date={new Date(item.createdAt)}
                  />
                </Box>
              </Box>
              {/* <Heading as="h2" marginTop="5">
          Latest articles
        </Heading> */}
              <Divider marginTop="5" />
            </Container>
          </Link>
        );
      })}
      <Box width={'75%'} m={'auto'} pb="50px">
        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2">What we write about</Heading>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
          <Text as="p" fontSize="lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            condimentum quam arcu, eu tempus tortor molestie at. Vestibulum
            pretium condimentum dignissim. Vestibulum ultrices vitae nisi sed
            imperdiet. Mauris quis erat consequat, commodo massa quis, feugiat
            sapien. Suspendisse placerat vulputate posuere. Curabitur neque
            tortor, mattis nec lacus non, placerat congue elit.
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default MyArticleList;
