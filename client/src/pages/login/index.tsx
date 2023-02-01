import { Form, Formik } from "formik";
import { Link } from "react-router-dom";

function Login() {
    return (
        <section className="login">
            <div>
                {/* form header */}
                <div>
                    <img loading="lazy" src="../../icons/facebook.svg" alt="" />
                    <h4>Facebook helps you to connect and share with the people in your life</h4>
                </div>

                {/* form */}
                <div>
                    <Formik>
                        {(formik) => (
                            <Form>
                                <input type="email" />
                                <input type="password" />
                                <button type="submit">Login</button>
                            </Form>
                        )}
                    </Formik>
                    <Link to="/register">Forgotten Password ?</Link>
                </div>
            </div>
        </section>
    );
}

export default Login;
