import Link from "next/link";
import Features from "./components/Features";

export default function Home() {
    return (
        <main>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-md">
                        <h1 className="text-5xl font-bold">Finance Tracking</h1>
                        <p className="py-6">
                            Personal Finance Management System. Here you can
                            track your incomes, expenses, manage savings
                            goals and check your transactions histories.
                        </p>
                        <Link href={"/login"}>
                            <button className="btn btn-primary">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <Features />
        </main>
    );
}
