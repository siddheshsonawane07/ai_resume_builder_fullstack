// import { SignIn } from "@clerk/clerk-react"
/* eslint-disable no-unused-vars */

//clerk login 
// const SignInPage = () => {
//   return (
//     <div className="flex justify-center my-36 items-center">
//       <SignIn/>
//     </div>
//   )
// }

import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { auth } from "../../utils/firebase_config";
import { useUser } from "../../context/UserContext";

const SignInPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSignup = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      login(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Signup Error: ", error.message);
      alert(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      login(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error: ", error.message);
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      login(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-signup-container">
      <h2>{isLogin ? "Login" : "Signup"}</h2>
      
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          required
        />

        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />

        {!isLogin && (
          <input
            type="text"
            ref={nameRef}
            placeholder="Name"
            required
          />
        )}

        <button type="submit">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <button onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Switch to Signup" : "Switch to Login"}
      </button>

      <button onClick={handleGoogleSignIn}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignInPage;