import React, { useState } from 'react';
import signUpImg from "../images/signUp.png";
import dummy from "../images/user.jpg";
import { useDispatch } from 'react-redux';
import { registerUser } from '../redux/Actions/User';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { userData } from '../redux/features/userSlice';

const BASE_URL = process.env.REACT_APP_BASE_URL;


// Zod schema for validation
const schema = z.object({
    name: z.string().min(1, 'Name is required'),
    nameId: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address').nonempty('Email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignUp = () => {
    const navigate = useNavigate();

    const [avatar, setAvatar] = useState(null);
    const [name, setName] = useState("");
    const [nameId, setNameId] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const handleNameChange = (e) => {
        setName(e.target.value)
    }
    const handleNameIdChange = (e) => {
        setNameId(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatar(Reader.result);
            }
        };
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = { name, nameId, email, password, avatar };
        try {
            await dispatch(registerUser(formData));

            navigate("/");
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };



    return (
        <div className="w-full flex items-center justify-center bg-primary-500">
            <div className="flex flex-col lg:flex-row w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden mx-4">
                {/* Left Section */}
                <div className="w-full lg:w-1/2 p-8 bg-gray-50">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center lg:text-left">Sign Up</h2>

                    <form className="mt-8" onSubmit={onSubmit}>
                        <div className="w-full flex justify-center items-center">
                            <div className="relative w-24 h-24 flex items-center justify-center">
                                <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
                                    {avatar ? (
                                        <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <img src={dummy} alt="Profile" className="w-full h-full object-cover" />
                                    )}
                                </div>

                                {/* Add Icon */}
                                <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-200 border-2 border-white rounded-full flex items-center justify-center cursor-pointer">
                                    <label htmlFor="fileInput" className="cursor-pointer">
                                        <div className="w-4 h-4 rounded-full relative">
                                            <div className="absolute inset-0 flex items-center justify-center text-gray-700 font-bold text-lg">+</div>
                                        </div>
                                    </label>
                                    <input
                                        id="fileInput"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Name</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500`}
                                type="text"
                                placeholder="Enter Name"
                                onChange={handleNameChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Username</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500 `}
                                type="text"
                                placeholder="Enter Username"
                                onChange={handleNameIdChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Email</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500`}
                                type="email"
                                placeholder="Enter Email"
                                onChange={handleEmailChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm text-gray-600">Password</label>
                            <input
                                className={`w-full px-4 py-2 text-sm text-gray-500 border rounded-lg focus:outline-none focus:border-primary-500 `}
                                type="password"
                                placeholder="Enter Password"
                                onChange={handlePasswordChange}
                            />
                        </div>

                        <button
                            className="w-full px-4 py-2 text-white bg-primary-500 rounded-lg hover:bg-primary-600 focus:outline-none"
                            type="submit"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-4 text-sm text-center text-gray-600">
                        Already have an account?{' '}
                        <a href="/login" className="text-primary-500 hover:underline">
                            Login Now
                        </a>
                    </p>
                </div>

                {/* Right Section */}
                <div className="hidden lg:flex w-full lg:w-1/2 bg-gray-300 flex-col justify-center items-center text-white">
                    <img
                        src={signUpImg}
                        alt="signUpImg"
                        className="w-full h-fit mb-4"
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
