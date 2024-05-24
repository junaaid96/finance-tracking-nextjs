"use client";

import { useUser } from "@/app/layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import getAllCategories from "@/lib/getAllCategories";

export default function Expenses() {
    const userContext = useUser();
    const { loading, loggedIn } = userContext;
    const router = useRouter();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [categories, setCategories] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [loadingExpenses, setLoadingExpenses] = useState(true);

    useEffect(() => {
        document.title = "Finance Tracking | User Profile - Expenses";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "Personal Finance Management System. This is the user's expense page.";
        }

        if (!loggedIn) {
            router.push("/login");
        }

        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .get(
                    "https://finance-tracking-drf.onrender.com/expenses/list/",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    setExpenses(response.data);
                    setLoadingExpenses(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        getAllCategories().then((response) => {
            setCategories(response);
        });
    }, [loggedIn, router]);

    const handleAddExpense = (e) => {
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
                    "https://finance-tracking-drf.onrender.com/expenses/create/",
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
                    router.refresh();
                    document.getElementById("expense-add").close();
                    setSuccess("Expense added!");
                })
                .catch((error) => {
                    console.log(error);
                    setError("Something went wrong!");
                });
        }
    };

    const handleEditExpense = (e, id) => {
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
                    `https://finance-tracking-drf.onrender.com/expenses/update/${id}/`,
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
                    router.refresh();
                    document.getElementById(`expense-edit-${id}`).close();
                    setSuccess("Expense updated!");
                })
                .catch((error) => {
                    console.log(error);
                    setError("Something went wrong!");
                });
        }
    };

    const handleDeleteExpense = (id) => {
        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .delete(
                    `https://finance-tracking-drf.onrender.com/expenses/delete/${id}/`,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    console.log(response);
                    router.refresh();
                    document.getElementById(`expense-delete-${id}`).close();
                    setSuccess("Expense deleted!");
                })
                .catch((error) => {
                    console.log(error);
                    setError("Something went wrong!");
                });
        }
    };

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
                    <h2 className="text-2xl font-semibold">Expenses</h2>
                    {/* Add Modal */}
                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            document.getElementById("expense-add").showModal()
                        }
                    >
                        + Add
                    </button>
                    <dialog id="expense-add" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">
                                Store your expense!
                            </h3>
                            <button
                                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                onClick={() =>
                                    document
                                        .getElementById("expense-add")
                                        .close()
                                }
                            >
                                ✕
                            </button>
                            <form method="dialog" onSubmit={handleAddExpense}>
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
                            {loadingExpenses ? (
                                <tr>
                                    <td colSpan="3">
                                        <span className="loading loading-lg"></span>
                                    </td>
                                </tr>
                            ) : (
                                expenses.map((expense) => (
                                    <tr key={expense.id}>
                                        <td>{expense.id}</td>
                                        <td>{expense.category}</td>
                                        <td>${expense.amount}</td>
                                        <td>{expense.description}</td>
                                        <td>{expense.date}</td>
                                        <td className="flex gap-2">
                                            {/* Edit Modal */}
                                            <button
                                                className="btn btn-secondary btn-xs"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            `expense-edit-${expense.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Edit
                                            </button>
                                            <dialog
                                                id={`expense-edit-${expense.id}`}
                                                className="modal"
                                            >
                                                <div className="modal-box">
                                                    <h3 className="font-bold text-lg">
                                                        Edit a expense!
                                                    </h3>
                                                    <button
                                                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                                                        onClick={() =>
                                                            document
                                                                .getElementById(
                                                                    `expense-edit-${expense.id}`
                                                                )
                                                                .close()
                                                        }
                                                    >
                                                        ✕
                                                    </button>
                                                    <form
                                                        method="dialog"
                                                        onSubmit={(e) =>
                                                            handleEditExpense(
                                                                e,
                                                                expense.id
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
                                                                                expense.category
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
                                                                    expense.amount
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
                                                                    expense.description
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
                                                                    expense.date
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
                                                            `expense-delete-${expense.id}`
                                                        )
                                                        .showModal()
                                                }
                                            >
                                                Delete
                                            </button>
                                            <dialog
                                                id={`expense-delete-${expense.id}`}
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
                                                                    handleDeleteExpense(
                                                                        expense.id
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
                                                                            `expense-delete-${expense.id}`
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
