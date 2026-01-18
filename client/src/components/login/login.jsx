import "./login.css";
import { Link } from 'react-router-dom';


export default function Login() {


    return (
        <>
        <Link to="/"></Link>
            <div className="page">
                <div className="login-container">
                    <div id="welcome">
                        Welcome to Satyarise "
                        <i
                            className="fa-solid fa-hands-praying fa-bounce"
                            style={{ color: "#ecc227" }}
                        ></i>"
                    </div>

                    <div id="inputs">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                    </div>

                    <Link to="/pause"><button>Login</button></Link>
                    <p>Create a new account ! <Link to="/signup">Sign Up</Link></p>
                </div>
                <br/>
                <p id="footer">© Satvarise 2024</p>
            </div>
            </>
        
    );
}

