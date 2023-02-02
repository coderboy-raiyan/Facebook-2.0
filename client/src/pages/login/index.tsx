import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import "./style.scss";

interface MyFormValues {
    email: string;
    password: string;
}

function Login() {
    const initialValues: MyFormValues = { email: "", password: "" };
    return (
        <section className="login">
            <div className="login_wrapper">
                <div className="login_wrap">
                    <div className="login_1">
                        <img src="../../icons/facebook.svg" alt="" />
                        <h4>
                            Facebook helps you to connect and share with the people in your life
                        </h4>
                    </div>
                    <div className="login_2">
                        <div className="login_2_wrap">
                            <Formik
                                onSubmit={(values, actions) => {
                                    console.log({ values, actions });
                                    alert(JSON.stringify(values, null, 2));
                                    actions.setSubmitting(false);
                                }}
                                initialValues={initialValues}
                            >
                                {(formik: any) => (
                                    <Form>
                                        <input type="email" />
                                        <input type="password" />
                                        <button className="blue_button" type="submit">
                                            Log In
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                            <Link to="/forget" className="forget_password">
                                Forgotten password ?
                            </Link>
                            <div className="sign_splitter" />
                            <button type="button" className="blue_button open_signup">
                                Create account
                            </button>
                        </div>
                        <Link className="sign_extra" to="/">
                            <b>Create a page</b>for a celebrity, brand or businessman
                        </Link>
                    </div>
                </div>
                <div className="register" />
            </div>
        </section>
    );
}

export default Login;
