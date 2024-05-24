"use client";

import { useUser } from "@/app/layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { formatCurrency, formatDateTime } from "@/lib/formatUtils";

export default function Profile() {
    const userContext = useUser();
    const { user, loading, loggedIn } = userContext;
    const router = useRouter();
    const [transactionsHistories, setTransactionsHistories] = useState([]);
    const [thloading, setThLoading] = useState(true);

    useEffect(() => {
        document.title = "Finance Tracking | User Profile";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content =
                "Personal Finance Management System. This is the user profile page.";
        }

        if (!loggedIn) {
            router.push("/login");
        }

        const access_token = localStorage.getItem("access");

        if (access_token) {
            axios
                .get(
                    "https://finance-tracking-drf.onrender.com/transactions/list/",
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    }
                )
                .then((response) => {
                    setTransactionsHistories(response.data);
                    setThLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [loggedIn, router]);

    return loading ? (
        <span className="loading loading-ring loading-lg"></span>
    ) : (
        <div className="min-h-screen py-20 lg:w-2/3">
            <div className="flex flex-col max-w-4xl w-full mx-auto p-8 bg-base-200 rounded-2xl shadow-lg">
                <div className="relative flex flex-col items-center">
                    <Image
                        src="/avatar.png"
                        alt={user.username}
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                    <h1 className="mt-4 text-3xl font-semibold text-white">
                        {user.username}
                    </h1>
                    <p className="text-gray-400">
                        Available balance:
                        {formatCurrency(user.available_balance)}
                    </p>
                </div>
                <div className="mt-8 text-center">
                    <p>
                        <span className="font-bold">Name: </span>{" "}
                        {user.first_name} {user.last_name}
                    </p>
                    <p>
                        <span className="font-bold">Email: </span> {user.email}
                    </p>
                    <p>
                        <span className="font-bold">Phone: </span>{" "}
                        {user.phone_number}
                    </p>
                    <p>
                        <span className="font-bold">Address: </span>{" "}
                        {user.address}
                    </p>
                </div>
                {/* Transactions Histories */}
                <div className="text-center mt-6">
                    <h2 className="text-2xl font-semibold">
                        Transactions Histories/Log
                    </h2>
                    <table className="table w-full mt-4">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {thloading ? (
                                <tr>
                                    <td colSpan="3">
                                        <span className="loading loading-lg"></span>
                                    </td>
                                </tr>
                            ) : (
                                transactionsHistories.map((history) => (
                                    <tr key={history.id}>
                                        <td>{history.type}</td>
                                        <td>{history.description}</td>
                                        <td>{formatDateTime(history.date)}</td>
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
