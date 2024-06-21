import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

export const metadata = {
    title: "Finance Tracking - Profile",
    description: "Personal Finance Management System Profile Page",
};

export default function ProfileLayout({ children }) {
    return (
        <>
            <NavBar />
            <div className="flex flex-wrap justify-center items-center">
                <SideBar />
                {children}
            </div>
        </>
    );
}
