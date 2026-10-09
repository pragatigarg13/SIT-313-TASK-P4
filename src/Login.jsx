import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./utils/firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Handle the login form
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      // Check the user email and password with Firebase
      await signInWithEmailAndPassword(auth, email, password);

      // Login successful
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      // Display an error if login fails
      setMessage("Invalid email or password. Please try again or register first.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <Link to="/signup" className="signup-link">
          Sign up
        </Link>

        <form onSubmit={handleLogin}>
          <label>Your email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />

          <label>Your password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />

          {message && (
            <p className="error-message">{message}</p>
          )}

          <button type="submit">Login</button>
        </form>

      </div>
    </div>
  );
}

export default Login;
