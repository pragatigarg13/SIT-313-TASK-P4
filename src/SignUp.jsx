import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./utils/firebase";
import "./SignUp.css";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Handle the registration form
  const handleSignUp = async (e) => {
    e.preventDefault();
    setMessage("");

    // Check whether both passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // Create a new account in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      // Get the registered user's ID
      const user = userCredential.user;

      // Save the user's profile in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim()
      });

      // Registration successful
      alert("Account created successfully! Please log in.");
      navigate("/login");

    } catch (error) {
      // Display the exact Firebase error in the browser console
      console.error("Firebase error code:", error.code);
      console.error("Firebase error message:", error.message);

      // Show a helpful message based on the error
      if (error.code === "auth/email-already-in-use") {
        setMessage("This email is already registered. Please log in.");
      } else if (error.code === "auth/weak-password") {
        setMessage("Please use a stronger password with at least 6 characters.");
      } else if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/missing-email"
      ) {
        setMessage("Please enter a valid email address.");
      } else if (error.code === "auth/operation-not-allowed") {
        setMessage(
          "Email/password registration is disabled. Enable it in Firebase Authentication settings."
        );
      } else if (
        error.code === "permission-denied" ||
        error.code === "firestore/permission-denied"
      ) {
        setMessage(
          "Your account may have been created, but Firestore could not save your profile. Check your Firestore security rules."
        );
      } else if (error.code === "auth/network-request-failed") {
        setMessage("Network error. Check your internet connection and try again.");
      } else {
        setMessage(
          "Registration failed: " + (error.code || error.message || "Unknown error")
        );
      }
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create a DEV@Deakin Account</h2>

        <form onSubmit={handleSignUp}>
          <div className="signup-field">
            <label>First Name*</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <label>Last Name*</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <label>Email*</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="signup-field">
            <label>Password*</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          <div className="signup-field">
            <label>Confirm password*</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {message && (
            <p className="error-message">{message}</p>
          )}

          <button type="submit">Create</button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
