import LoginInput from "components/inputs/loginInput";
import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import "./style.scss";

const loginInfos = {
    email: "",
    password: "",
};

function Login() {
    const [login, setLogin] = useState(loginInfos);
    const { email, password } = login;
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLogin((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const loginValidation = Yup.object({
        email: Yup.string()
            .required("Email address is required.")
            .email("Must be a valid email.")
            .max(100),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least six characters"),
    });

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
                                onSubmit={(values) => {
                                    console.log(values);
                                }}
                                enableReinitialize
                                initialValues={{
                                    email,
                                    password,
                                }}
                                validationSchema={loginValidation}
                            >
                                {(formik) => (
                                    <Form>
                                        <LoginInput
                                            type="text"
                                            name="email"
                                            placeholder="Email address or phone number"
                                            onChange={handleLoginChange}
                                        />
                                        <LoginInput
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            onChange={handleLoginChange}
                                            bottom
                                        />
                                        <button type="submit" className="blue_button">
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
                            <b>Create a page</b> for a celebrity, brand or businessman
                        </Link>
                    </div>
                </div>
                <div className="register" />
            </div>
        </section>
    );
}

export default Login;
