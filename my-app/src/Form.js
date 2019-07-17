import React from "react";
import { withFormik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";

function LoginForm({ errors, touched, isSubmitting, values }) {

    console.log(isSubmitting);

    return (

        <Form className="login-form">

            <h2> Create A New User </h2>

            <div className="form-group">

                <label htmlFor="username"> First Name  </label>

                <Field

                    autoComplete="off"

                    type="text"

                    id="firstName"

                    name="firstName"

                    className={errors.firstName ? "invalid" : ""}

                />

                <p className="error-text">

                    {touched.firstName && errors.firstName}

                </p>

            </div>

            <div className="form-group">

                <label htmlFor="username"> Email  </label>

                <Field

                    autoComplete="off"

                    type="email"

                    id="email"

                    name="email"

                    className={errors.firstName ? "invalid" : ""}

                />

                <p className="error-text">

                    {touched.firstName && errors.firstName}

                </p>

            </div>

            <div className="form-group">

                <label htmlFor="password"> Password  </label>

                <Field

                    autoComplete="off"

                    type="password"

                    id="password"

                    name="password"

                />

                <p className="error-text">

                    {touched.lastName && errors.lastName}

                </p>

            </div>

            {isSubmitting && <p> Loading... </p>}

            <label>

                <   Field type="checkbox" name="tos" checked={values.tos} />

                I Accept The TOS

        </label>

            <div>

            </div>
                <br></br>
            
            <button

                className="submit-button"

                disabled={isSubmitting}

            >

                Submit Your Application &rarr;

      </button>

        </Form>

    );
}

export default withFormik({

    mapPropsToValues: () => {

        return {

            name: "",

            email: "",

            password: ""

        };

    },

    handleSubmit: (values, formikBag) => {

        formikBag.resetForm();

        console.log("FORM SUCCESSFULLY SUBMITTED");

        const url = "https://reqres.in/api/users";

        formikBag.setSubmitting(true);

        axios.post(url, values).then(response => {

            console.log(response.data);

            window.alert(

                "Form Submitted " + response.data.firstName

            );

            formikBag.setSubmitting(false);

        });

    },

    validationSchema: Yup.object().shape({

        firstName: Yup.string()

            .min(

                3,
                
                "First Name must be at least 5 characters long"

            )

            .max(10)

            .required("First Name is required"),


    })

    

})(LoginForm);
