import { useAuth0 } from "@auth0/auth0-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import userService from "../services/userService";
import "../index.css";

export default function WelcomePage() {
  let navigate = useNavigate();
  const { user } = useAuth0();
  const initialValues = {
    firstName: user?.given_name,
    lastName: user?.family_name,
    birthday: "",
    phoneNumber: "",
    profession: "",
    email: user?.email,

    privacyPolicyAccepted: false,
  };

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { privacyPolicyAccepted, ...welcomeForm } = values;
      await userService.saveUser(welcomeForm);
      navigate(0);
    } catch (error) {
      console.log(error);
    }
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    birthday: Yup.date().required("Birthday is required"),
    email: Yup.string().required("Email is required"),
    phoneNumber: Yup.number().required("Phone Number is required"),
    role: Yup.string().required("Profession is required"),
    privacyPolicyAccepted: Yup.boolean().oneOf([true], "Required"),
  });

  return (
    <Container>
      <div className="m-auto-0">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          
          {({ isSubmitting }) => (
            <Form className="bg-glass mt-5">
              <div>
                <div className="row d-flex justify-content-center align-items-center">
                  <div className="col-lg-4 ms-5">
                    <div className="form-group">
                      <label htmlFor="email" className="text-dark">
                        <b>Email</b>
                      </label>
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger fw-bold display-6"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="firstName" className="text-dark">
                        <b>First Name</b>
                      </label>
                      <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="text-danger fw-bold display-6"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName" className="text-dark">
                        <b>Last Name</b>
                      </label>
                      <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="text-danger fw-bold display-6"
                      />
                    </div>
                  </div>
                  <div className="col-lg-4 ms-5">
                    <div className="form-group">
                      <label htmlFor="birthday" className="text-dark">
                        <b>Birthday</b>
                      </label>
                      <Field
                        type="date"
                        name="birthday"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="birthday"
                        component="div"
                        className="text-danger fw-bold display-6"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phoneNumber" className="text-dark">
                        <b>Phone Number</b>
                      </label>
                      <Field
                        type="tel"
                        name="phoneNumber"
                        className="form-control"
                        maxLength={10}
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="div"
                        className="text-danger fw-bold display-6"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="role" className="text-dark">
                        <b>What is your profession</b>
                      </label>
                      <br />
                      <Field as="select" type="text" name="role" className="form-control">
                        <option value="">User...</option>
                        <option value="cleaner">Cleaner</option>
                        <option value="electrician">Electrician</option>
                        <option value="painter">Painter</option>
                        <option value="waterman">Waterman</option>
                      </Field>
                      <ErrorMessage
                        name="role"
                        component="div"
                        className="text-danger fw-bold display-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group form-check mt-5 d-flex justify-content-center align-items-center">
                    <Field
                      type="checkbox"
                      name="privacyPolicyAccepted"
                      className="form-check-input"
                      id="privacyPolicyAccepted"
                    />
                    <label
                      htmlFor="privacyPolicyAccepted"
                      className="form-check-label text-dark "
                    >
                      <b className="text-danger m-3">
                        I accept the Privacy Policy
                      </b>
                    </label>
                    <ErrorMessage
                      component="div"
                      name="privacyPolicyAccepted"
                      className="text-danger"
                    />
                  </div>
                  <div className="d-flex justify-content-center align-items-center mt-5">
                    <button
                      type="submit"
                      className="btn btn-primary w-25"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
