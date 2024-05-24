"use client";

import { useUser } from "@/app/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SavingsGoals() {
    const userContext = useUser();
    const { loading, loggedIn } = userContext;
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [savingsGoals, setSavingsGoals] = useState([]);
    const [sgLoading, setSgLoading] = useState(true);

    const fetchSavingsGoals = () => {
        let access_token;
        // handling localStorage when SSR
        if (typeof window !== "undefined") {
            access_token = localStorage.getItem("access");
        }

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
    };

    useEffect(() => {
        document.title = "Finance Tracking | User Profile - SavingsGoals";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "Personal Finance Management System. This is the user's savings goals page.";
        }

        if (!loggedIn) {
            router.push("/login");
        }

        fetchSavingsGoals();
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
                    // router.prefetch("/profile/savings-goals");
                    // router.refresh();
                    fetchSavingsGoals();
                    document.getElementById("savings_goal-add").close();
                    setError("");
                    setSuccess("Savings Goal added!");
                    // setTimeout(() => {
                    //     setSuccess("");
                    //     window.location.reload();
                    // }, 1000);
                })
                .catch((error) => {
                    console.log(error);
                    setSuccess("");
                    if (error.response.data.message) {
                        setError(error.response.data.message);
                    } else {
                        setError(error.response.data.amount[0]);
                    }
                    document.getElementById("savings_goal-add").close();
                });
        }
    }

    async function handleEditSavingsGoal(e, id) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const name = formData.get("name");
        const amount = formData.get("amount");
        const deadline = formData.get("deadline");

        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .put(
                    `https://finance-tracking-drf.onrender.com/savings-goals/update/${id}/`,
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
                    // router.refresh();
                    fetchSavingsGoals();
                    document.getElementById(`savings_goal-edit-${id}`).close();
                    setError("");
                    setSuccess("Savings Goal updated!");
                })
                .catch((error) => {
                    console.log(error);
                    setSuccess("");
                    if (error.response.data.message) {
                        setError(error.response.data.message);
                    } else {
                        setError(error.response.data.amount[0]);
                    }
                    document.getElementById(`savings_goal-edit-${id}`).close();
                });
        }
    }

    async function handleDeleteSavingsGoal(id) {
        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .delete(
                    `https://finance-tracking-drf.onrender.com/savings-goals/delete/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    // router.refresh();
                    // router.prefetch("/profile/savings-goals");
                    fetchSavingsGoals();
                    document
                        .getElementById(`savings_goal-delete-${id}`)
                        .close();
                    setError("");
                    setSuccess("Savings Goal deleted!");
                })
                .catch((error) => {
                    console.log(error);
                    setSuccess("");
                    setError("Something went wrong!");
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
                    {/* Add Modal */}
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            document
                                .getElementById("savings_goal-add")
                                .showModal()
                        }
                    >
                        + Add
                    </button>
                    <dialog id="savings_goal-add" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                Set your Savings Goal!
                            </h3>
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() =>
                                    document
                                        .getElementById("savings_goal-add")
                                        .close()
                                }
                            >
                                ✕
                            </button>
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
                                        className="input input-bordered"
                                        required
                                    />
                                </label>
                                <label className="label">
                                    <span className="label-text">Amount</span>
                                    <input
                                        type="number"
                                        name="amount"
                                        placeholder="Amount"
                                        className="input input-bordered"
                                        required
                                    />
                                </label>
                                <label className="label">
                                    <span className="label-text">Deadline</span>
                                    <input
                                        type="date"
                                        name="deadline"
                                        className="input input-bordered"
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
                <div className="overflow-x-auto">
                    <table className="table w-full mt-4">
                        <thead>
                            <tr>
                                <th>id</th>
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
                                savingsGoals.map((goal) => (
                                    <tr key={goal.id}>
                                        <td>{goal.id}</td>
                                        <td>{goal.name}</td>
                                        <td>${goal.amount}</td>
                                        <td>${goal.current_amount}</td>
                                        <td>{goal.deadline}</td>
                                        <td className="flex gap-2">
                                            {/* Edit Modal */}
                                            <button
                                                className="btn btn-secondary btn-xs"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `savings_goal-edit-${goal.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Edit
                                            </button>
                                            <dialog
                                                id={`savings_goal-edit-${goal.id}`}
                                                className="modal"
                                            >
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg">
                                                        Edit Savings Goal
                                                    </h3>
                                                    <button
                                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `savings_goal-edit-${goal.id}`
                                                                )
                                                                .close()
                                                        }
                                                    >
                                                        ✕
                                                    </button>
                                                    <form
                                                        method="dialog"
                                                        onSubmit={(e) =>
                                                            handleEditSavingsGoal(
                                                                e,
                                                                goal.id
                                                            )
                                                        }
                                                    >
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Name
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="name"
                                                                placeholder="Name"
                                                                className="input input-bordered"
                                                                defaultValue={
                                                                    goal.name
                                                                }
                                                                required
                                                            />
                                                        </label>
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Amount
                                                            </span>
                                                            <input
                                                                type="number"
                                                                name="amount"
                                                                placeholder="Amount"
                                                                className="input input-bordered"
                                                                defaultValue={
                                                                    goal.amount
                                                                }
                                                                required
                                                            />
                                                        </label>
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Deadline
                                                            </span>
                                                            <input
                                                                type="date"
                                                                name="deadline"
                                                                className="input input-bordered"
                                                                placeholder="YYYY-MM-DD"
                                                                defaultValue={
                                                                    goal.deadline
                                                                }
                                                                required
                                                            />
                                                        </label>
                                                        <div className="form-control mt-6">
                                                            <button className="btn btn-primary">
                                                                Update
                                                            </button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </dialog>
                                            {/* Delete Modal */}
                                            <button
                                                className="btn btn-error btn-xs"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `savings_goal-delete-${goal.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Delete
                                            </button>
                                            <dialog
                                                id={`savings_goal-delete-${goal.id}`}
                                                className="modal"
                                            >
                                                <div className="modal-box">
                                                    <form method="dialog"></form>
                                                    <h3 className="font-bold text-lg">
                                                        Are you sure to delete?
                                                    </h3>
                                                    <div className="form-control mt-6">
                                                        <div className="flex gap-3 items-center justify-end">
                                                            <button
                                                                className="btn btn-primary"
                                                                onClick={() =>
                                                                    handleDeleteSavingsGoal(
                                                                        goal.id
                                                                    )
                                                                }
                                                            >
                                                                Yes
                                                            </button>
                                                            <button
                                                                className="btn btn-error"
                                                                onClick={() =>
                                                                    document
                                                                        .getElementById(
                                                                            `savings_goal-delete-${goal.id}`
                                                                        )
                                                                        .close()
                                                                }
                                                            >
                                                                No
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </dialog>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
