import React, { useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import queryString from "query-string";
import { StyledAnchor } from "../styles/organisms/FormStyling";
import Container from "../atoms/Container";
import { H1 } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { ErrorSpan } from "../atoms/Span";
import { useDispatch, useSelector } from "react-redux";
import { register, login } from "../../store/user/actions";
import SocialMedia from "../molecules/SocialMedia";
import { socialAuthLoad, verifyEmail } from "../../store/user/actions";


const CustomForm = ({ ctaText, formHeader, formParagraph }) => {
  const dispatch = useDispatch();
  const { search, state } = useLocation();
  const { team, role, google, github, verified, ref } = queryString.parse(search);
  const { token } = useSelector(state => state.currentUser);

  useEffect(() => {
    if (google || github) {
      dispatch(socialAuthLoad());
    }
    if (verified) {
      dispatch(verifyEmail());
    }
  }, [google, github, verified, dispatch]);

  const handleSubmit = values => {
    const { email, password } = values;
    if (ctaText.toLowerCase() === "log in") {
      dispatch(login(email, password));
    } else {
      dispatch(register(email, password, role, team));
    }
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Please use a valid email address.")
      .required("Email address is required."),
    password: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long.")
      .max(50, "Password cannot be more than 50 characters long.")
  });

  if (token) {
    return <Redirect to={state ?.from || ref || '/dashboard'} />;
  }

  return (
    <Container>
      <H1>{formHeader}</H1>

      <Paragraph>{formParagraph}</Paragraph>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={schema}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              display="wide"
              type="text"
              name="email"
              placeholder="Email address"
            />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <ErrorSpan>
              <ErrorMessage name="email" />
            </ErrorSpan>
            <Input
              display="wide"
              type="password"
              name="password"
              placeholder="Password"
            />
            {errors.name && touched.name ? <div>{errors.name}</div> : null}
            <ErrorSpan>
              <ErrorMessage name="password" />
            </ErrorSpan>

            <Button type="submit" size="wide" color="blue">
              {ctaText}
            </Button>
            {ctaText.toLowerCase() === "log in" && (
              <StyledAnchor to="/forgotpassword">
                Forgot password?
                </StyledAnchor>
            )}
          </Form>
        )}
      </Formik>

      <SocialMedia></SocialMedia>
    </Container>
  );
};

export default CustomForm;