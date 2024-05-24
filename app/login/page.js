"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter, redirect } from "next/navigation";
import { useState, useEffect } from "react";
import { useUser } from "@/app/layout";

export default function Login() {
    const router = useRouter();
    const [error, setError] = useState("");
    const userContext = useUser();
    const { loggedIn } = userContext;
    const [loginLoading, setLoginLoading] = useState(false);

    useEffect(() => {
        document.title = "Finance Tracking | User Login";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "Personal Finance management system. This is the user login page.";
        }

        if (loggedIn) {
            router.push("/profile");
        }
    }, [loggedIn, router]);

    async function handleLogin(e) {
        setLoginLoading(true);
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const username = formData.get("username");
        const password = formData.get("password");

        try {
            const response = await axios.post(
                "https://finance-tracking-drf.onrender.com/users/login/",
                {
                    username,
                    password,
                }
            );
            console.log(response);
            setLoginLoading(false);

            // storing token
            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);
            localStorage.setItem("user_id", response.data.user_id);
            localStorage.setItem("login_time", new Date().getTime());

            router.push("/profile");
            window.location.reload();

            // router
            //     .replace("/profile", undefined, { shallow: true })
            //     .then(() => window.location.reload());

            // redirect("/profile");
        } catch (error) {
            setError(error.response.data.error);
            setLoginLoading(false);
            console.error(error);
        }
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col lg:w-1/3">
                <div className="text-center">
                    {loginLoading && (
                        <>
                            <span className="loading loading-spinner text-primary loading-lg"></span>
                            <p className="mb-12">Please wait</p>
                        </>
                    )}
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
                    <h2 className="text-2xl font-semibold">Login</h2>
                    <p className="py-3">
                        Enter your email to sign in to your account!
                    </p>
                </div>
                <div className="card shrink-0 lg:w-full shadow-2xl bg-base-100">
                    <form className="card-body" onSubmit={handleLogin}>
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
                            {/* <label className="label">
                                <a
                                    href="#"
                                    className="label-text-alt link link-hover"
                                >
                                    Forgot password?
                                </a>
                            </label> */}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className="text-center p-6">
                        Don't have an account? Please{" "}
                        <Link href={"/register"}>
                            <span className="text-primary">register</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
