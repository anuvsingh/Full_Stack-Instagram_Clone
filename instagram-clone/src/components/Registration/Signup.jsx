import React, { useEffect } from 'react'
import { Box, Button, Divider, FormControl, FormErrorMessage, Input, Text, useToast } from '@chakra-ui/react'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { signupAction } from '../../redux/Auth/Action'

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is Required"),
})

const Signup = () => {

  const initialValues = { email: "", password: "", name: "", username: "" };
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { auth } = useSelector(store => store);
  const toast = useToast()

  const handleNavigate = () => navigate("/signin")

  const handleSubmit = (values, actions) => {
    console.log("Values:", values)
    dispatch(signupAction(values))
    actions.setSubmitting(false)
  };

  useEffect(() => {
    if (auth.signup?.username) {
      navigate("/signin");
      toast({
        title: `Account created. ${auth.signup?.username}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [auth.signup])

  return (
    <Box bg="gray.50" minH="100vh" display="flex" justifyContent="center" alignItems="center" flexDirection="column" py={10}>
      {/* Main Card */}
      <Box bg="white" p={8} width="350px" border="1px solid #dbdbdb" borderRadius="md" textAlign="center">
        <img className='mb-5' src="https://i.imgur.com/zqpwkLQ.png" alt="Instagram Logo" style={{ margin: "0 auto", marginBottom: 20 }} />

        <Text fontSize="sm" mb={4}>Sign up to see photos and videos from your friends.</Text>

        <Button colorScheme="facebook" width="100%" mb={4}><img className='p-1' src="/fb.png" alt="" />Log in with Facebook</Button>

        <Divider my={4} />

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Form>
              <Field name="email">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.email && form.touched.email} mb={3}>
                    <Input {...field} id='email' placeholder='Mobile Number or Email' />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="password">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.password && form.touched.password} mb={3}>
                    <Input {...field} id='password' type="password" placeholder='Password' />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="name">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.name && form.touched.name} mb={3}>
                    <Input {...field} id='name' placeholder='Full Name' />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="username">
                {({ field, form }) => (
                  <FormControl isInvalid={form.errors.username && form.touched.username} mb={3}>
                    <Input {...field} id='username' placeholder='Username' />
                    <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Text fontSize="xs" color="gray.600" mb={2}>
                People who use our service may have uploaded your contact information to Instagram. <span style={{ color: '#00376b', cursor: 'pointer' }}>Learn More</span>
              </Text>

              <Text fontSize="xs" color="gray.600" mb={4}>
                By signing up, you agree to our <span style={{ color: '#00376b' }}>Terms</span>, <span style={{ color: '#00376b' }}>Privacy Policy</span> and <span style={{ color: '#00376b' }}>Cookies Policy</span>.
              </Text>

              <Button width="100%" colorScheme='blue' type='submit' isLoading={formikProps.isSubmitting}>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      {/* Secondary card */}
      <Box bg="white" mt={4} p={4} width="350px" border="1px solid #dbdbdb" textAlign="center">
        <Text>Have an account? <span onClick={handleNavigate} style={{ color: '#0095f6', cursor: 'pointer' }}>Log in</span></Text>
      </Box>
    </Box>
  )
}

export default Signup
