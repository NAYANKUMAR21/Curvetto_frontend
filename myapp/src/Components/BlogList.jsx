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
import { AiFillDelete } from 'react-icons/ai';
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

export const ArticleList = () => {
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blog);
  const [data, setData] = useState([]);
  let y = useColorModeValue('gray.700', 'gray.200');
  let x = useColorModeValue(
    'radial(orange.600 1px, transparent 1px)',
    'radial(orange.300 1px, transparent 1px)'
  );

  useEffect(() => {
    dispatch(getBlogs());
  }, []);
  if (blog.loading) {
    return <Text fontSize={'2xl'}>...Loading</Text>;
  }
  return (
    <>
      {blog.blog?.length > 0 ? (
        <Box width={'80%'} m="auto" mt="5%">
          <Heading as="h1">Stories And Blogs</Heading>
          <Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.400'}
            _hover={{
              bg: 'pink.300',
            }}
          >
            <Link to="/my-blogs">My Blogs</Link>
          </Button>{' '}
        </Box>
      ) : (
        <Info content="You have No vlogs" />
      )}

      {blog.blog?.map((item, index) => {
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
                    name={item.userId.username}
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
            Blog posts are a fundamental and versatile medium of communication
            in the digital age. They serve as a platform for individuals,
            businesses, and organizations to share their thoughts, ideas,
            expertise, and experiences with a global audience. Blogging has
            become an integral part of content marketing strategies, personal
            branding efforts, and knowledge dissemination.
          </Text>
          <Text as="p" fontSize="lg">
            One of the key strengths of blog posts lies in their accessibility.
            Anyone with an internet connection can publish a blog post and reach
            potentially millions of readers. This democratization of content
            creation has empowered individuals to become creators, thought
            leaders, and influencers in various domains. Whether you're
            passionate about travel, technology, cooking, fashion, or any other
            subject, a blog can be your canvas to express yourself and connect
            with like-minded people.
          </Text>
          <Text as="p" fontSize="lg">
            A well-crafted blog post usually follows a coherent structure. It
            begins with an attention-grabbing headline and introduction,
            designed to hook readers and provide context for the topic. The body
            of the post delves deeper into the subject matter, presenting
            information, insights, and perspectives. Visual aids like images,
            infographics, and videos can enhance the content's appeal and
            clarify complex ideas.
          </Text>
          <Text as="p" fontSize="lg">
            The art of effective blogging lies not only in conveying information
            but also in engaging the reader emotionally. Sharing personal
            anecdotes, experiences, and relatable stories can create a strong
            bond between the writer and the audience. Additionally,
            incorporating a call to action (CTA) at the end of the post
            encourages readers to interact, whether that means leaving comments,
            sharing the post on social media, or subscribing to updates.
          </Text>
          <Text as="p" fontSize="lg">
            Search engine optimization (SEO) is another vital aspect of
            blogging. By using relevant keywords, optimizing meta descriptions,
            and structuring content logically, bloggers can improve the
            visibility of their posts on search engines, driving organic traffic
            to their websites.
          </Text>
          <Text as="p" fontSize="lg">
            In the realm of business and marketing, blogs play a crucial role in
            establishing authority and building trust. Regularly publishing
            high-quality, informative content demonstrates expertise in a
            particular field, attracting potential customers and clients. It's a
            way to provide value upfront and nurture relationships before any
            transactions take place. As the digital landscape continues to
            evolve, so does the blogging sphere. Social media integration,
            multimedia elements, and interactive features are transforming
            traditional blog posts into engaging, dynamic experiences.
            Additionally, guest blogging and collaborations allow writers to tap
            into new audiences and expand their reach.
          </Text>
          <Text as="p" fontSize="lg">
            In summary, blog posts are a dynamic form of communication that
            bridges the gap between individuals and the vast online world. They
            serve as a conduit for knowledge sharing, creative expression,
            marketing endeavors, and community building. Whether you're a
            seasoned blogger or just starting, the power of a well-crafted blog
            post can never be underestimated in making a meaningful impact.
          </Text>
        </VStack>
      </Box>
    </>
  );
};

export default ArticleList;
