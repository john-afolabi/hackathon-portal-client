import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import WideBody from "../../../assets/styles/atoms/WideBodyStyling";
import BodyContainer from "../../../assets/styles/atoms/BodyContainerStyling";
import Container from "../../../assets/styles/atoms/ContainerStyling";
import { H1 } from "../../../assets/styles/atoms/HeadingStyling";
import { Paragraph } from "../../../assets/styles/atoms/ParagraphStyling";
import { RowBody } from "../../../assets/styles/atoms/RowBodyStyling";
import { ErrorSpan } from "../../../assets/styles/atoms/SpanStyling";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { resetPassword } from "../../../store/user/actions";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = values => {
    const { newPassword, newPasswordConfirm } = values;
    if (newPassword === newPasswordConfirm) {
      dispatch(resetPassword(newPassword, history));
    }
  };

  const schema = Yup.object().shape({
    newPassword: Yup.string()
      .required("Password is required.")
      .min(8, "Password must be at least 8 characters long."),
    newPasswordConfirm: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Password confirm is required.")
  });

  return (
    <div>
      <Header />
      <WideBody>
        <BodyContainer justify="center">
          <HeroImage src={image} alt="Reset passowrd" />
          <Container>
            <H1>Change the password</H1>
            <Paragraph>
              Please enter new password and confirm it in the second input
              field.
            </Paragraph>
            <Formik
              initialValues={{ newPassword: "", newPasswordConfirm: "" }}
              onSubmit={handleSubmit}
              validationSchema={schema}
            >
              {({ errors, touched }) => (
                <Form>
                  <Input
                    display="wide"
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    placeholder="Enter new password"
                  />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                  <ErrorSpan>
                    <ErrorMessage name="newPassword" />
                  </ErrorSpan>
                  <Input
                    display="wide"
                    id="newPasswordConfirm"
                    type="password"
                    name="newPasswordConfirm"
                    placeholder="Confirm new password"
                  />
                  {errors.name && touched.name ? (
                    <div>{errors.name}</div>
                  ) : null}
                  <ErrorSpan>
                    <ErrorMessage name="newPasswordConfirm" />
                  </ErrorSpan>
                  <RowBody>
                    <Button type="submit" size="wide" color="blue">
                      Change Password
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
