"use client";

import { useUser } from "@/app/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import getAllCategories from "@/lib/getAllCategories";

export default function Incomes() {
    const userContext = useUser();
    const { loading, loggedIn } = userContext;
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [loadingIncomes, setLoadingIncomes] = useState([]);

    const fetchIncomes = () => {
        let access_token;
        // handling localStorage when SSR
        if (typeof window !== "undefined") {
            access_token = localStorage.getItem("access");
        }

        if (access_token) {
            axios
                .get(
                    "https://finance-tracking-drf.onrender.com/incomes/list/",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    setIncomes(response.data);
                    setLoadingIncomes(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    useEffect(() => {
        document.title = "Finance Tracking | User Profile - Incomes";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "Personal Finance Management System. This is the user's incomes page.";
        }

        if (!loggedIn) {
            router.push("/login");
        }

        fetchIncomes();

        getAllCategories().then((response) => {
            setCategories(response);
        });
    }, [loggedIn, router]);

    const handleAddIncome = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const category = formData.get("category");
        const amount = formData.get("amount");
        const description = formData.get("description");
        const date = formData.get("date");

        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .post(
                    "https://finance-tracking-drf.onrender.com/incomes/create/",
                    {
                        category,
                        amount,
                        description,
                        date,
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
                    fetchIncomes();
                    document.getElementById("income-add").close();
                    setError("");
                    setSuccess("Income added!");
                })
                .catch((error) => {
                    console.log(error);
                    setSuccess("");
                    if (error.response.data.message) {
                        setError(error.response.data.message);
                    } else {
                        setError(error.response.data.amount[0]);
                    }
                    document.getElementById("expense-add").close();
                });
        }
    };

    const handleEditIncome = (e, id) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const category = formData.get("category");
        const amount = formData.get("amount");
        const description = formData.get("description");
        const date = formData.get("date");

        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .put(
                    `https://finance-tracking-drf.onrender.com/incomes/update/${id}/`,
                    {
                        category,
                        amount,
                        description,
                        date,
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
                    fetchIncomes();
                    document.getElementById(`income-edit-${id}`).close();
                    setError("");
                    setSuccess("Income updated!");
                })
                .catch((error) => {
                    console.log(error);
                    setSuccess("");
                    if (error.response.data.message) {
                        setError(error.response.data.message);
                    } else {
                        setError(error.response.data.amount[0]);
                    }
                    document.getElementById(`income-edit-${id}`).close();
                });
        }
    };

    const handleDeleteIncome = (id) => {
        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .delete(
                    `https://finance-tracking-drf.onrender.com/incomes/delete/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    // router.refresh();
                    fetchIncomes();
                    document.getElementById(`income-delete-${id}`).close();
                    setError("");
                    setSuccess("Income deleted!");
                })
                .catch((error) => {
                    console.log(error);
                    setSuccess("");
                    setError("Something went wrong!");
                    document.getElementById(`income-delete-${id}`).close();
                });
        }
    };

    return loading ? (
        <span className="loading loading-ring loading-lg"></span>
    ) : (
        <div className="min-h-screen py-20 w-96 lg:w-2/3">
            <div className="flex flex-col max-w-4xl w-full mx-auto p-8 bg-base-200 rounded-2xl shadow-lg h-screen">
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
                    <h2 className="text-2xl font-semibold">Incomes</h2>
                    {/* Add Modal */}
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            document.getElementById("income-add").showModal()
                        }
                    >
                        + Add
                    </button>
                    <dialog id="income-add" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                Store your income!
                            </h3>
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() =>
                                    document
                                        .getElementById("income-add")
                                        .close()
                                }
                            >
                                ✕
                            </button>
                            <form method="dialog" onSubmit={handleAddIncome}>
                                <label className="label">
                                    <span className="label-text">Category</span>
                                    <select
                                        name="category"
                                        className="input input-bordered"
                                        required
                                    >
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}
                                            >
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
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
                                    <span className="label-text">
                                        Description
                                    </span>
                                    <input
                                        type="text"
                                        name="description"
                                        placeholder="Description"
                                        className="input input-bordered"
                                        required
                                    />
                                </label>
                                <label className="label">
                                    <span className="label-text">Date</span>
                                    <input
                                        type="date"
                                        name="date"
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
                                <th>Category</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loadingIncomes ? (
                                <tr>
                                    <td colSpan="3">
                                        <span className="loading loading-lg"></span>
                                    </td>
                                </tr>
                            ) : (
                                incomes.map((income) => (
                                    <tr key={income.id}>
                                        <td>{income.id}</td>
                                        <td>{income.category}</td>
                                        <td>${income.amount}</td>
                                        <td>{income.description}</td>
                                        <td>{income.date}</td>
                                        <td className="flex gap-2">
                                            {/* Edit Modal */}
                                            <button
                                                className="btn btn-secondary btn-xs"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `income-edit-${income.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Edit
                                            </button>
                                            <dialog
                                                id={`income-edit-${income.id}`}
                                                className="modal"
                                            >
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg">
                                                        Edit a income!
                                                    </h3>
                                                    <button
                                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `income-edit-${income.id}`
                                                                )
                                                                .close()
                                                        }
                                                    >
                                                        ✕
                                                    </button>
                                                    <form
                                                        method="dialog"
                                                        onSubmit={(e) =>
                                                            handleEditIncome(
                                                                e,
                                                                income.id
                                                            )
                                                        }
                                                    >
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Category
                                                            </span>
                                                            <select
                                                                name="category"
                                                                className="input input-bordered"
                                                                required
                                                            >
                                                                {categories.map(
                                                                    (
                                                                        category
                                                                    ) => (
                                                                        <option
                                                                            selected={
                                                                                category.name ===
                                                                                income.category
                                                                            }
                                                                            key={
                                                                                category.id
                                                                            }
                                                                            value={
                                                                                category.id
                                                                            }
                                                                        >
                                                                            {
                                                                                category.name
                                                                            }
                                                                        </option>
                                                                    )
                                                                )}
                                                            </select>
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
                                                                    income.amount
                                                                }
                                                                required
                                                            />
                                                        </label>
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Description
                                                            </span>
                                                            <input
                                                                type="text"
                                                                name="description"
                                                                placeholder="Description"
                                                                className="input input-bordered"
                                                                defaultValue={
                                                                    income.description
                                                                }
                                                                required
                                                            />
                                                        </label>
                                                        <label className="label">
                                                            <span className="label-text">
                                                                Date
                                                            </span>
                                                            <input
                                                                type="date"
                                                                name="date"
                                                                className="input input-bordered"
                                                                placeholder="YYYY-MM-DD"
                                                                defaultValue={
                                                                    income.date
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
                                                            `income-delete-${income.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Delete
                                            </button>
                                            <dialog
                                                id={`income-delete-${income.id}`}
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
                                                                    handleDeleteIncome(
                                                                        income.id
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
                                                                            `income-delete-${income.id}`
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
