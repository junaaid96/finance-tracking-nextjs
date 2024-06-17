import Link from "next/link";
import Features from "./components/Features";
import Login from "./login/page";
import Image from "next/image";
import LoginSVG from "@/app/assets/money-stress-animate.svg";

export default function Home() {
    return (
        <>
            <header>
                <div className="navbar bg-primary text-primary-content max-sm:mb-8">
                    <button className="btn btn-ghost text-xl">
                        Finance Tracking
                    </button>
                </div>
            </header>
            <main className="flex flex-wrap gap-6 justify-evenly items-center min-h-screen">
                <Login />
                <Image priority src={LoginSVG} alt="login-svg" />
            </main>
        </>
    );
}
