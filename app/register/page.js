"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@/app/layout";

export default function Register() {
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const userContext = useUser();
    const { loggedIn } = userContext;

    useEffect(() => {
        document.title = "Finance Tracking | User Register";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "Personal Finance management system. This is the user register page.";
        }

        if (loggedIn) {
            router.push("/profile");
        }
    }, [loggedIn, router]);

    async function handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get("username");
        const first_name = formData.get("first_name");
        const last_name = formData.get("last_name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");
        const phone_number = formData.get("phone_number");
        const address = formData.get("address");

        try {
            const response = await axios.post(
                "https://finance-tracking-drf.onrender.com/users/register/",
                {
                    username,
                    first_name,
                    last_name,
                    email,
                    password,
                    confirm_password,
                    phone_number,
                    address,
                }
            );
            console.log(response);
            setSuccess("User created successfully. Please login.");
            router.push("/login");
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:w-1/3">
                <div className="text-center">
                    {error && (
                        <div role="alert" className="alert alert-error my-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}
                    {success && (
                        <div role="alert" className="alert alert-success my-6">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="stroke-current shrink-0 h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>{success}</span>
                        </div>
                    )}
                    <h2 className="text-2xl font-semibold">Register</h2>
                    <p className="py-3">
                        Enter your information below to create your account
                    </p>
                </div>
                <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleRegister}>
                        <div className="form-control">
                            <label className="label" htmlFor="username">
                                <span className="label-text">Username</span>
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Username"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Username"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="first_name">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="text"
                                id="first_name"
                                name="first_name"
                                placeholder="First Name"
                                className="input input-bordered input-primary"
                                required
                                aria-label="First Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="last_name">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="text"
                                id="last_name"
                                name="last_name"
                                placeholder="Last Name"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Last Name"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Email"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Password"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="confirm_password">
                                <span className="label-text">
                                    Confirm Password
                                </span>
                            </label>
                            <input
                                type="password"
                                id="confirm_password"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Confirm Password"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="phone_number">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input
                                type="tel"
                                id="phone_number"
                                name="phone_number"
                                placeholder="Phone Number"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Phone Number"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label" htmlFor="address">
                                <span className="label-text">Address</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                                className="input input-bordered input-primary"
                                required
                                aria-label="Address"
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">
                                Register
                            </button>
                        </div>
                        <p>
                            Already have an account? Please{" "}
                            <Link href={"/login"}>
                                <span className="text-primary">login</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
