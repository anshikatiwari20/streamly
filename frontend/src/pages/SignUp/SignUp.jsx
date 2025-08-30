import React from "react";
import { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import PasswordInput from "../../components/Input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import validEmail from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance"

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!(email)) {
      setError("Invalid Email");
      return;
    }

    setError(""); 

      try {
        const response = await axiosInstance.post("/create-user", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password
        });

        if(response.data.error) {
          setError(response.data.message);
          return;
        }

        if(response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
          navigate("/dashboard");
        }

      } catch (error) {
        console.log(error);
      }

  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-[80vh] bg-[#f5f7fa]">
        <div className="w-full max-w-md border border-[#1b263b] rounded-2xl shadow-lg bg-white px-10 py-12">
          <form onSubmit={handleSignUp}>
            <h4 className="text-3xl font-bold mb-8 text-center text-[#1b263b] tracking-wide">Create Account</h4>
            <input
              type="text"
              placeholder="First Name"
              className="input-box mb-5 border border-[#1b263b] focus:ring-2 focus:ring-[#1b263b] focus:border-[#1b263b] rounded-lg px-4 py-3 text-base text-[#1b263b] bg-[#f5f7fa]"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              autoComplete="given-name"
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input-box mb-5 border border-[#1b263b] focus:ring-2 focus:ring-[#1b263b] focus:border-[#1b263b] rounded-lg px-4 py-3 text-base text-[#1b263b] bg-[#f5f7fa]"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              autoComplete="family-name"
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="input-box mb-5 border border-[#1b263b] focus:ring-2 focus:ring-[#1b263b] focus:border-[#1b263b] rounded-lg px-4 py-3 text-base text-[#1b263b] bg-[#f5f7fa]"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <PasswordInput
              password={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            {error && <p className="text-red-500 text-xs pb-1">{error}</p>}
            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-lg bg-[#1b263b] text-white font-semibold text-lg shadow hover:bg-[#23304a] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#1b263b] focus:ring-offset-2"
            >
              Sign Up
            </button>
            <p className="mt-6 text-center text-sm text-[#1b263b]">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#1b263b] underline hover:text-[#23304a]">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
