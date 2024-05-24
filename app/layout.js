"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState, useEffect, useContext } from "react";
import getUser from "@/lib/getUser";
import Footer from "./components/Footer";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

const UserContext = createContext();

export default function RootLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        document.title = "Finance Tracking";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content = "Personal Finance Management System.";
        }

        //removing token after 59mins
        const storedTime = localStorage.getItem("login_time");
        const timeLimit = 59 * 60 * 1000;

        if (storedTime) {
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(storedTime);

            if (timeDifference > timeLimit) {
                localStorage.clear();
                setLoggedIn(false);
                router.push("/login");
            }
        }

        const user_id = localStorage.getItem("user_id");
        const parsed_user_id = parseInt(user_id);

        if (user_id) {
            setLoggedIn(true);
            getUser(parsed_user_id).then((data) => {
                setUser(data);
                setLoading(false);
            });
        }
    }, [router]);

    // reload to remove token after 59 mins
    useEffect(() => {
        setTimeout(function () {
            window.location.reload(1);
        }, 3540000);
    }, [router]);

    return (
        <UserContext.Provider value={{ user, loading, loggedIn, setLoggedIn }}>
            <html lang="en" data-theme="halloween">
                <body className={inter.className}>
                    {children}
                    <Footer />
                </body>
            </html>
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
