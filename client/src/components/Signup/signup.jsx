import "./signup.css";
import { Link } from 'react-router-dom';

export default function Signup() {
    return (
        <>
        <div className="signup">
        <h1 className="signup-page">Signup Page</h1>
        <h2>Please create your account here.</h2>
        <div className="signup-form">
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Set Password" />
            <input type="date" placeholder="Date of Birth" />
            <input type="phone" placeholder="Phone Number" />
            <button>Sign Up</button>
        </div>
        <p>Already have an account? <Link to="/">Login here.</Link></p>
        </div>
        </>
    );
}