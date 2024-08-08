import React, { useState } from 'react';
import { Heading } from '../components/Heading';
import { Subheading } from '../components/Subheading';
import { Inputbox } from '../components/Inputbox';
import { Button } from '../components/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!username || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");

    } catch (err) {
      setError("Sign in failed. Please check your credentials.");
      console.error(err);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-blue-700 h-screen flex flex-col justify-center items-center font-sans'>
      <div className='flex flex-col bg-white border-slate-200 rounded-md p-5 m-4 gap-4 border-2 w-80 justify-items-center'>
        <Heading label={"Sign In"} />
        <Subheading label={"Enter your information to sign in to your account"} />
        <Inputbox
          onChange={(e) => setUsername(e.target.value)}
          label={"Email Address"}
          placeholder={"Enter email address"}
          type={"email"}
        />
        <Inputbox
          onChange={(e) => setPassword(e.target.value)}
          label={"Password"}
          placeholder={"Enter password"}
          type={"password"}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <Button
            onClick={handleSignIn}
            label={loading ? "Signing In..." : "Sign In"}
            disabled={loading}
          />
        </div>
        <div className="py-1 text-sm flex justify-center">
          <div>Don't have an account?</div>
          <a href="/signup" className="text-blue-500 ml-1">Sign up</a>
        </div>
      </div>
    </div>
  );
};
