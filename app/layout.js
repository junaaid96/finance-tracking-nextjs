"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState, useEffect, useContext } from "react";
import getUser from "@/lib/getUser";
import Footer from "./components/Footer";

const inter = Inter({ subsets: ["latin"] });

const UserContext = createContext();

export default function RootLayout({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        document.title = "Finance Tracking";
        const metaDescription = document.querySelector(
            'meta[name="description"]'
        );
        if (metaDescription) {
            metaDescription.content = "Personal Finance Management System.";
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
    }, []);

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
