"use client";

import { useUser } from "@/app/layout";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NavBar() {
    const router = useRouter();
    const userContext = useUser();
    const { user, loading, setLoggedIn } = userContext;

    async function handleLogout() {
        axios.post("https://finance-tracking-drf.onrender.com/users/logout/");

        localStorage.clear();
        setLoggedIn(false);
        router.push("/login");
    }

    return loading ? (
        <span className="loading loading-ring loading-lg"></span>
    ) : (
        <div className="navbar bg-base-300">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Finance Tracking</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end"></div>
                <div className="dropdown dropdown-end">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar"
                    >
                        <div className="w-10">
                            <Image
                                src="/avatar.png"
                                alt={user.username}
                                width={100}
                                height={100}
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                    >
                        <li>
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
