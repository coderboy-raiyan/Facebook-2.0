import { Form, Formik } from "formik";
import { useState } from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";
import LoginInputs from "../../components/inputs/loginInputs/loginInputs";
import "./style.scss";

function Login() {
    const [loginInfo, setLoginInfo] = useState({ email: "", password: "" });

    function handelLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const loginValidation = yup.object({
        password: yup
            .string()
            .min(6, "Password must be at least 6 charterers!")
            .max(100)
            .required("Password is required!!"),
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
                                onSubmit={(values, actions) => {
                                    console.log({ values, actions });
                                }}
                                initialValues={loginInfo}
                                validationSchema={loginValidation}
                            >
                                {(formik: any) => (
                                    <Form>
                                        <LoginInputs
                                            type="email"
                                            name="email"
                                            placeholder="Email address or phone number"
                                            handelLoginChange={handelLoginChange}
                                            values={loginInfo.email}
                                        />
                                        <LoginInputs
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            handelLoginChange={handelLoginChange}
                                            values={loginInfo.password}
                                        />
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
