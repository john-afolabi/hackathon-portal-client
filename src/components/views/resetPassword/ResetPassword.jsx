import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import Input from "../../atoms/Input";
import { WideBody } from "../../../assets/styles/atoms/WideBodyStyling";
import { BodyContainer } from "../../../assets/styles/atoms/BodyContainerStyling";
import { RowBody } from "../../../assets/styles/atoms/RowBody";
import { Footer } from "../../organisms/index";
import Button from "../../atoms/Button";
import { ErrorSpan } from "../../../assets/styles/atoms/Span";
import { forgotPassword } from "../../../store/user/actions";
import Header from "../../organisms/Header";
import { useHistory } from "react-router-dom";
import HeroImage from "../../atoms/HeroImage";
import { Container } from "../../../assets/styles/atoms/Container";
import { H1 } from "../../../assets/styles/atoms/Heading";
import { Paragraph } from "../../../assets/styles/atoms/Paragraph";
import image from "../../../assets/images/Password.png";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = values => {
    const { email } = values;
    dispatch(forgotPassword(email, history));
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Please use a valid email address.")
      .required("Email address is required.")
  });

  return (
    <div>
      <Header />
      <WideBody>
        <BodyContainer justify="center">
          <HeroImage src={image} alt="Reset passowrd" />
          <Container>
            <H1>Reset the password</H1>
            <Paragraph>
              Enter your email address so we can reset your password and send a
              link to your inbox.
            </Paragraph>
            <Formik
              initialValues={{ email: "" }}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({ errors, touched }) => (
                <Form>
                  <Input
                    display="wide"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email address"
                  />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                  <ErrorSpan>
                    <ErrorMessage name="email" />
                  </ErrorSpan>
                  <RowBody>
                    <Button size="wide" type="submit" color="blue">
                      Reset Password
                    </Button>
                  </RowBody>
                </Form>
              )}
            </Formik>
          </Container>
        </BodyContainer>
      </WideBody>
      <Footer />
    </div>
  );
};

export default ResetPassword;
