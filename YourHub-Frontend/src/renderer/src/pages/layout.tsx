import { Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
            <Outlet />
        </div>
    );
}