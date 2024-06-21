import Link from "next/link";

export default function SideBar() {
    return (
        <ul className="menu bg-base-300 w-60 rounded-box max-sm:mt-6 lg:h-60 flex flex-col justify-center">
            <li className="border-b shadow border-gray-700">
                <Link href={"/profile"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.422A12.094 12.094 0 0112 12c-2.14 0-4.157.577-5.86 1.578L12 14zm0 6a12.09 12.09 0 006.16-1.578L12 17l-6.16 3.422A12.09 12.09 0 0012 20zm0-9.576a12.09 12.09 0 00-6.16 1.578L12 10.422l6.16-3.422A12.09 12.09 0 0012 10.422z"
                        />
                    </svg>
                    Profile
                </Link>
            </li>
            <li className="border-b shadow border-gray-700">
                <Link href={"/profile/savings-goals"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8c-3.315 0-6 2.685-6 6s2.685 6 6 6 6-2.685 6-6-2.685-6-6-6zm0 10a4 4 0 110-8 4 4 0 010 8zM5 7h-.8a3 3 0 00-2.995 3.005v.25C1.167 13.788 3.547 16 6.25 16H7V7zm12 0v9h.8a3 3 0 002.995-3.005v-.25C22.833 10.212 20.453 8 17.75 8H17zm-5-3.5c-.83 0-1.5.67-1.5 1.5S11.17 6.5 12 6.5s1.5-.67 1.5-1.5S12.83 3.5 12 3.5z"
                        />
                    </svg>
                    Savings Goals
                </Link>
            </li>
            <li className="border-b shadow border-gray-700">
                <Link href={"/profile/incomes"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v8m4-4H8m7-4a4 4 0 00-7.32 2.16M20 11v1a7.978 7.978 0 01-1.88 5.1M3.88 12H4a7.978 7.978 0 01.88-5.1M7 16c1.61 0 3.088-.563 4.243-1.5"
                        />
                    </svg>
                    Incomes
                </Link>
            </li>
            <li className="border-b shadow border-gray-700">
                <Link href={"/profile/expenses"}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 11H7a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2zm8 0h-2a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2zm-4-2a4 4 0 100-8 4 4 0 000 8zm0 14a9 9 0 100-18 9 9 0 000 18z"
                        />
                    </svg>
                    Expenses
                </Link>
            </li>
        </ul>
    );
}
