import Link from "next/link";

export default function Register() {
    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col w-1/3">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold">Register</h2>
                    <p className="py-3">
                    Enter your information below to create your account
                    </p>
                </div>
                <div className="card shrink-0 w-full  shadow-2xl bg-base-100">
                    <form className="card-body">
                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                        </div>
                        <p>
                            Already have an account? Please{" "}
                            <Link href={"/login"}>
                                <span className="text-primary">login</span>
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}
