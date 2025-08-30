import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import validEmail from '../../utils/helper'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosinstance'

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if(!(email)) {
            setError('Invalid Email');
            console.log("Invalid Email")
            return;
        }

        if(!password) {
            setError('Password is required');
            return;
        }

        setError('');

        try {
            const response = await axiosInstance.post('/login', {email:email, password:password});

            if(response.data.error) {
                setError(response.data.message);
                return;
            }

            if(response.data.accessToken) {
                localStorage.setItem('token', response.data.accessToken);
                navigate('/dashboard');
            }

        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
        <Navbar/>

        <div className="flex items-center justify-center min-h-[80vh] bg-[#f5f7fa]">
            <div className="w-full max-w-md border border-[#1b263b] rounded-2xl shadow-lg bg-white px-10 py-12">
                <form onSubmit={handleLogin}>
                    <h4 className="text-3xl font-bold mb-8 text-center text-[#1b263b] tracking-wide">Login</h4>
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
                        Login
                    </button>
                    <p className="mt-6 text-center text-sm text-[#1b263b]">
                        Not Registered Yet?{' '}
                        <Link to="/signup" className="font-medium text-[#1b263b] underline hover:text-[#23304a]">Create an Account</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
  )
}
