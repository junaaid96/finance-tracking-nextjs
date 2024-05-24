export default function Features() {
    return (
        <div className="my-20 text-center">
            <h1 className="text-3xl font-bold mt-10">Features</h1>
            <p className="mb-10 mt-3">
                This site is featured with these following things.
            </p>

            <div className="flex flex-wrap gap-6 items-center justify-center">
                <div className="card w-96 bg-base-100 shadow-xl border border-white">
                    <div className="card-body">
                        <h2 className="card-title">Income Tracking</h2>
                        <p>
                            You can track your incomes and manipulate when
                            needed.
                        </p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl border border-white">
                    <div className="card-body">
                        <h2 className="card-title">Expense Tracking</h2>
                        <p>
                            You can track your expenses and manipulate when
                            needed.
                        </p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl border border-white">
                    <div className="card-body">
                        <h2 className="card-title">Set Savings Goal</h2>
                        <p>
                            You can set your savings goals and manage when
                            needed.
                        </p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl border border-white">
                    <div className="card-body">
                        <h2 className="card-title">Transactions Histories</h2>
                        <p>
                            All the transactions will be logged on your profile.
                            You can check every changes you have made.
                        </p>
                    </div>
                </div>
                <div className="card w-96 bg-base-100 shadow-xl border border-white">
                    <div className="card-body">
                        <h2 className="card-title">JWT Authentication</h2>
                        <p>
                            All routes are protected using JWT authentication.
                            Every requests needed access token which will be
                            generated upon every login and expired in 1 Hour.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
