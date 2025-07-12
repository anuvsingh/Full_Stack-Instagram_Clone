import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Text,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { signinAction } from '../../redux/Auth/Action';
import { useEffect } from 'react';
import { getUserProfileAction } from '../../redux/User/Action';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is Required'),
});

const Signin = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store);
  const jwt = localStorage.getItem("token")

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          dispatch(getUserProfileAction(token));
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, [dispatch, jwt]);

  const handleSubmit = async (values, actions) => {
    try {
      const result = dispatch(signinAction(values));
      if (result?.error) {
        throw new Error(result.error);
      }
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication failed - no token received");
      }
      const profileResult = dispatch(getUserProfileAction(token));
      if (profileResult?.payload?.username) {
        navigate(`/${user.reqUser?.username}`);
      } else {
        throw new Error("Failed to load user profile");
      }
    } catch (error) {
      let errorMessage = "Sign-in failed";
      if (error.message.includes("401")) {
        errorMessage = "Invalid email or password";
      } else if (error.message.includes("network")) {
        errorMessage = "Network error - please check your connection";
      }
      console.error("Sign-in error:", error);
      alert(errorMessage);
    } finally {
      actions.setSubmitting(false);
    }
  };

  useEffect(() => {
    if (user.reqUser?.username) {
      navigate(`/${user.reqUser?.username}`)
    }
  }, [jwt, user.reqUser])

  const handleNavigate = () => navigate('/signup');

  useEffect(() => {
    if (jwt) {
      dispatch(getUserProfileAction(jwt))
    }
  }, [jwt])


  return (
    <Box
      minH="100vh"
      bg="gray.50"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      p={4}
    >
      <Box
        bg="white"
        p={8}
        border="1px"
        borderColor="gray.200"
        borderRadius="md"
        w={{ base: '90%', sm: '400px' }}
        textAlign="center"
      >
        <img
          src="https://i.imgur.com/zqpwkLQ.png"
          alt="Instagram Logo"
          className="mx-auto mb-6"
          style={{ maxWidth: '200px' }}
        />

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form className="space-y-4">
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email}>
                    <Input {...field} id="email" placeholder="Phone number, username, or email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password}>
                    <Input type="password" {...field} id="password" placeholder="Password" />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                width="100%"
                mt={2}
                colorScheme="blue"
                type="submit"
                isLoading={formikProps.isSubmitting}
              >
                Log In
              </Button>

              <Box display="flex" alignItems="center" my={4}>
                <Box flex="1" height="1px" bg="gray.300" />
                <Text px={3} fontSize="sm" color="gray.500" fontWeight="bold">
                  OR
                </Text>
                <Box flex="1" height="1px" bg="gray.300" />
              </Box>

              <Button
                width="100%"
                colorScheme="facebook"
                variant="ghost"
              >
                <img className='px-2' src="/facebook.png" alt="" />
                Log in with Facebook
              </Button>

              <Text fontSize="sm" mt={2} color="blue.500" cursor="pointer">
                Forgot password?
              </Text>
            </Form>
          )}
        </Formik>
      </Box>

      <Box
        bg="white"
        border="1px"
        borderColor="gray.200"
        mt={4}
        p={4}
        textAlign="center"
        w={{ base: '90%', sm: '400px' }}
      >
        <Text>
          Don't have an account?{' '}
          <span onClick={handleNavigate} className="text-blue-600 cursor-pointer font-semibold">
            Sign up
          </span>
        </Text>
      </Box>
    </Box>
  );
};

export default Signin;
