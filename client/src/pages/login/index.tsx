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
                                {() => (
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
                <footer className="login_footer">
                    <div className="login_footer_wrap">
                        <Link to="/">English(UK)</Link>
                        <Link to="/">Français(FR)</Link>
                        <Link to="/">العربية</Link>
                        <Link to="/">ⵜⴰⵎⴰⵣⵉⵖⵜ</Link>
                        <Link to="/">Español (España)</Link>
                        <Link to="/">italiano</Link>
                        <Link to="/">Deutsch</Link>
                        <Link to="/">Português (Brasil)</Link>
                        <Link to="/">हिन्दी</Link>
                        <Link to="/">中文(简体)</Link>
                        <Link to="/">日本語</Link>
                        <Link to="/" className="footer_square">
                            <i className="plus_icon" />
                        </Link>
                    </div>
                    <div className="footer_splitter" />
                    <div className="login_footer_wrap">
                        <Link to="/">Sign Up</Link>
                        <Link to="/">Log in</Link>
                        <Link to="/">Messenger</Link>
                        <Link to="/">Facebook Lite</Link>
                        <Link to="/">Watch</Link>
                        <Link to="/">Places</Link>
                        <Link to="/">Games</Link>
                        <Link to="/">Marketplace</Link>
                        <Link to="/">Facebook Pay</Link>
                        <Link to="/">Oculus</Link>
                        <Link to="/">Portal</Link>
                        <Link to="/">Instagram</Link>
                        <Link to="/">Bulletin</Link>
                        <Link to="/">Local</Link>
                        <Link to="/">Fundraisers</Link>
                        <Link to="/">Services</Link>
                        <Link to="/">Voting Information Centre</Link>
                        <Link to="/">Groups</Link>
                        <Link to="/">About</Link>
                        <Link to="/">Create ad</Link>
                        <Link to="/">Create Page</Link>
                        <Link to="/">Developers</Link>
                        <Link to="/">Careers</Link>
                        <Link to="/">Privacy</Link>
                        <Link to="/">Cookies</Link>
                        <Link to="/">
                            AdChoices
                            <i className="adChoices_icon" />
                        </Link>
                        <Link to="/">Terms</Link>
                        <Link to="/">Help</Link>
                    </div>
                    <div className="login_footer_wrap">
                        <Link to="/" style={{ fontSize: "12px", marginTop: "10px" }}>
                            Meta © 2022
                        </Link>
                    </div>
                </footer>
            </div>
        </section>
    );
}

export default Login;
