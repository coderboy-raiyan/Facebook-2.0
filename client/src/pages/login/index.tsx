import Footer from "./Footer";
import LoginForm from "./LoginForm";

import "./style.scss";

function Login() {
    return (
        <section className="login">
            <div className="login_wrapper">
                <LoginForm />
                <div className="register" />
                <Footer />
            </div>
        </section>
    );
}

export default Login;
