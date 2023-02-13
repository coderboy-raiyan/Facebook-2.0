import Footer from "./Footer";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

import "./style.scss";

function Login() {
    return (
        <section className="login">
            <div className="login_wrapper">
                <LoginForm />
                <RegisterForm />
                <Footer />
            </div>
        </section>
    );
}

export default Login;
