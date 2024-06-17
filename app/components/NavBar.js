"use client";

import { useUser } from "@/app/layout";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
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
                <Link href={"/"} className="btn btn-ghost text-xl">
                    Finance Tracking
                </Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end hidden lg:block">
                    {user.first_name} {user.last_name}
                </div>
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
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-300 rounded-box w-52"
                    >
                        <li className="lg:hidden">
                            <p>
                                {user.first_name} {user.last_name}
                            </p>
                        </li>
                        <li>
                            <button
                                className="btn btn-primary btn-sm btn-outline mt-3"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
