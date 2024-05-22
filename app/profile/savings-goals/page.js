"use client";

import { useUser } from "@/app/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SavingsGoals() {
    const userContext = useUser();
    const { loading, loggedIn } = userContext;
    const router = useRouter();
    const [savingsGoals, setSavingsGoals] = useState([]);
    const [sgLoading, setSgLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        document.title = "Finance Tracking | User Profile - Expenses";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "Personal Finance Management System. This is the user's expenses page.";
        }

        if (!loggedIn) {
            router.push("/login");
        }

        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .get(
                    "https://finance-tracking-drf.onrender.com/savings-goals/list/",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    setSavingsGoals(response.data);
                    setSgLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loggedIn, router]);

    async function handleAddSavingsGoal(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const amount = formData.get("amount");
        const deadline = formData.get("deadline");

        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .post(
                    "https://finance-tracking-drf.onrender.com/savings-goals/create/",
                    {
                        name,
                        amount,
                        deadline,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    document.getElementById("savings_goal").close();
                    setSuccess("Savings Goal added successfully!");
                    setTimeout(() => {
                        setSuccess("");
                        window.location.reload();
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                    setError(error.response.data);
                });
        }
    }

    return loading ? (
        <span className="loading loading-ring loading-lg"></span>
    ) : (
        <div className="min-h-screen py-20 lg:w-2/3">
            <div className="flex flex-col max-w-4xl w-full mx-auto p-8 bg-base-200 rounded-2xl shadow-lg">
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
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-semibold">Savings Goals</h2>
                    {/* Modal/Add Button */}
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            document.getElementById("savings_goal").showModal()
                        }
                    >
                        Add
                    </button>
                    <dialog id="savings_goal" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                Set your Savings Goal!
                            </h3>
                            <form
                                method="dialog"
                                onSubmit={handleAddSavingsGoal}
                            >
                                <label className="label">
                                    <span className="label-text">Name</span>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="input"
                                        required
                                    />
                                </label>
                                <label className="label">
                                    <span className="label-text">Amount</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Amount"
                                        className="input"
                                        required
                                    />
                                </label>
                                <label className="label">
                                    <span className="label-text">Deadline</span>
                                    <input
                                        type="date"
                                        name="deadline"
                                        className="input"
                                        placeholder="YYYY-MM-DD"
                                        required
                                    />
                                </label>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </dialog>
                </div>
                <table className="table w-full mt-4">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Current Amount</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sgLoading ? (
                            <tr>
                                <td colSpan="3">
                                    <span className="loading loading-lg"></span>
                                </td>
                            </tr>
                        ) : (
                            savingsGoals.map((goal, index) => (
                                <tr key={index}>
                                    <td>{goal.name}</td>
                                    <td>{goal.amount}</td>
                                    <td>{goal.current_amount}</td>
                                    <td>{goal.deadline}</td>
                                    <td>
                                        <button className="btn btn-primary btn-xs">
                                            Edit
                                        </button>
                                        <button className="btn btn-error btn-xs">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
