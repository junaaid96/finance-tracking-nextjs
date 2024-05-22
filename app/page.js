import Link from "next/link";

export default function Home() {
    return (
        <main className="hero min-h-screen bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Finance Tracking</h1>
                    <p className="py-6">Personal Finance Management System</p>
                    <Link href={"/login"}>
                        <button className="btn btn-primary">Get Started</button>
                    </Link>
                </div>
            </div>
        </main>
    );
}
